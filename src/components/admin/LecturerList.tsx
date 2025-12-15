import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { Search, Eye, Edit, Trash2, Plus, UserPlus } from "lucide-react";

const lecturers = [
  {
    id: "1",
    name: "Dr. Budi Santoso, M.Kom",
    nidn: "0012345678",
    role: "Supervisor",
    totalStudents: 8,
    email: "budi.santoso@university.edu",
    phone: "+62 812 3456 7890",
  },
  {
    id: "2",
    name: "Prof. Dr. Siti Rahmah, M.Sc",
    nidn: "0023456789",
    role: "Supervisor & Examiner",
    totalStudents: 12,
    email: "siti.rahmah@university.edu",
    phone: "+62 813 4567 8901",
  },
  {
    id: "3",
    name: "Dr. Ahmad Hasan, M.T",
    nidn: "0034567890",
    role: "Supervisor",
    totalStudents: 6,
    email: "ahmad.hasan@university.edu",
    phone: "+62 814 5678 9012",
  },
  {
    id: "4",
    name: "Dr. Bambang Supriyanto, M.Kom",
    nidn: "0045678901",
    role: "Supervisor & Examiner",
    totalStudents: 10,
    email: "bambang.s@university.edu",
    phone: "+62 815 6789 0123",
  },
  {
    id: "5",
    name: "Prof. Dr. Joko Widodo, Ph.D",
    nidn: "0056789012",
    role: "Examiner",
    totalStudents: 0,
    email: "joko.widodo@university.edu",
    phone: "+62 816 7890 1234",
  },
  {
    id: "6",
    name: "Dr. Dewi Kusuma, M.Si",
    nidn: "0067890123",
    role: "Supervisor",
    totalStudents: 7,
    email: "dewi.kusuma@university.edu",
    phone: "+62 817 8901 2345",
  },
];

export function LecturerList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredLecturers = lecturers.filter((lecturer) => {
    const matchesSearch =
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.nidn.includes(searchTerm);
    const matchesRole =
      filterRole === "all" ||
      lecturer.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Lecturer List</h1>
          <p className="text-gray-500 mt-2">Manage supervisors and examiners</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Lecturer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Lecturers</div>
            <div className="text-2xl mt-1">{lecturers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Active Supervisors</div>
            <div className="text-2xl mt-1">
              {lecturers.filter((l) => l.role.includes("Supervisor")).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Active Examiners</div>
            <div className="text-2xl mt-1">
              {lecturers.filter((l) => l.role.includes("Examiner")).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Avg Students/Supervisor</div>
            <div className="text-2xl mt-1">
              {Math.round(
                lecturers.reduce((sum, l) => sum + l.totalStudents, 0) /
                  lecturers.filter((l) => l.role.includes("Supervisor")).length
              )}
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
                placeholder="Search by name or NIDN..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="examiner">Examiner</SelectItem>
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
                  <TableHead>NIDN</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLecturers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No lecturers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLecturers.map((lecturer) => (
                    <TableRow key={lecturer.id}>
                      <TableCell>{lecturer.name}</TableCell>
                      <TableCell>{lecturer.nidn}</TableCell>
                      <TableCell>
                        {lecturer.role.includes("&") ? (
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="default" className="text-xs">
                              Supervisor
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Examiner
                            </Badge>
                          </div>
                        ) : (
                          <Badge
                            variant={
                              lecturer.role === "Supervisor" ? "default" : "secondary"
                            }
                          >
                            {lecturer.role}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{lecturer.totalStudents} students</span>
                          {lecturer.totalStudents > 10 && (
                            <Badge variant="outline" className="text-xs">High Load</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{lecturer.email}</div>
                          <div className="text-gray-500">{lecturer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
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
        </CardContent>
      </Card>
    </div>
  );
}
