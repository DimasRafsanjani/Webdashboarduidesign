import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import { Search, CheckCircle, XCircle, Eye, Filter } from "lucide-react";
import { toast } from "sonner";

interface TitleSubmission {
  id: string;
  studentName: string;
  nim: string;
  proposedTitle: string;
  field: string;
  submissionDate: string;
  status: "Pending" | "Approved" | "Rejected";
  abstract: string;
  keywords: string[];
  proposedSupervisor?: string;
}

const mockSubmissions: TitleSubmission[] = [
  {
    id: "1",
    studentName: "Ahmad Fauzi",
    nim: "2019010001",
    proposedTitle: "Machine Learning-Based Sentiment Analysis for Social Media",
    field: "Artificial Intelligence",
    submissionDate: "2024-05-10",
    status: "Pending",
    abstract: "This research proposes a machine learning approach to analyze sentiment in social media posts...",
    keywords: ["Machine Learning", "Sentiment Analysis", "NLP"],
  },
  {
    id: "2",
    studentName: "Sarah Putri Wijaya",
    nim: "2019010002",
    proposedTitle: "Blockchain Implementation for Supply Chain Transparency",
    field: "Blockchain Technology",
    submissionDate: "2024-05-09",
    status: "Pending",
    abstract: "This study explores the implementation of blockchain technology to enhance supply chain transparency...",
    keywords: ["Blockchain", "Supply Chain", "Distributed Systems"],
  },
  {
    id: "3",
    studentName: "Muhammad Rizki",
    nim: "2019010003",
    proposedTitle: "IoT-Based Smart Agriculture Monitoring System",
    field: "Internet of Things",
    submissionDate: "2024-05-08",
    status: "Approved",
    abstract: "Development of an IoT system for real-time monitoring of agricultural parameters...",
    keywords: ["IoT", "Agriculture", "Sensors"],
    proposedSupervisor: "Dr. Dewi Lestari",
  },
  {
    id: "4",
    studentName: "Aisyah Rahmadani",
    nim: "2019010004",
    proposedTitle: "Mobile App for Mental Health Support Using Gamification",
    field: "Mobile Development",
    submissionDate: "2024-05-07",
    status: "Pending",
    abstract: "This thesis develops a mobile application that uses gamification to support mental health...",
    keywords: ["Mobile Development", "Gamification", "Health"],
  },
  {
    id: "5",
    studentName: "Dimas Prasetyo",
    nim: "2019010005",
    proposedTitle: "Computer Vision for Automatic Traffic Violation Detection",
    field: "Computer Vision",
    submissionDate: "2024-05-06",
    status: "Rejected",
    abstract: "Implementation of computer vision algorithms for detecting traffic violations...",
    keywords: ["Computer Vision", "Deep Learning", "Traffic"],
  },
];

const supervisors = [
  { id: "1", name: "Dr. Ahmad Fauzi", expertise: "Machine Learning, AI" },
  { id: "2", name: "Prof. Dr. Siti Rahmah", expertise: "Data Mining, Big Data" },
  { id: "3", name: "Dr. Budi Santoso", expertise: "UI/UX Design, Mobile Dev" },
  { id: "4", name: "Dr. Dewi Lestari", expertise: "IoT, Embedded Systems" },
  { id: "5", name: "Dr. Bambang Supriyanto", expertise: "Blockchain, Security" },
];

export function TitleValidation() {
  const [submissions, setSubmissions] = useState<TitleSubmission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<TitleSubmission | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [supervisorType, setSupervisorType] = useState("primary");
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.nim.includes(searchTerm) ||
      submission.proposedTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleValidate = (submission: TitleSubmission) => {
    setSelectedSubmission(submission);
    setSelectedSupervisor(submission.proposedSupervisor || "");
    setIsDrawerOpen(true);
  };

  const handleApprove = () => {
    if (!selectedSupervisor) {
      toast.error("Validation Error", {
        description: "Please select a supervisor before approving",
      });
      return;
    }

    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission?.id
          ? { ...sub, status: "Approved" as const, proposedSupervisor: selectedSupervisor }
          : sub
      )
    );

    toast.success("Title Approved", {
      description: `${selectedSubmission?.proposedTitle} has been approved and assigned to ${selectedSupervisor}`,
    });

    setIsDrawerOpen(false);
    setSelectedSubmission(null);
    setSelectedSupervisor("");
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error("Validation Error", {
        description: "Please provide a reason for rejection",
      });
      return;
    }

    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission?.id ? { ...sub, status: "Rejected" as const } : sub
      )
    );

    toast.error("Title Rejected", {
      description: `${selectedSubmission?.proposedTitle} has been rejected`,
    });

    setIsDrawerOpen(false);
    setSelectedSubmission(null);
    setRejectionReason("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const pendingCount = submissions.filter((s) => s.status === "Pending").length;
  const approvedCount = submissions.filter((s) => s.status === "Approved").length;
  const rejectedCount = submissions.filter((s) => s.status === "Rejected").length;

  return (
    <div className="space-y-6">
      <div>
        <h1>Title Validation & Supervisor Assignment</h1>
        <p className="text-gray-500 mt-2">
          Review student thesis proposals and assign supervisors
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Submissions</p>
                <h2 className="mt-2">{submissions.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <h2 className="mt-2">{pendingCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Filter className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <h2 className="mt-2">{approvedCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <h2 className="mt-2">{rejectedCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Title Submissions</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, NIM, or title..."
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
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>NIM</TableHead>
                  <TableHead>Proposed Title</TableHead>
                  <TableHead>Field/Category</TableHead>
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
                    <TableRow key={submission.id}>
                      <TableCell>{submission.studentName}</TableCell>
                      <TableCell>{submission.nim}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate">{submission.proposedTitle}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.field}</Badge>
                      </TableCell>
                      <TableCell>{submission.submissionDate}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={submission.status === "Pending" ? "default" : "outline"}
                          onClick={() => handleValidate(submission)}
                          disabled={submission.status !== "Pending"}
                        >
                          {submission.status === "Pending" ? "Validate & Assign" : "View"}
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

      {/* Validation Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Validate Thesis Proposal</SheetTitle>
            <SheetDescription>
              Review the proposal details and assign a supervisor
            </SheetDescription>
          </SheetHeader>

          {selectedSubmission && (
            <div className="space-y-6 mt-6">
              {/* Student Info */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Student Name:</span>
                  <span>{selectedSubmission.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">NIM:</span>
                  <span>{selectedSubmission.nim}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Submission Date:</span>
                  <span>{selectedSubmission.submissionDate}</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <Label>Proposed Title</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p>{selectedSubmission.proposedTitle}</p>
                </div>
              </div>

              {/* Field */}
              <div>
                <Label>Field/Category</Label>
                <div className="mt-2">
                  <Badge variant="outline">{selectedSubmission.field}</Badge>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <Label>Keywords</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedSubmission.keywords.map((keyword, idx) => (
                    <Badge key={idx} className="bg-blue-100 text-blue-700">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Abstract */}
              <div>
                <Label>Abstract</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{selectedSubmission.abstract}</p>
                </div>
              </div>

              {/* Supervisor Selection */}
              <div>
                <Label>Select Supervisor *</Label>
                <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {supervisors.map((supervisor) => (
                      <SelectItem key={supervisor.id} value={supervisor.name}>
                        <div className="flex flex-col">
                          <span>{supervisor.name}</span>
                          <span className="text-xs text-gray-500">{supervisor.expertise}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Supervisor Type */}
              <div>
                <Label>Supervisor Type</Label>
                <Select value={supervisorType} onValueChange={setSupervisorType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Supervisor</SelectItem>
                    <SelectItem value="secondary">Secondary Supervisor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rejection Reason (if needed) */}
              <div>
                <Label>Rejection Reason (if rejecting)</Label>
                <Textarea
                  placeholder="Provide reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Assign
                </Button>
                <Button
                  onClick={handleReject}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
