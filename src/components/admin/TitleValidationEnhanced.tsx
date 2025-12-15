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
import { Search, Eye, CheckCircle, XCircle, FileText, Users, Mail, Phone, Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

interface TitleSubmission {
  id: string;
  studentName: string;
  studentId: string;
  studyProgram: string;
  faculty: string;
  email: string;
  phone: string;
  thesisTitle: string;
  keywords: string[];
  problemBackground: string;
  objective: string;
  submissionDate: string;
  status: "Pending" | "Validated" | "Rejected";
  fileAttachment?: string;
  supervisor?: string;
  secondarySupervisor?: string;
  notes?: string;
}

interface Lecturer {
  id: string;
  name: string;
  expertise: string[];
  currentSupervisees: number;
  maxCapacity: number;
  available: boolean;
}

const mockSubmissions: TitleSubmission[] = [
  {
    id: "1",
    studentName: "Ahmad Fauzi",
    studentId: "2019010001",
    studyProgram: "Computer Science",
    faculty: "Faculty of Science and Technology",
    email: "ahmad.fauzi@university.ac.id",
    phone: "+62 812-3456-7890",
    thesisTitle: "Machine Learning-Based Sentiment Analysis for Indonesian Social Media Posts",
    keywords: ["Machine Learning", "Sentiment Analysis", "Natural Language Processing", "Deep Learning"],
    problemBackground: "Social media platforms in Indonesia generate massive amounts of unstructured text data daily. Traditional sentiment analysis methods struggle with informal Indonesian language, regional slang, code-switching between Indonesian and English, and the unique characteristics of social media communication. Existing sentiment analysis tools are primarily designed for English and fail to capture the nuances of Indonesian expressions.",
    objective: "This research aims to develop an advanced machine learning model specifically trained on Indonesian social media data that can accurately classify sentiment (positive, negative, neutral) while handling informal language, slang, emoticons, and code-switching. The system will be evaluated on Twitter and Instagram datasets with a target accuracy of 85% or higher.",
    submissionDate: "2024-05-15",
    status: "Pending",
    fileAttachment: "proposal_draft_ahmad.pdf",
  },
  {
    id: "2",
    studentName: "Sarah Putri Wijaya",
    studentId: "2019010002",
    studyProgram: "Information Systems",
    faculty: "Faculty of Science and Technology",
    email: "sarah.putri@university.ac.id",
    phone: "+62 813-9876-5432",
    thesisTitle: "Blockchain-Based Supply Chain Transparency System for Agricultural Products",
    keywords: ["Blockchain", "Supply Chain", "Agriculture", "Smart Contracts", "Transparency"],
    problemBackground: "The agricultural supply chain in Indonesia lacks transparency, leading to trust issues between farmers, distributors, and consumers. Consumers cannot verify product authenticity, origin, or handling process. This information asymmetry results in lower prices for farmers and concerns about food safety for consumers.",
    objective: "To design and implement a blockchain-based system that tracks agricultural products from farm to consumer, creating an immutable record of the product journey. The system will use Ethereum smart contracts to record each transaction, enable QR code scanning for product verification, and provide a mobile interface for all stakeholders.",
    submissionDate: "2024-05-15",
    status: "Pending",
    fileAttachment: "proposal_sarah.pdf",
  },
  {
    id: "3",
    studentName: "Muhammad Rizki",
    studentId: "2019010003",
    studyProgram: "Computer Science",
    faculty: "Faculty of Science and Technology",
    email: "m.rizki@university.ac.id",
    phone: "+62 815-2468-1357",
    thesisTitle: "IoT-Based Smart Agriculture Monitoring System with Machine Learning Prediction",
    keywords: ["IoT", "Agriculture", "Sensors", "Machine Learning", "Monitoring"],
    problemBackground: "Traditional agriculture in Indonesia relies heavily on manual monitoring and farmer intuition, which is time-consuming and often inaccurate. Climate change has made weather patterns unpredictable, making it difficult for farmers to make informed decisions about irrigation, fertilization, and pest control.",
    objective: "To develop an IoT-based system using ESP32 microcontrollers and various sensors (soil moisture, temperature, humidity, pH) that continuously monitors agricultural parameters. The system will integrate machine learning algorithms to predict optimal irrigation schedules and detect early signs of crop stress, accessible through a mobile dashboard.",
    submissionDate: "2024-05-14",
    status: "Validated",
    supervisor: "Dr. Dewi Lestari",
    secondarySupervisor: "Dr. Ahmad Hasan",
  },
  {
    id: "4",
    studentName: "Aisyah Rahmadani",
    studentId: "2019010004",
    studyProgram: "Information Systems",
    faculty: "Faculty of Science and Technology",
    email: "aisyah.r@university.ac.id",
    phone: "+62 817-5555-8888",
    thesisTitle: "Mobile Application for Mental Health Support Using Gamification and AI Chatbot",
    keywords: ["Mobile Development", "Mental Health", "Gamification", "Artificial Intelligence", "Chatbot"],
    problemBackground: "Mental health awareness is growing in Indonesia, but many people, especially students, lack access to professional support due to stigma, cost, and limited availability of counselors. Young adults prefer digital solutions but existing mental health apps are not culturally adapted to Indonesian context.",
    objective: "To develop a Flutter-based mobile application that provides mental health support through gamification elements (mood tracking, achievement badges, daily challenges) and an AI-powered chatbot trained on mental health resources. The app will include features for journaling, breathing exercises, and professional referrals when needed.",
    submissionDate: "2024-05-13",
    status: "Pending",
    fileAttachment: "mental_health_app_proposal.pdf",
  },
];

const mockLecturers: Lecturer[] = [
  {
    id: "1",
    name: "Dr. Ahmad Fauzi",
    expertise: ["Machine Learning", "Artificial Intelligence", "Data Mining", "NLP"],
    currentSupervisees: 8,
    maxCapacity: 10,
    available: true,
  },
  {
    id: "2",
    name: "Prof. Dr. Siti Rahmah",
    expertise: ["Data Science", "Big Data", "Analytics", "Business Intelligence"],
    currentSupervisees: 10,
    maxCapacity: 10,
    available: false,
  },
  {
    id: "3",
    name: "Dr. Budi Santoso",
    expertise: ["UI/UX Design", "Mobile Development", "Human-Computer Interaction", "Flutter"],
    currentSupervisees: 6,
    maxCapacity: 10,
    available: true,
  },
  {
    id: "4",
    name: "Dr. Dewi Lestari",
    expertise: ["IoT", "Embedded Systems", "Sensor Networks", "Arduino"],
    currentSupervisees: 7,
    maxCapacity: 10,
    available: true,
  },
  {
    id: "5",
    name: "Dr. Bambang Supriyanto",
    expertise: ["Blockchain", "Cryptography", "Distributed Systems", "Smart Contracts"],
    currentSupervisees: 5,
    maxCapacity: 10,
    available: true,
  },
  {
    id: "6",
    name: "Dr. Ahmad Hasan",
    expertise: ["Software Engineering", "Cloud Computing", "DevOps", "System Design"],
    currentSupervisees: 7,
    maxCapacity: 10,
    available: true,
  },
];

export function TitleValidationEnhanced() {
  const [submissions, setSubmissions] = useState<TitleSubmission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<TitleSubmission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Form states
  const [validationAction, setValidationAction] = useState<"approve" | "reject" | "revision" | "">("");
  const [primarySupervisor, setPrimarySupervisor] = useState("");
  const [secondarySupervisor, setSecondarySupervisor] = useState("");
  const [notes, setNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [revisionNotes, setRevisionNotes] = useState("");

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
    setPrimarySupervisor(submission.supervisor || "");
    setSecondarySupervisor(submission.secondarySupervisor || "");
    setNotes(submission.notes || "");
    setValidationAction("");
    setRejectionReason("");
    setRevisionNotes("");
    setIsDetailOpen(true);
  };

  const getRecommendedSupervisors = (keywords: string[]) => {
    return mockLecturers
      .map((lecturer) => {
        const matchCount = keywords.filter((keyword) =>
          lecturer.expertise.some((exp) => exp.toLowerCase().includes(keyword.toLowerCase()))
        ).length;
        return { ...lecturer, matchCount };
      })
      .filter((l) => l.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);
  };

  const handleSaveDecision = () => {
    if (!validationAction) {
      toast.error("Please select a validation action");
      return;
    }

    if (validationAction === "approve" && !primarySupervisor) {
      toast.error("Please select a primary supervisor");
      return;
    }

    if (validationAction === "reject" && !rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    if (validationAction === "revision" && !revisionNotes.trim()) {
      toast.error("Please provide notes for revision");
      return;
    }

    // Update submission
    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission?.id
          ? {
              ...sub,
              status: validationAction === "approve" ? "Validated" : "Rejected",
              supervisor: validationAction === "approve" ? primarySupervisor : sub.supervisor,
              secondarySupervisor: validationAction === "approve" ? secondarySupervisor : sub.secondarySupervisor,
              notes: validationAction === "approve" ? notes : validationAction === "reject" ? rejectionReason : revisionNotes,
            }
          : sub
      )
    );

    const actionText = validationAction === "approve" ? "approved" : validationAction === "reject" ? "rejected" : "sent for revision";
    toast.success(`Title ${actionText}`, {
      description: `${selectedSubmission?.thesisTitle} has been ${actionText}`,
    });

    setIsDetailOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedSubmission(null);
    setValidationAction("");
    setPrimarySupervisor("");
    setSecondarySupervisor("");
    setNotes("");
    setRejectionReason("");
    setRevisionNotes("");
  };

  const isFormValid = () => {
    if (!validationAction) return false;
    if (validationAction === "approve" && !primarySupervisor) return false;
    if (validationAction === "reject" && !rejectionReason.trim()) return false;
    if (validationAction === "revision" && !revisionNotes.trim()) return false;
    return true;
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
        <h1>Title Validation</h1>
        <p className="text-gray-500 mt-2">
          Review and validate student thesis title submissions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Submissions</p>
                <h2 className="mt-2">{submissions.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <h2 className="mt-2">{pendingCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Validated</p>
                <h2 className="mt-2">{validatedCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <h2 className="mt-2">{rejectedCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar & Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Title Submissions</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, NIM, or status..."
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
                  <TableHead>Keywords</TableHead>
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
                    <TableRow key={submission.id} className="hover:bg-gray-50 transition-colors">
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
                          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
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

      {/* Large Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Title Submission Detail & Validation</DialogTitle>
            <DialogDescription>
              Review student information and thesis proposal details
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6 mt-4">
              {/* A. Student Information Block */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Student Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600 text-sm">Student Name</Label>
                      <p className="mt-1">{selectedSubmission.studentName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 text-sm">Student ID</Label>
                      <p className="mt-1">{selectedSubmission.studentId}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 text-sm">Study Program</Label>
                      <p className="mt-1">{selectedSubmission.studyProgram}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 text-sm">Faculty</Label>
                      <p className="mt-1">{selectedSubmission.faculty}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 text-sm flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <p className="mt-1 text-sm text-blue-600">{selectedSubmission.email}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 text-sm flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </Label>
                      <p className="mt-1 text-sm">{selectedSubmission.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* B. Thesis Submission Block */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-700" />
                    Thesis Submission Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Thesis Title</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                      <p>{selectedSubmission.thesisTitle}</p>
                    </div>
                  </div>

                  <div>
                    <Label>Keywords</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedSubmission.keywords.map((keyword, idx) => (
                        <Badge key={idx} className="bg-blue-500 hover:bg-blue-600">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Problem Background</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                      <p className="text-sm leading-relaxed text-gray-700">{selectedSubmission.problemBackground}</p>
                    </div>
                  </div>

                  <div>
                    <Label>Goal / Objective</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                      <p className="text-sm leading-relaxed text-gray-700">{selectedSubmission.objective}</p>
                    </div>
                  </div>

                  {selectedSubmission.fileAttachment && (
                    <div>
                      <Label>File Upload</Label>
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download {selectedSubmission.fileAttachment}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* C. Supervisor Recommendation Block */}
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Recommended Supervisors (Based on Keywords)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getRecommendedSupervisors(selectedSubmission.keywords).slice(0, 3).map((lecturer) => (
                      <div
                        key={lecturer.id}
                        className="p-4 bg-white rounded-lg border border-purple-200 hover:border-purple-400 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm">{lecturer.name}</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {lecturer.expertise.map((exp, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {exp}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                              <span>Supervisees: {lecturer.currentSupervisees}/{lecturer.maxCapacity}</span>
                              <Badge className={lecturer.available ? "bg-green-500" : "bg-red-500"}>
                                {lecturer.available ? "Available" : "At Capacity"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* D. Validation Action Section */}
              {selectedSubmission.status === "Pending" && (
                <Card className="border-2 border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-base">Validation Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Action Selection */}
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setValidationAction("approve")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          validationAction === "approve"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                        }`}
                      >
                        <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${validationAction === "approve" ? "text-green-600" : "text-gray-400"}`} />
                        <p className="text-sm">Approve Title</p>
                      </button>

                      <button
                        onClick={() => setValidationAction("reject")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          validationAction === "reject"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-300 hover:bg-red-50/50"
                        }`}
                      >
                        <XCircle className={`w-8 h-8 mx-auto mb-2 ${validationAction === "reject" ? "text-red-600" : "text-gray-400"}`} />
                        <p className="text-sm">Reject Title</p>
                      </button>

                      <button
                        onClick={() => setValidationAction("revision")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          validationAction === "revision"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50"
                        }`}
                      >
                        <AlertCircle className={`w-8 h-8 mx-auto mb-2 ${validationAction === "revision" ? "text-yellow-600" : "text-gray-400"}`} />
                        <p className="text-sm">Request Revision</p>
                      </button>
                    </div>

                    {/* Approve Form */}
                    {validationAction === "approve" && (
                      <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div>
                          <Label>Select Primary Supervisor *</Label>
                          <Select value={primarySupervisor} onValueChange={setPrimarySupervisor}>
                            <SelectTrigger className="mt-2 bg-white">
                              <SelectValue placeholder="Choose primary supervisor" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockLecturers.filter(l => l.available).map((lecturer) => (
                                <SelectItem key={lecturer.id} value={lecturer.name}>
                                  <div className="flex flex-col py-1">
                                    <span>{lecturer.name}</span>
                                    <span className="text-xs text-gray-500">
                                      {lecturer.expertise.join(", ")} • {lecturer.currentSupervisees}/{lecturer.maxCapacity} supervisees
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Select Secondary Supervisor (Optional)</Label>
                          <Select value={secondarySupervisor} onValueChange={setSecondarySupervisor}>
                            <SelectTrigger className="mt-2 bg-white">
                              <SelectValue placeholder="Choose secondary supervisor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              {mockLecturers.filter(l => l.available && l.name !== primarySupervisor).map((lecturer) => (
                                <SelectItem key={lecturer.id} value={lecturer.name}>
                                  {lecturer.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Notes (Optional)</Label>
                          <Textarea
                            placeholder="Additional notes or instructions..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="mt-2 bg-white"
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

                    {/* Reject Form */}
                    {validationAction === "reject" && (
                      <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
                        <div>
                          <Label>Reason for Rejection *</Label>
                          <Textarea
                            placeholder="Please provide detailed reason for rejection..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="mt-2 bg-white"
                            rows={4}
                          />
                        </div>
                      </div>
                    )}

                    {/* Revision Form */}
                    {validationAction === "revision" && (
                      <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div>
                          <Label>Notes for Revision *</Label>
                          <Textarea
                            placeholder="Specify what needs to be revised..."
                            value={revisionNotes}
                            onChange={(e) => setRevisionNotes(e.target.value)}
                            className="mt-2 bg-white"
                            rows={4}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Show current status for non-pending */}
              {selectedSubmission.status !== "Pending" && (
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span>Current Status:</span>
                      {getStatusBadge(selectedSubmission.status)}
                    </div>
                    {selectedSubmission.supervisor && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Primary Supervisor: </span>
                        <span>{selectedSubmission.supervisor}</span>
                      </div>
                    )}
                    {selectedSubmission.secondarySupervisor && (
                      <div className="mt-1">
                        <span className="text-sm text-gray-600">Secondary Supervisor: </span>
                        <span>{selectedSubmission.secondarySupervisor}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* E. Footer Buttons */}
          <DialogFooter className="gap-3">
            <Button variant="ghost" onClick={() => setIsDetailOpen(false)}>
              Cancel
            </Button>
            {selectedSubmission?.status === "Pending" && (
              <Button 
                onClick={handleSaveDecision} 
                disabled={!isFormValid()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save Decision
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
