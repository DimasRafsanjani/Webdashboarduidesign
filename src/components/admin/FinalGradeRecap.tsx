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
import { Search, Download, Eye, Award, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const grades = [
  {
    id: "1",
    student: "Sarah Putri Wijaya",
    nim: "2019010002",
    program: "Computer Science",
    supervisor: "Prof. Dr. Siti Rahmah",
    supervisionGrade: 85,
    examiner1Grade: 88,
    examiner2Grade: 86,
    finalGrade: 86.3,
    letterGrade: "A",
    status: "Passed",
  },
  {
    id: "2",
    student: "Dewi Lestari",
    nim: "2019010004",
    program: "Information Systems",
    supervisor: "Dr. Bambang Supriyanto",
    supervisionGrade: 82,
    examiner1Grade: 85,
    examiner2Grade: 83,
    finalGrade: 83.3,
    letterGrade: "A-",
    status: "Passed",
  },
  {
    id: "3",
    student: "Muhammad Rizki",
    nim: "2019010003",
    program: "Computer Science",
    supervisor: "Dr. Ahmad Hasan",
    supervisionGrade: 78,
    examiner1Grade: 80,
    examiner2Grade: 79,
    finalGrade: 79.0,
    letterGrade: "B+",
    status: "Passed",
  },
  {
    id: "4",
    student: "Fitri Handayani",
    nim: "2019010008",
    program: "Information Systems",
    supervisor: "Dr. Budi Santoso",
    supervisionGrade: 75,
    examiner1Grade: 77,
    examiner2Grade: 76,
    finalGrade: 76.0,
    letterGrade: "B+",
    status: "Passed",
  },
  {
    id: "5",
    student: "Budi Hartanto",
    nim: "2019010005",
    program: "Software Engineering",
    supervisor: "Dr. Siti Rahmah",
    supervisionGrade: 70,
    examiner1Grade: 72,
    examiner2Grade: 68,
    finalGrade: 70.0,
    letterGrade: "B",
    status: "Revision",
  },
];

const gradeDistribution = [
  { grade: "A", count: 1, color: "#10b981" },
  { grade: "A-", count: 1, color: "#3b82f6" },
  { grade: "B+", count: 2, color: "#6366f1" },
  { grade: "B", count: 1, color: "#8b5cf6" },
];

const programStats = [
  { program: "CS", average: 83.7 },
  { program: "IS", average: 79.7 },
  { program: "SE", average: 70.0 },
];

export function FinalGradeRecap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredGrades = grades.filter((grade) => {
    const matchesSearch =
      grade.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.nim.includes(searchTerm);
    const matchesProgram = filterProgram === "all" || grade.program === filterProgram;
    const matchesStatus = filterStatus === "all" || grade.status === filterStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  const getGradeColor = (letterGrade: string) => {
    if (letterGrade.startsWith("A")) return "bg-green-500";
    if (letterGrade.startsWith("B")) return "bg-blue-500";
    if (letterGrade.startsWith("C")) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Final Grade Recap</h1>
          <p className="text-gray-500 mt-2">Complete overview of student final grades and performance</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Students</div>
            <div className="text-2xl mt-1">{grades.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Average Grade</div>
            <div className="text-2xl mt-1 text-blue-600">
              {(grades.reduce((sum, g) => sum + g.finalGrade, 0) / grades.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Passed</div>
            <div className="text-2xl mt-1 text-green-600">
              {grades.filter((g) => g.status === "Passed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Revision</div>
            <div className="text-2xl mt-1 text-yellow-600">
              {grades.filter((g) => g.status === "Revision").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Grade A</div>
            <div className="text-2xl mt-1 text-green-600">
              {grades.filter((g) => g.letterGrade.startsWith("A")).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3>Grade Distribution</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ grade, count }) => `${grade}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3>Average by Program</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={programStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="program" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#3b82f6" name="Average Grade" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or NIM..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterProgram} onValueChange={setFilterProgram}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Information Systems">Information Systems</SelectItem>
                <SelectItem value="Software Engineering">Software Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Passed">Passed</SelectItem>
                <SelectItem value="Revision">Revision</SelectItem>
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
                  <TableHead>Program</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead className="text-center">Supervision</TableHead>
                  <TableHead className="text-center">Examiner 1</TableHead>
                  <TableHead className="text-center">Examiner 2</TableHead>
                  <TableHead className="text-center">Final</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No grades found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <div>
                          <div>{grade.student}</div>
                          <div className="text-sm text-gray-500">{grade.nim}</div>
                        </div>
                      </TableCell>
                      <TableCell>{grade.program}</TableCell>
                      <TableCell className="text-sm">{grade.supervisor}</TableCell>
                      <TableCell className="text-center">{grade.supervisionGrade}</TableCell>
                      <TableCell className="text-center">{grade.examiner1Grade}</TableCell>
                      <TableCell className="text-center">{grade.examiner2Grade}</TableCell>
                      <TableCell className="text-center">
                        {grade.finalGrade.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getGradeColor(grade.letterGrade)}>
                          {grade.letterGrade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={grade.status === "Passed" ? "default" : "outline"}
                          className={grade.status === "Passed" ? "bg-green-500" : ""}
                        >
                          {grade.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
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
    </div>
  );
}
