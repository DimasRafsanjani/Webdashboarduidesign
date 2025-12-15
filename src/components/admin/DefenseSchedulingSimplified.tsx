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
import { Calendar } from "../ui/calendar";
import { Search, Calendar as CalendarIcon, Clock, MapPin, Plus, Award, Users } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  studentId: string;
  title: string;
  supervisor: string;
  status: string;
  isScheduled: boolean;
}

interface DefenseSchedule {
  id: string;
  studentName: string;
  studentId: string;
  title: string;
  supervisor: string;
  date: string;
  time: string;
  examiners: string[];
  room: string;
  notes?: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Sarah Putri Wijaya",
    studentId: "2019010001",
    title: "Machine Learning for Sentiment Analysis",
    supervisor: "Dr. Ahmad Fauzi",
    status: "Passed Sempro",
    isScheduled: false,
  },
  {
    id: "2",
    name: "Muhammad Rizki",
    studentId: "2019010002",
    title: "Blockchain for Supply Chain",
    supervisor: "Dr. Bambang Supriyanto",
    status: "Ready for Defense",
    isScheduled: false,
  },
  {
    id: "3",
    name: "Dimas Prasetyo",
    studentId: "2019010005",
    title: "Computer Vision for Traffic Monitoring",
    supervisor: "Dr. Ahmad Hasan",
    status: "Ready for Defense",
    isScheduled: false,
  },
];

const mockScheduled: DefenseSchedule[] = [
  {
    id: "1",
    studentName: "Aisyah Rahmadani",
    studentId: "2019010003",
    title: "IoT Smart Agriculture System",
    supervisor: "Dr. Dewi Lestari",
    date: "2024-06-15",
    time: "09:00",
    examiners: ["Prof. Dr. Siti Rahmah", "Dr. Budi Santoso", "Dr. Ahmad Hasan"],
    room: "Room A-301",
    notes: "Student should prepare full documentation",
  },
  {
    id: "2",
    studentName: "Fitri Handayani",
    studentId: "2019010006",
    title: "E-Learning Platform with AI Recommendations",
    supervisor: "Dr. Budi Santoso",
    date: "2024-06-18",
    time: "10:30",
    examiners: ["Dr. Ahmad Fauzi", "Dr. Dewi Lestari", "Prof. Dr. Bambang"],
    room: "Room B-202",
  },
];

const examiners = [
  "Prof. Dr. Siti Rahmah",
  "Prof. Dr. Bambang",
  "Dr. Ahmad Fauzi",
  "Dr. Ahmad Hasan",
  "Dr. Budi Santoso",
  "Dr. Dewi Lestari",
  "Dr. Bambang Supriyanto",
];

const rooms = [
  "Room A-301",
  "Room A-302",
  "Room B-201",
  "Room B-202",
  "Auditorium",
  "Online - Zoom",
];

export function DefenseSchedulingSimplified() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [scheduled, setScheduled] = useState<DefenseSchedule[]>(mockScheduled);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedExaminers, setSelectedExaminers] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [notes, setNotes] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      !student.isScheduled &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.includes(searchTerm))
  );

  const handleSchedule = (student: Student) => {
    setSelectedStudent(student);
    setIsScheduleDialogOpen(true);
  };

  const handleSubmitSchedule = () => {
    if (!selectedStudent || !selectedDate || !selectedTime || selectedExaminers.length < 3 || !selectedRoom) {
      toast.error("Please fill all required fields (minimum 3 examiners for final defense)");
      return;
    }

    const newSchedule: DefenseSchedule = {
      id: Date.now().toString(),
      studentName: selectedStudent.name,
      studentId: selectedStudent.studentId,
      title: selectedStudent.title,
      supervisor: selectedStudent.supervisor,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      examiners: selectedExaminers,
      room: selectedRoom,
      notes: notes,
    };

    setScheduled([...scheduled, newSchedule]);
    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id ? { ...s, isScheduled: true } : s
      )
    );

    toast.success("Final Defense Scheduled", {
      description: `Defense for ${selectedStudent.name} scheduled successfully`,
    });

    // Reset
    setIsScheduleDialogOpen(false);
    setSelectedStudent(null);
    setSelectedTime("");
    setSelectedExaminers([]);
    setSelectedRoom("");
    setNotes("");
  };

  const toggleExaminer = (examiner: string) => {
    if (selectedExaminers.includes(examiner)) {
      setSelectedExaminers(selectedExaminers.filter((e) => e !== examiner));
    } else {
      if (selectedExaminers.length < 5) {
        setSelectedExaminers([...selectedExaminers, examiner]);
      } else {
        toast.error("Maximum 5 examiners allowed");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1>Final Defense Scheduling</h1>
        <p className="text-gray-500 mt-2">
          Schedule and manage final thesis defense sessions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ready to Schedule</p>
                <h2 className="mt-2">{filteredStudents.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming Defenses</p>
                <h2 className="mt-2">{scheduled.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <h2 className="mt-2">
                  {scheduled.filter((s) => new Date(s.date).getMonth() === new Date().getMonth()).length}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student Eligibility Table */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Students Eligible for Final Defense</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Thesis Title</TableHead>
                    <TableHead>Supervisor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No students ready for scheduling
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={student.title}>
                            {student.title}
                          </div>
                        </TableCell>
                        <TableCell>{student.supervisor}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">{student.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => handleSchedule(student)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Schedule
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

        {/* Calendar View */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-lg border"
            />
            <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Final defense requires minimum 3 examiners
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Defense Schedule Overview */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Upcoming Final Defenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduled.map((schedule) => (
              <div
                key={schedule.id}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4>{schedule.studentName}</h4>
                      <Badge variant="outline">{schedule.studentId}</Badge>
                      <Badge className="bg-purple-500">Final Defense</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{schedule.title}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span>{schedule.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{schedule.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{schedule.room}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Supervisor:</strong> {schedule.supervisor}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Examiners:</strong>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {schedule.examiners.map((examiner, idx) => (
                          <Badge key={idx} variant="secondary">
                            {examiner}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {schedule.notes && (
                      <p className="text-sm text-gray-600 italic bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <strong>Note:</strong> {schedule.notes}
                      </p>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Final Defense Scheduling Form */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Final Defense</DialogTitle>
            <DialogDescription>
              Fill in the details to schedule a final thesis defense (minimum 3 examiners)
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Info */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Student Name</Label>
                      <p className="mt-1">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Student ID</Label>
                      <p className="mt-1">{selectedStudent.studentId}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-600">Thesis Title</Label>
                      <p className="mt-1 text-sm">{selectedStudent.title}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-600">Supervisor</Label>
                      <p className="mt-1">{selectedStudent.supervisor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date */}
              <div>
                <Label>Date Picker *</Label>
                <Input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="mt-2"
                />
              </div>

              {/* Time */}
              <div>
                <Label>Time Picker *</Label>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Examiners */}
              <div>
                <Label>Assign Examiner(s) * (minimum 3, maximum 5)</Label>
                <div className="mt-2 space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                  {examiners.map((examiner) => (
                    <div
                      key={examiner}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedExaminers.includes(examiner)
                          ? "bg-purple-50 border-purple-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => toggleExaminer(examiner)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{examiner}</span>
                        {selectedExaminers.includes(examiner) && (
                          <Badge className="bg-purple-500 text-xs">Selected</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {selectedExaminers.length} examiner(s)
                  {selectedExaminers.length < 3 && (
                    <span className="text-red-500"> (Need at least 3)</span>
                  )}
                </p>
              </div>

              {/* Room */}
              <div>
                <Label>Assign Room / Location *</Label>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label>Add Notes (Optional)</Label>
                <Textarea
                  placeholder="Any special instructions for the defense..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitSchedule} className="bg-purple-600 hover:bg-purple-700">
              Schedule Final Defense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
