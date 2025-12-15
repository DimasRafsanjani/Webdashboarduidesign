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
import { Search, Download, Eye, FileText } from "lucide-react";

const theses = [
  {
    id: "1",
    title: "Machine Learning for Sentiment Analysis on Social Media",
    author: "Sarah Putri Wijaya",
    nim: "2019010002",
    year: "2024",
    program: "Computer Science",
    supervisor: "Prof. Dr. Siti Rahmah",
    grade: "A",
    fileSize: "3.2 MB",
  },
  {
    id: "2",
    title: "Blockchain Implementation in Supply Chain Management System",
    author: "Dewi Lestari",
    nim: "2019010004",
    year: "2024",
    program: "Information Systems",
    supervisor: "Dr. Bambang Supriyanto",
    grade: "A-",
    fileSize: "2.8 MB",
  },
  {
    id: "3",
    title: "Mobile Application for Real-Time Traffic Monitoring Using GPS",
    author: "Fitri Handayani",
    nim: "2019010008",
    year: "2024",
    program: "Information Systems",
    supervisor: "Dr. Budi Santoso",
    grade: "B+",
    fileSize: "4.1 MB",
  },
  {
    id: "4",
    title: "Development of E-Learning Platform with Adaptive Learning System",
    author: "Andi Wijaya",
    nim: "2018010015",
    year: "2023",
    program: "Software Engineering",
    supervisor: "Dr. Ahmad Hasan",
    grade: "A",
    fileSize: "3.5 MB",
  },
  {
    id: "5",
    title: "IoT-Based Smart Home Automation System Using Raspberry Pi",
    author: "Rini Susanti",
    nim: "2018010023",
    year: "2023",
    program: "Computer Science",
    supervisor: "Prof. Dr. Joko Widodo",
    grade: "A-",
    fileSize: "2.9 MB",
  },
];

export function ThesisArchive() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [filterProgram, setFilterProgram] = useState("all");

  const filteredTheses = theses.filter((thesis) => {
    const matchesSearch =
      thesis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.nim.includes(searchTerm);
    const matchesYear = filterYear === "all" || thesis.year === filterYear;
    const matchesProgram = filterProgram === "all" || thesis.program === filterProgram;
    return matchesSearch && matchesYear && matchesProgram;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Thesis Archive</h1>
          <p className="text-gray-500 mt-2">Browse and download completed thesis documents</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Bulk Download
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Theses</div>
            <div className="text-2xl mt-1">{theses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Year 2024</div>
            <div className="text-2xl mt-1">
              {theses.filter((t) => t.year === "2024").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Year 2023</div>
            <div className="text-2xl mt-1">
              {theses.filter((t) => t.year === "2023").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Grade A</div>
            <div className="text-2xl mt-1 text-green-600">
              {theses.filter((t) => t.grade.startsWith("A")).length}
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
                placeholder="Search by title, author, or NIM..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTheses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No theses found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTheses.map((thesis) => (
                    <TableRow key={thesis.id}>
                      <TableCell className="max-w-md">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <div className="line-clamp-2">{thesis.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{thesis.author}</div>
                          <div className="text-sm text-gray-500">{thesis.nim}</div>
                        </div>
                      </TableCell>
                      <TableCell>{thesis.program}</TableCell>
                      <TableCell>{thesis.supervisor}</TableCell>
                      <TableCell>{thesis.year}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            thesis.grade.startsWith("A")
                              ? "bg-green-500"
                              : thesis.grade.startsWith("B")
                              ? "bg-blue-500"
                              : "bg-gray-500"
                          }
                        >
                          {thesis.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {thesis.fileSize}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Preview">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Download">
                            <Download className="w-4 h-4" />
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
