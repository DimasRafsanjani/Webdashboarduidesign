import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Users,
  Calendar,
  Award,
  Search,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ThesisStage {
  id: number;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  date?: string;
}

interface StudentProgress {
  id: string;
  name: string;
  nim: string;
  title: string;
  supervisor: string;
  currentStage: number;
  stages: ThesisStage[];
  overallProgress: number;
}

const stageTemplate: ThesisStage[] = [
  {
    id: 1,
    name: "Title Submission",
    description: "Student submits thesis title proposal",
    status: "pending",
  },
  {
    id: 2,
    name: "Supervisor Assignment",
    description: "Admin assigns supervisor based on expertise",
    status: "pending",
  },
  {
    id: 3,
    name: "Title Validation",
    description: "Supervisor accepts the proposal",
    status: "pending",
  },
  {
    id: 4,
    name: "First Mentoring",
    description: "Supervisor sets first mentoring schedule",
    status: "pending",
  },
  {
    id: 5,
    name: "Chapter Upload (BAB 1-5)",
    description: "Student uploads thesis chapters progressively",
    status: "pending",
  },
  {
    id: 6,
    name: "Mentoring Sessions (4x)",
    description: "Complete 4 mentoring sessions",
    status: "pending",
  },
  {
    id: 7,
    name: "Seminar Proposal",
    description: "Student submits seminar proposal application",
    status: "pending",
  },
  {
    id: 8,
    name: "Seminar Schedule",
    description: "Admin sets date and assigns examiners",
    status: "pending",
  },
  {
    id: 9,
    name: "Continue Mentoring",
    description: "Supervisor continues until BAB 5 complete",
    status: "pending",
  },
  {
    id: 10,
    name: "Yudisium Application",
    description: "Student applies for final defense",
    status: "pending",
  },
  {
    id: 11,
    name: "Yudisium Schedule",
    description: "Admin schedules and assigns examiners",
    status: "pending",
  },
  {
    id: 12,
    name: "Final Examination",
    description: "Examiners input final scores",
    status: "pending",
  },
  {
    id: 13,
    name: "Result & Revision",
    description: "Pass, Pass with Revision, or Fail",
    status: "pending",
  },
];

const mockStudents: StudentProgress[] = [
  {
    id: "1",
    name: "Sarah Putri Wijaya",
    nim: "2019010001",
    title: "Machine Learning for Sentiment Analysis",
    supervisor: "Dr. Ahmad Fauzi",
    currentStage: 8,
    stages: stageTemplate.map((stage, idx) => ({
      ...stage,
      status: idx < 7 ? "completed" : idx === 7 ? "in-progress" : "pending",
      date: idx < 7 ? "2024-05-" + (idx + 1).toString().padStart(2, "0") : undefined,
    })),
    overallProgress: 62,
  },
  {
    id: "2",
    name: "Muhammad Rizki",
    nim: "2019010002",
    title: "Blockchain Implementation in Supply Chain",
    supervisor: "Dr. Budi Santoso",
    currentStage: 5,
    stages: stageTemplate.map((stage, idx) => ({
      ...stage,
      status: idx < 4 ? "completed" : idx === 4 ? "in-progress" : "pending",
      date: idx < 4 ? "2024-04-" + (idx + 10).toString() : undefined,
    })),
    overallProgress: 38,
  },
  {
    id: "3",
    name: "Aisyah Rahmadani",
    nim: "2019010003",
    title: "IoT-based Smart Agriculture System",
    supervisor: "Dr. Dewi Lestari",
    currentStage: 11,
    stages: stageTemplate.map((stage, idx) => ({
      ...stage,
      status: idx < 10 ? "completed" : idx === 10 ? "in-progress" : "pending",
      date: idx < 10 ? "2024-03-" + (idx + 5).toString() : undefined,
    })),
    overallProgress: 85,
  },
];

export function ThesisLifecycle() {
  const [students, setStudents] = useState<StudentProgress[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nim.includes(searchTerm);
    const matchesFilter =
      filterStage === "all" || student.currentStage.toString() === filterStage;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Thesis Lifecycle Management</h1>
          <p className="text-gray-500 mt-2">
            Track student progress through the complete thesis process
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h2 className="mt-2">{students.length}</h2>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <h2 className="mt-2">
                  {students.filter((s) => s.currentStage < 13).length}
                </h2>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Near Completion</p>
                <h2 className="mt-2">
                  {students.filter((s) => s.currentStage >= 10).length}
                </h2>
              </div>
              <Award className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Progress</p>
                <h2 className="mt-2">
                  {Math.round(
                    students.reduce((sum, s) => sum + s.overallProgress, 0) /
                      students.length
                  )}
                  %
                </h2>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Student Progress Tracking</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or NIM..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="1">Title Submission</SelectItem>
                  <SelectItem value="4">First Mentoring</SelectItem>
                  <SelectItem value="7">Seminar Proposal</SelectItem>
                  <SelectItem value="10">Yudisium Application</SelectItem>
                  <SelectItem value="13">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4>{student.name}</h4>
                    <p className="text-sm text-gray-500">
                      {student.nim} • {student.supervisor}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{student.title}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Thesis Progress - {student.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {student.stages.map((stage, idx) => (
                          <div
                            key={stage.id}
                            className="flex items-start gap-4 p-3 rounded-lg bg-gray-50"
                          >
                            <div className="flex-shrink-0 mt-1">
                              {getStatusIcon(stage.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm">
                                  {stage.id}. {stage.name}
                                </h4>
                                {stage.status === "completed" && stage.date && (
                                  <span className="text-xs text-gray-500">{stage.date}</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{stage.description}</p>
                              <Badge
                                className="mt-2"
                                variant={
                                  stage.status === "completed"
                                    ? "default"
                                    : stage.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {stage.status === "completed"
                                  ? "Completed"
                                  : stage.status === "in-progress"
                                  ? "In Progress"
                                  : "Pending"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Stage {student.currentStage} of 13
                    </span>
                    <span>{student.overallProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(
                        student.overallProgress
                      )}`}
                      style={{ width: `${student.overallProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Current: {student.stages[student.currentStage - 1]?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Thesis Process Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex flex-wrap gap-4">
              {stageTemplate.map((stage, idx) => (
                <div key={stage.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm">{stage.id}</span>
                    </div>
                    <div className="w-32 mt-2 text-center">
                      <p className="text-xs">{stage.name}</p>
                    </div>
                  </div>
                  {idx < stageTemplate.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-300 mb-12"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
