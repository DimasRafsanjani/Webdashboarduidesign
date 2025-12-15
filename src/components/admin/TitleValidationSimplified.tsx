import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Search, Eye, CheckCircle, XCircle, Users, FileText } from "lucide-react";
import { toast } from "sonner";

interface TitleSubmission {
  id: string;
  studentName: string;
  studentId: string;
  studyProgram: string;
  thesisTitle: string;
  problemStatement: string;
  keywords: string[];
  submissionDate: string;
  status: "Pending" | "Validated" | "Rejected";
  supervisor?: string;
  notes?: string;
}

interface Lecturer {
  id: string;
  name: string;
  expertise: string[];
  currentSupervisees: number;
}

const mockSubmissions: TitleSubmission[] = [
  {
    id: "1",
    studentName: "Ahmad Fauzi",
    studentId: "2019010001",
    studyProgram: "Computer Science",
    thesisTitle: "Machine Learning-Based Sentiment Analysis for Social Media Posts",
    problemStatement:
      "Social media platforms generate massive amounts of unstructured text data. Traditional sentiment analysis methods struggle with informal language, sarcasm, and context. This research aims to develop an advanced machine learning model that can accurately classify sentiment in social media posts, considering contextual nuances and informal expressions.",
    keywords: ["Machine Learning", "Sentiment Analysis", "Natural Language Processing", "Deep Learning"],
    submissionDate: "2024-05-15",
    status: "Pending",
  },
  {
    id: "2",
    studentName: "Sarah Putri Wijaya",
    studentId: "2019010002",
    studyProgram: "Information Systems",
    thesisTitle: "Blockchain Implementation for Supply Chain Transparency in Agriculture",
    problemStatement:
      "The agricultural supply chain lacks transparency, leading to trust issues between producers and consumers. This research proposes implementing blockchain technology to create an immutable record of product journey from farm to consumer, ensuring transparency and building trust.",
    keywords: ["Blockchain", "Supply Chain", "Agriculture", "Transparency"],
    submissionDate: "2024-05-15",
    status: "Pending",
  },
  {
    id: "3",
    studentName: "Muhammad Rizki",
    studentId: "2019010003",
    studyProgram: "Computer Science",
    thesisTitle: "IoT-Based Smart Agriculture Monitoring System",
    problemStatement:
      "Traditional agriculture relies on manual monitoring, which is time-consuming and often inaccurate. This research develops an IoT-based system for real-time monitoring of soil moisture, temperature, and other agricultural parameters to optimize crop yield.",
    keywords: ["IoT", "Agriculture", "Sensors", "Real-time Monitoring"],
    submissionDate: "2024-05-14",
    status: "Validated",
    supervisor: "Dr. Dewi Lestari",
  },
  {
    id: "4",
    studentName: "Aisyah Rahmadani",
    studentId: "2019010004",
    studyProgram: "Information Systems",
    thesisTitle: "Mobile Application for Mental Health Support Using Gamification",
    problemStatement:
      "Mental health awareness is growing, but many people lack access to support systems. This research develops a mobile application that uses gamification techniques to encourage mental health activities and provide accessible support.",
    keywords: ["Mobile Development", "Mental Health", "Gamification", "User Engagement"],
    submissionDate: "2024-05-13",
    status: "Pending",
  },
  {
    id: "5",
    studentName: "Dimas Prasetyo",
    studentId: "2019010005",
    studyProgram: "Computer Science",
    thesisTitle: "Computer Vision for Automatic Traffic Violation Detection",
    problemStatement:
      "Manual traffic violation monitoring is inefficient and prone to human error. This research implements computer vision and deep learning to automatically detect and classify traffic violations in real-time.",
    keywords: ["Computer Vision", "Deep Learning", "Traffic Management", "Object Detection"],
    submissionDate: "2024-05-12",
    status: "Rejected",
    notes: "Title scope too broad, need to focus on specific violation types",
  },
];

const mockLecturers: Lecturer[] = [
  {
    id: "1",
    name: "Dr. Ahmad Fauzi",
    expertise: ["Machine Learning", "Artificial Intelligence", "Data Mining"],
    currentSupervisees: 8,
  },
  {
    id: "2",
    name: "Prof. Dr. Siti Rahmah",
    expertise: ["Data Science", "Big Data", "Analytics"],
    currentSupervisees: 10,
  },
  {
    id: "3",
    name: "Dr. Budi Santoso",
    expertise: ["UI/UX Design", "Mobile Development", "Human-Computer Interaction"],
    currentSupervisees: 6,
  },
  {
    id: "4",
    name: "Dr. Dewi Lestari",
    expertise: ["IoT", "Embedded Systems", "Sensor Networks"],
    currentSupervisees: 7,
  },
  {
    id: "5",
    name: "Dr. Bambang Supriyanto",
    expertise: ["Blockchain", "Cryptography", "Distributed Systems"],
    currentSupervisees: 5,
  },
];

export function TitleValidationSimplified() {
  const [submissions, setSubmissions] = useState<TitleSubmission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<TitleSubmission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [rejectComment, setRejectComment] = useState("");

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.studentId.includes(searchTerm) ||
      submission.thesisTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (submission: TitleSubmission) => {
    setSelectedSubmission(submission);
    setSelectedSupervisor(submission.supervisor || "");
    setIsDetailOpen(true);
  };

  const handleApprove = () => {
    if (!selectedSupervisor) {
      toast.error("Please assign a supervisor before approving");
      return;
    }

    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission?.id
          ? { ...sub, status: "Validated" as const, supervisor: selectedSupervisor }
          : sub
      )
    );

    toast.success("Title Approved", {
      description: `${selectedSubmission?.thesisTitle} has been validated and assigned to ${selectedSupervisor}`,
    });

    setIsDetailOpen(false);
    setSelectedSubmission(null);
    setSelectedSupervisor("");
  };

  const handleReject = () => {
    if (!rejectComment.trim()) {
      toast.error("Please provide a comment explaining the rejection");
      return;
    }

    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission?.id
          ? { ...sub, status: "Rejected" as const, notes: rejectComment }
          : sub
      )
    );

    toast.error("Title Rejected", {
      description: `${selectedSubmission?.thesisTitle} has been rejected`,
    });

    setIsDetailOpen(false);
    setSelectedSubmission(null);
    setRejectComment("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Validated":
        return <Badge className="bg-green-500 hover:bg-green-600">Validated</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
    }
  };

  const pendingCount = submissions.filter((s) => s.status === "Pending").length;
  const validatedCount = submissions.filter((s) => s.status === "Validated").length;
  const rejectedCount = submissions.filter((s) => s.status === "Rejected").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1>Title Validation & Supervisor Assignment</h1>
        <p className="text-gray-500 mt-2">
          Review and validate student thesis title submissions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Submissions</p>
                <h2 className="mt-2">{submissions.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <h2 className="mt-2">{pendingCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Validated</p>
                <h2 className="mt-2">{validatedCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <h2 className="mt-2">{rejectedCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Thesis Title Submissions</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, ID, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Validated">Validated</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Thesis Title</TableHead>
                  <TableHead>Proposed Keywords</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id} className="hover:bg-gray-50">
                      <TableCell>{submission.studentName}</TableCell>
                      <TableCell>{submission.studentId}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={submission.thesisTitle}>
                          {submission.thesisTitle}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.keywords.slice(0, 2).map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                          {submission.keywords.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{submission.keywords.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{submission.submissionDate}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleViewDetail(submission)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail View Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Title Submission Detail</DialogTitle>
            <DialogDescription>Review and validate thesis title submission</DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6">
              {/* Student Profile */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Student Name</Label>
                      <p className="mt-1">{selectedSubmission.studentName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Student ID</Label>
                      <p className="mt-1">{selectedSubmission.studentId}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Study Program</Label>
                      <p className="mt-1">{selectedSubmission.studyProgram}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Submission Date</Label>
                      <p className="mt-1">{selectedSubmission.submissionDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submitted Title */}
              <div>
                <Label>Submitted Thesis Title</Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                  <p>{selectedSubmission.thesisTitle}</p>
                </div>
              </div>

              {/* Problem Statement */}
              <div>
                <Label>Problem Statement</Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm leading-relaxed">{selectedSubmission.problemStatement}</p>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <Label>Keywords / Topic Area</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedSubmission.keywords.map((keyword, idx) => (
                    <Badge key={idx} className="bg-blue-500 hover:bg-blue-600">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Notes/History */}
              {selectedSubmission.notes && (
                <div>
                  <Label>Notes / History</Label>
                  <div className="mt-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm">{selectedSubmission.notes}</p>
                  </div>
                </div>
              )}

              {/* Validation Actions - Only for Pending submissions */}
              {selectedSubmission.status === "Pending" && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg">Validation Actions</h3>

                  {/* Assign Supervisor */}
                  <div>
                    <Label>Assign Supervisor *</Label>
                    <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a supervisor" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockLecturers.map((lecturer) => (
                          <SelectItem key={lecturer.id} value={lecturer.name}>
                            <div className="flex flex-col py-1">
                              <span>{lecturer.name}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">
                                  Expertise: {lecturer.expertise.join(", ")}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 mt-1">
                                Current supervisees: {lecturer.currentSupervisees}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reject Comment */}
                  <div>
                    <Label>Rejection Comment (mandatory if rejecting)</Label>
                    <Textarea
                      placeholder="Provide detailed reason for rejection..."
                      value={rejectComment}
                      onChange={(e) => setRejectComment(e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleApprove}
                      className="flex-1 bg-green-600 hover:bg-green-700 h-12"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Approve Title & Assign Supervisor
                    </Button>
                    <Button
                      onClick={handleReject}
                      variant="destructive"
                      className="flex-1 h-12"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Reject Title
                    </Button>
                  </div>
                </div>
              )}

              {/* Show status for already processed submissions */}
              {selectedSubmission.status !== "Pending" && (
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <span>Current Status:</span>
                    {getStatusBadge(selectedSubmission.status)}
                  </div>
                  {selectedSubmission.supervisor && (
                    <div className="flex items-center justify-between mt-2">
                      <span>Assigned Supervisor:</span>
                      <span>{selectedSubmission.supervisor}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
