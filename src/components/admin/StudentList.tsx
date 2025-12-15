import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
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
  DialogTrigger,
} from "../ui/dialog";
import { Search, Eye, Edit, Trash2, Plus, Download, UserPlus } from "lucide-react";
import { toast } from "sonner";

const students = [
  {
    id: "1",
    name: "Ahmad Fauzi",
    nim: "2019010001",
    program: "Computer Science",
    supervisor: "Dr. Budi Santoso",
    status: "Active",
    progress: 65,
  },
  {
    id: "2",
    name: "Sarah Putri Wijaya",
    nim: "2019010002",
    program: "Information Systems",
    supervisor: "Prof. Dr. Siti Rahmah",
    status: "Active",
    progress: 85,
  },
  {
    id: "3",
    name: "Muhammad Rizki",
    nim: "2019010003",
    program: "Computer Science",
    supervisor: "Dr. Ahmad Hasan",
    status: "Active",
    progress: 70,
  },
  {
    id: "4",
    name: "Dewi Lestari",
    nim: "2019010004",
    program: "Software Engineering",
    supervisor: "Dr. Bambang Supriyanto",
    status: "Completed",
    progress: 100,
  },
  {
    id: "5",
    name: "Budi Hartanto",
    nim: "2019010005",
    program: "Information Systems",
    supervisor: "Dr. Siti Rahmah",
    status: "Active",
    progress: 45,
  },
  {
    id: "6",
    name: "Aisyah Rahmadani",
    nim: "2019010006",
    program: "Computer Science",
    supervisor: "Prof. Dr. Joko Widodo",
    status: "Active",
    progress: 80,
  },
  {
    id: "7",
    name: "Dimas Prasetyo",
    nim: "2019010007",
    program: "Software Engineering",
    supervisor: "Dr. Ahmad Hasan",
    status: "Active",
    progress: 55,
  },
  {
    id: "8",
    name: "Fitri Handayani",
    nim: "2019010008",
    program: "Information Systems",
    supervisor: "Dr. Budi Santoso",
    status: "Completed",
    progress: 100,
  },
];

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProgram, setFilterProgram] = useState("all");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nim.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    const matchesProgram = filterProgram === "all" || student.program === filterProgram;
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const handleAssignSupervisor = () => {
    toast.success("Supervisor Assigned", {
      description: `${selectedSupervisor} has been assigned to ${selectedStudent?.name}`,
    });
    setIsAssignDialogOpen(false);
    setSelectedStudent(null);
    setSelectedSupervisor("");
  };

  const openAssignDialog = (student: any) => {
    setSelectedStudent(student);
    setIsAssignDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Student List</h1>
          <p className="text-gray-500 mt-2">Manage all students in final project system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
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
                <SelectValue placeholder="Filter by Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Information Systems">Information Systems</SelectItem>
                <SelectItem value="Software Engineering">Software Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.nim}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>{student.supervisor}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={student.status === "Active" ? "default" : "secondary"}
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openAssignDialog(student)}
                          >
                            <UserPlus className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredStudents.length} of {students.length} students
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assign Supervisor Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Thesis Supervisor</DialogTitle>
            <DialogDescription>
              Assign a supervisor to {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Student</Label>
              <Input value={selectedStudent?.name || ""} disabled />
            </div>
            <div>
              <Label>NIM</Label>
              <Input value={selectedStudent?.nim || ""} disabled />
            </div>
            <div>
              <Label>Select Supervisor</Label>
              <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a supervisor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Ahmad Fauzi">Dr. Ahmad Fauzi (Machine Learning)</SelectItem>
                  <SelectItem value="Prof. Dr. Siti Rahmah">Prof. Dr. Siti Rahmah (Data Mining)</SelectItem>
                  <SelectItem value="Dr. Budi Santoso">Dr. Budi Santoso (UI/UX Design)</SelectItem>
                  <SelectItem value="Dr. Dewi Lestari">Dr. Dewi Lestari (IoT Systems)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Role</Label>
              <Select defaultValue="primary">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary Supervisor</SelectItem>
                  <SelectItem value="secondary">Secondary Supervisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignSupervisor}>Assign Supervisor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}