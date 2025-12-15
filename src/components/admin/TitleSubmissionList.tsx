import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import { Search, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

const submissions = [
  {
    id: "1",
    student: "Ahmad Fauzi",
    nim: "2019010001",
    title: "Machine Learning for Sentiment Analysis on Social Media",
    supervisor: "Dr. Budi Santoso",
    submittedDate: "2024-05-10",
    status: "pending",
  },
  {
    id: "2",
    student: "Sarah Putri Wijaya",
    nim: "2019010002",
    title: "Blockchain Implementation in Supply Chain Management",
    supervisor: "Prof. Dr. Siti Rahmah",
    submittedDate: "2024-05-09",
    status: "approved",
  },
  {
    id: "3",
    student: "Muhammad Rizki",
    nim: "2019010003",
    title: "IoT-based Smart Agriculture Monitoring System",
    supervisor: "Dr. Ahmad Hasan",
    submittedDate: "2024-05-08",
    status: "pending",
  },
  {
    id: "4",
    student: "Dewi Lestari",
    nim: "2019010004",
    title: "Computer Vision for Automated Traffic Violation Detection",
    supervisor: "Dr. Bambang Supriyanto",
    submittedDate: "2024-05-07",
    status: "approved",
  },
  {
    id: "5",
    student: "Budi Hartanto",
    nim: "2019010005",
    title: "Web-based Learning Management System with Gamification",
    supervisor: "Dr. Siti Rahmah",
    submittedDate: "2024-05-06",
    status: "rejected",
  },
  {
    id: "6",
    student: "Aisyah Rahmadani",
    nim: "2019010006",
    title: "Mobile Application for Mental Health Monitoring",
    supervisor: "Prof. Dr. Joko Widodo",
    submittedDate: "2024-05-05",
    status: "pending",
  },
];

export function TitleSubmissionList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.nim.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Title Submission List</h1>
        <p className="text-gray-500 mt-2">Review and approve student thesis title submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Submissions</div>
            <div className="text-2xl mt-1">{submissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Pending Review</div>
            <div className="text-2xl mt-1 text-yellow-600">
              {submissions.filter((s) => s.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Approved</div>
            <div className="text-2xl mt-1 text-green-600">
              {submissions.filter((s) => s.status === "approved").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Rejected</div>
            <div className="text-2xl mt-1 text-red-600">
              {submissions.filter((s) => s.status === "rejected").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by student name, NIM, or title..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <div>{submission.student}</div>
                          <div className="text-sm text-gray-500">{submission.nim}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="line-clamp-2">{submission.title}</div>
                      </TableCell>
                      <TableCell>{submission.supervisor}</TableCell>
                      <TableCell>{submission.submittedDate}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {submission.status === "pending" && (
                            <>
                              <Button variant="ghost" size="icon" className="text-green-600">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-600">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
