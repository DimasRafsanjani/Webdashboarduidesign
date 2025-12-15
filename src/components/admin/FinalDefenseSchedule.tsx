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
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Search, Calendar as CalendarIcon, Clock, MapPin, Users, Plus, Award } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  nim: string;
  title: string;
  status: string;
  supervisor: string;
  isScheduled: boolean;
}

interface DefenseSession {
  id: string;
  studentName: string;
  nim: string;
  title: string;
  date: string;
  time: string;
  examiners: string[];
  room: string;
  notes?: string;
  supervisor: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Sarah Putri Wijaya",
    nim: "2019010001",
    title: "Machine Learning for Sentiment Analysis",
    status: "Ready for Defense",
    supervisor: "Dr. Ahmad Fauzi",
    isScheduled: false,
  },
  {
    id: "2",
    name: "Muhammad Rizki",
    nim: "2019010002",
    title: "Blockchain for Supply Chain",
    status: "Ready for Defense",
    supervisor: "Dr. Bambang Supriyanto",
    isScheduled: false,
  },
  {
    id: "3",
    name: "Aisyah Rahmadani",
    nim: "2019010003",
    title: "IoT Smart Agriculture System",
    status: "Ready for Defense",
    supervisor: "Dr. Dewi Lestari",
    isScheduled: true,
  },
];

const mockScheduled: DefenseSession[] = [
  {
    id: "1",
    studentName: "Aisyah Rahmadani",
    nim: "2019010003",
    title: "IoT Smart Agriculture System",
    date: "2024-06-15",
    time: "09:00",
    examiners: ["Prof. Dr. Siti Rahmah", "Dr. Budi Santoso", "Dr. Ahmad Hasan"],
    room: "Room A-301",
    supervisor: "Dr. Dewi Lestari",
    notes: "Student should prepare full documentation",
  },
  {
    id: "2",
    studentName: "Dimas Prasetyo",
    nim: "2019010004",
    title: "Computer Vision for Traffic Monitoring",
    date: "2024-06-16",
    time: "10:30",
    examiners: ["Dr. Ahmad Fauzi", "Dr. Budi Santoso", "Prof. Dr. Bambang"],
    room: "Room B-202",
    supervisor: "Dr. Ahmad Hasan",
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

export function FinalDefenseSchedule() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [scheduled, setScheduled] = useState<DefenseSession[]>(mockScheduled);
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
        student.nim.includes(searchTerm))
  );

  const handleSchedule = (student: Student) => {
    setSelectedStudent(student);
    setIsScheduleDialogOpen(true);
  };

  const handleSubmitSchedule = () => {
    if (!selectedStudent || !selectedDate || !selectedTime || selectedExaminers.length < 3 || !selectedRoom) {
      toast.error("Validation Error", {
        description: "Please fill all required fields (at least 3 examiners for final defense)",
      });
      return;
    }

    const newSession: DefenseSession = {
      id: Date.now().toString(),
      studentName: selectedStudent.name,
      nim: selectedStudent.nim,
      title: selectedStudent.title,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      examiners: selectedExaminers,
      room: selectedRoom,
      notes: notes,
      supervisor: selectedStudent.supervisor,
    };

    setScheduled([...scheduled, newSession]);
    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id ? { ...s, isScheduled: true } : s
      )
    );

    toast.success("Final Defense Scheduled", {
      description: `Final defense for ${selectedStudent.name} scheduled on ${selectedDate.toLocaleDateString()}`,
    });

    // Reset form
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
        toast.error("Maximum Examiners", {
          description: "You can select maximum 5 examiners",
        });
      }
    }
  };

  const upcomingCount = scheduled.filter(
    (s) => new Date(s.date) >= new Date()
  ).length;

  const todayDefenses = scheduled.filter(
    (s) => s.date === new Date().toISOString().split("T")[0]
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1>Final Defense (Sidang Akhir) Scheduling</h1>
        <p className="text-gray-500 mt-2">
          Schedule and manage final thesis defense sessions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ready to Schedule</p>
                <h2 className="mt-2">{filteredStudents.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Upcoming Defenses</p>
                <h2 className="mt-2">{upcomingCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rooms in Use Today</p>
                <h2 className="mt-2">{todayDefenses}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Scheduling</p>
                <h2 className="mt-2">{filteredStudents.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students Ready for Final Defense */}
        <Card className="lg:col-span-2">
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>NIM</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No students ready for scheduling
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.nim}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate">{student.title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">{student.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => handleSchedule(student)}>
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
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> Final defense requires at least 3 examiners including the supervisor.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Final Defense Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>All Upcoming Final Defenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduled.map((session) => (
              <div
                key={session.id}
                className="p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4>{session.studentName}</h4>
                        <p className="text-sm text-gray-500">{session.nim}</p>
                      </div>
                      <Badge className="bg-purple-500">Final Defense</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{session.title}</p>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{session.room}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Supervisor:</strong> {session.supervisor}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Examiners:</strong>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {session.examiners.map((examiner, idx) => (
                          <Badge key={idx} variant="secondary">
                            {examiner}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {session.notes && (
                      <p className="text-sm text-gray-600 mt-3 italic bg-yellow-50 p-2 rounded">
                        <strong>Note:</strong> {session.notes}
                      </p>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="ml-4">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Final Defense</DialogTitle>
            <DialogDescription>
              Set date, time, examiners (minimum 3), and location for the final thesis defense
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-4">
              {/* Student Info */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Student:</span>
                    <span>{selectedStudent.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">NIM:</span>
                    <span>{selectedStudent.nim}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Title:</span>
                    <span className="text-right">{selectedStudent.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Supervisor:</span>
                    <span>{selectedStudent.supervisor}</span>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div>
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="mt-2"
                />
              </div>

              {/* Time */}
              <div>
                <Label>Time *</Label>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Examiners */}
              <div>
                <Label>Select Examiners * (minimum 3, maximum 5)</Label>
                <div className="mt-2 space-y-2 max-h-64 overflow-y-auto border rounded-lg p-2">
                  {examiners.map((examiner) => (
                    <div
                      key={examiner}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedExaminers.includes(examiner)
                          ? "bg-blue-50 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => toggleExaminer(examiner)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{examiner}</span>
                        {selectedExaminers.includes(examiner) && (
                          <Badge className="bg-blue-500 text-xs">Selected</Badge>
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
                <Label>Room/Location *</Label>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select room" />
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
                <Label>Additional Notes (Optional)</Label>
                <Textarea
                  placeholder="Any special instructions or requirements for the defense..."
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
