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
import { Search, Calendar as CalendarIcon, Clock, MapPin, Users, Plus } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  nim: string;
  title: string;
  progressStatus: string;
  supervisor: string;
  isScheduled: boolean;
}

interface SemproSession {
  id: string;
  studentName: string;
  nim: string;
  title: string;
  date: string;
  time: string;
  examiners: string[];
  room: string;
  notes?: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ahmad Fauzi",
    nim: "2019010001",
    title: "Machine Learning-Based Sentiment Analysis",
    progressStatus: "Ready for Sempro",
    supervisor: "Dr. Ahmad Hasan",
    isScheduled: false,
  },
  {
    id: "2",
    name: "Sarah Putri Wijaya",
    nim: "2019010002",
    title: "Blockchain for Supply Chain Transparency",
    progressStatus: "Ready for Sempro",
    supervisor: "Dr. Bambang Supriyanto",
    isScheduled: false,
  },
  {
    id: "3",
    name: "Muhammad Rizki",
    nim: "2019010003",
    title: "IoT Smart Agriculture System",
    progressStatus: "Ready for Sempro",
    supervisor: "Dr. Dewi Lestari",
    isScheduled: true,
  },
];

const mockScheduled: SemproSession[] = [
  {
    id: "1",
    studentName: "Muhammad Rizki",
    nim: "2019010003",
    title: "IoT Smart Agriculture System",
    date: "2024-05-20",
    time: "09:00",
    examiners: ["Prof. Dr. Siti Rahmah", "Dr. Budi Santoso"],
    room: "Room A-301",
    notes: "Bring laptop for demo",
  },
  {
    id: "2",
    studentName: "Aisyah Rahmadani",
    nim: "2019010004",
    title: "Mobile App for Mental Health Support",
    date: "2024-05-21",
    time: "10:30",
    examiners: ["Dr. Ahmad Hasan", "Dr. Dewi Lestari"],
    room: "Room B-202",
  },
];

const examiners = [
  "Prof. Dr. Siti Rahmah",
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
  "Online - Zoom",
  "Lab Computer 1",
];

export function SemproSchedule() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [scheduled, setScheduled] = useState<SemproSession[]>(mockScheduled);
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
    if (!selectedStudent || !selectedDate || !selectedTime || selectedExaminers.length < 2 || !selectedRoom) {
      toast.error("Validation Error", {
        description: "Please fill all required fields (at least 2 examiners)",
      });
      return;
    }

    const newSession: SemproSession = {
      id: Date.now().toString(),
      studentName: selectedStudent.name,
      nim: selectedStudent.nim,
      title: selectedStudent.title,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      examiners: selectedExaminers,
      room: selectedRoom,
      notes: notes,
    };

    setScheduled([...scheduled, newSession]);
    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id ? { ...s, isScheduled: true } : s
      )
    );

    toast.success("Sempro Scheduled", {
      description: `Sempro for ${selectedStudent.name} scheduled on ${selectedDate.toLocaleDateString()}`,
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
      setSelectedExaminers([...selectedExaminers, examiner]);
    }
  };

  const upcomingCount = scheduled.filter(
    (s) => new Date(s.date) >= new Date()
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1>Seminar Proposal (Sempro) Scheduling</h1>
        <p className="text-gray-500 mt-2">
          Schedule and manage seminar proposal sessions
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
                <p className="text-sm text-gray-500">Total Scheduled</p>
                <h2 className="mt-2">{scheduled.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming Sessions</p>
                <h2 className="mt-2">{upcomingCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rooms in Use Today</p>
                <h2 className="mt-2">3</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students Ready for Sempro */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Students Eligible for Sempro</CardTitle>
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
                          <Badge className="bg-green-500">{student.progressStatus}</Badge>
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
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sempro Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sempro Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduled.map((session) => (
              <div
                key={session.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4>{session.studentName}</h4>
                    <p className="text-sm text-gray-500 mt-1">{session.nim}</p>
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
                    <div className="flex flex-wrap gap-2 mt-3">
                      {session.examiners.map((examiner, idx) => (
                        <Badge key={idx} variant="secondary">
                          {examiner}
                        </Badge>
                      ))}
                    </div>
                    {session.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">Note: {session.notes}</p>
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

      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Sempro Session</DialogTitle>
            <DialogDescription>
              Set date, time, examiners, and location for the seminar proposal
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-4">
              {/* Student Info */}
              <div className="p-4 bg-gray-50 rounded-lg">
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
                <Label>Select Examiners * (minimum 2)</Label>
                <div className="mt-2 space-y-2">
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
                        <span>{examiner}</span>
                        {selectedExaminers.includes(examiner) && (
                          <Badge className="bg-blue-500">Selected</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {selectedExaminers.length} examiner(s)
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
                  placeholder="Any special instructions or requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitSchedule}>Schedule Sempro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
