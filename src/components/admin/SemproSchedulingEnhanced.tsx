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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Search, Calendar as CalendarIcon, Clock, MapPin, Plus, Users, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

interface Student {
  id: string;
  name: string;
  studentId: string;
  title: string;
  supervisor: string;
  eligibilityStatus: string;
  isScheduled: boolean;
}

interface Examiner {
  id: string;
  name: string;
  expertise: string[];
  availability: { date: string; time: string }[];
}

interface SemproSchedule {
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
    name: "Ahmad Fauzi",
    studentId: "2019010001",
    title: "Machine Learning for Sentiment Analysis",
    supervisor: "Dr. Ahmad Hasan",
    eligibilityStatus: "Ready for Sempro",
    isScheduled: false,
  },
  {
    id: "2",
    name: "Sarah Putri Wijaya",
    studentId: "2019010002",
    title: "Blockchain for Supply Chain",
    supervisor: "Dr. Bambang Supriyanto",
    eligibilityStatus: "Ready for Sempro",
    isScheduled: false,
  },
  {
    id: "3",
    name: "Aisyah Rahmadani",
    studentId: "2019010004",
    title: "Mobile App for Mental Health",
    supervisor: "Dr. Budi Santoso",
    eligibilityStatus: "Ready for Sempro",
    isScheduled: false,
  },
];

const mockScheduled: SemproSchedule[] = [
  {
    id: "1",
    studentName: "Muhammad Rizki",
    studentId: "2019010003",
    title: "IoT Smart Agriculture System",
    supervisor: "Dr. Dewi Lestari",
    date: "2024-05-20",
    time: "09:00",
    examiners: ["Prof. Dr. Siti Rahmah", "Dr. Budi Santoso"],
    room: "Room A-301",
    notes: "Bring laptop for demo",
  },
];

const mockExaminers: Examiner[] = [
  {
    id: "1",
    name: "Prof. Dr. Siti Rahmah",
    expertise: ["Data Science", "Big Data", "Analytics"],
    availability: [
      { date: "2024-05-20", time: "09:00" },
      { date: "2024-05-20", time: "13:00" },
    ],
  },
  {
    id: "2",
    name: "Dr. Ahmad Fauzi",
    expertise: ["Machine Learning", "AI", "NLP"],
    availability: [
      { date: "2024-05-20", time: "10:00" },
      { date: "2024-05-21", time: "09:00" },
    ],
  },
  {
    id: "3",
    name: "Dr. Budi Santoso",
    expertise: ["UI/UX", "Mobile Development", "HCI"],
    availability: [
      { date: "2024-05-20", time: "09:00" },
      { date: "2024-05-22", time: "14:00" },
    ],
  },
  {
    id: "4",
    name: "Dr. Dewi Lestari",
    expertise: ["IoT", "Embedded Systems", "Sensors"],
    availability: [
      { date: "2024-05-21", time: "10:00" },
      { date: "2024-05-23", time: "09:00" },
    ],
  },
  {
    id: "5",
    name: "Dr. Bambang Supriyanto",
    expertise: ["Blockchain", "Cryptography", "Security"],
    availability: [
      { date: "2024-05-22", time: "09:00" },
      { date: "2024-05-23", time: "13:00" },
    ],
  },
];

const rooms = [
  { id: "1", name: "Room A-301", capacity: 20 },
  { id: "2", name: "Room A-302", capacity: 15 },
  { id: "3", name: "Room B-201", capacity: 25 },
  { id: "4", name: "Room B-202", capacity: 30 },
  { id: "5", name: "Meeting Hall", capacity: 50 },
  { id: "6", name: "Online - Zoom Link", capacity: 100 },
];

export function SemproSchedulingEnhanced() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [scheduled, setScheduled] = useState<SemproSchedule[]>(mockScheduled);
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
    setSelectedExaminers([]);
    setSelectedTime("");
    setSelectedRoom("");
    setNotes("");
    setIsScheduleDialogOpen(true);
  };

  const checkConflicts = () => {
    const conflicts = [];
    const dateStr = selectedDate.toISOString().split("T")[0];

    // Check examiner conflicts
    selectedExaminers.forEach((examinerName) => {
      const examiner = mockExaminers.find((e) => e.name === examinerName);
      if (examiner) {
        const isAvailable = examiner.availability.some(
          (slot) => slot.date === dateStr && slot.time === selectedTime
        );
        if (!isAvailable) {
          conflicts.push(`${examinerName} is not available at this time`);
        }
      }

      // Check if examiner already booked
      const alreadyBooked = scheduled.some(
        (s) =>
          s.date === dateStr &&
          s.time === selectedTime &&
          s.examiners.includes(examinerName)
      );
      if (alreadyBooked) {
        conflicts.push(`${examinerName} already has a session at this time`);
      }
    });

    // Check room conflicts
    const roomBooked = scheduled.some(
      (s) => s.date === dateStr && s.time === selectedTime && s.room === selectedRoom
    );
    if (roomBooked && selectedRoom) {
      conflicts.push(`${selectedRoom} is already booked at this time`);
    }

    return conflicts;
  };

  const handleSubmitSchedule = () => {
    if (!selectedStudent || !selectedDate || !selectedTime || selectedExaminers.length < 2 || !selectedRoom) {
      toast.error("Please fill all required fields (minimum 2 examiners)");
      return;
    }

    const conflicts = checkConflicts();
    if (conflicts.length > 0) {
      toast.error("Scheduling Conflicts Detected", {
        description: conflicts.join(". "),
      });
      return;
    }

    const newSchedule: SemproSchedule = {
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

    toast.success("Sempro Scheduled", {
      description: `Sempro for ${selectedStudent.name} scheduled successfully`,
    });

    setIsScheduleDialogOpen(false);
    setSelectedStudent(null);
  };

  const toggleExaminer = (examinerName: string) => {
    if (selectedExaminers.includes(examinerName)) {
      setSelectedExaminers(selectedExaminers.filter((e) => e !== examinerName));
    } else {
      setSelectedExaminers([...selectedExaminers, examinerName]);
    }
  };

  const conflicts = checkConflicts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1>Sempro Scheduling</h1>
        <p className="text-gray-500 mt-2">
          Schedule and manage seminar proposal sessions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ready to Schedule</p>
                <h2 className="mt-2">{filteredStudents.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Scheduled</p>
                <h2 className="mt-2">{scheduled.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Week</p>
                <h2 className="mt-2">
                  {scheduled.filter((s) => new Date(s.date) >= new Date()).length}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student Selection Table */}
        <Card className="lg:col-span-2 shadow-sm">
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
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Title</TableHead>
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
                      <TableRow key={student.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={student.title}>
                            {student.title}
                          </div>
                        </TableCell>
                        <TableCell>{student.supervisor}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">{student.eligibilityStatus}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => handleSchedule(student)}
                            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
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
          </CardContent>
        </Card>
      </div>

      {/* Schedule Overview */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Upcoming Sempro Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduled.map((schedule) => (
              <div
                key={schedule.id}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4>{schedule.studentName}</h4>
                      <Badge variant="outline">{schedule.studentId}</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{schedule.title}</p>
                    
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

                    <div className="flex flex-wrap gap-2">
                      {schedule.examiners.map((examiner, idx) => (
                        <Badge key={idx} variant="secondary">
                          {examiner}
                        </Badge>
                      ))}
                    </div>

                    {schedule.notes && (
                      <p className="text-sm text-gray-600 mt-3 italic bg-yellow-50 p-3 rounded-lg">
                        Note: {schedule.notes}
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

      {/* Large Detail Modal */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Schedule Seminar Proposal</DialogTitle>
            <DialogDescription>
              Fill in the complete scheduling details for the seminar proposal session
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6 mt-4">
              {/* A. Student Information Block */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Student Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600 text-sm">Name</Label>
                      <p className="mt-1">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 text-sm">Student ID</Label>
                      <p className="mt-1">{selectedStudent.studentId}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-600 text-sm">Thesis Title</Label>
                      <p className="mt-1 text-sm">{selectedStudent.title}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-600 text-sm">Supervisor</Label>
                      <p className="mt-1">{selectedStudent.supervisor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* B. Schedule Form */}
              <div className="space-y-6">
                <h3 className="text-base">Schedule Details</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div>
                    <Label>Date Picker *</Label>
                    <Input
                      type="date"
                      value={selectedDate.toISOString().split("T")[0]}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      className="mt-2"
                    />
                  </div>

                  {/* Time Picker */}
                  <div>
                    <Label>Time Picker *</Label>
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Select Examiners */}
                <div>
                  <Label>Select Examiner(s) * (minimum 2)</Label>
                  <p className="text-xs text-gray-500 mt-1 mb-3">
                    Click to select/deselect examiners. Selected: {selectedExaminers.length}
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto border rounded-lg p-3">
                    {mockExaminers.map((examiner) => {
                      const isSelected = selectedExaminers.includes(examiner.name);
                      const dateStr = selectedDate.toISOString().split("T")[0];
                      const isAvailableForSlot = examiner.availability.some(
                        (slot) => slot.date === dateStr && slot.time === selectedTime
                      );
                      
                      return (
                        <div
                          key={examiner.id}
                          onClick={() => toggleExaminer(examiner.name)}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm">{examiner.name}</h4>
                            {isSelected && (
                              <Badge className="bg-blue-500 text-xs">Selected</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {examiner.expertise.map((exp, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {exp}
                              </Badge>
                            ))}
                          </div>
                          {selectedTime && (
                            <div className="flex items-center gap-1 mt-2">
                              <div className={`w-2 h-2 rounded-full ${isAvailableForSlot ? "bg-green-500" : "bg-red-500"}`} />
                              <span className="text-xs text-gray-600">
                                {isAvailableForSlot ? "Available" : "Unavailable"}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Select Room */}
                <div>
                  <Label>Select Room / Location *</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room.name)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedRoom === room.name
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{room.name}</span>
                        </div>
                        <p className="text-xs text-gray-500">Capacity: {room.capacity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label>Additional Notes (Optional)</Label>
                  <Textarea
                    placeholder="Any special instructions or requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* C. Conflict Warning Section */}
              {conflicts.length > 0 && selectedTime && (
                <Card className="border-2 border-red-300 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      Scheduling Conflicts Detected
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {conflicts.map((conflict, idx) => (
                        <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          {conflict}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-red-600 mt-3">
                      Please adjust the date, time, or selection to resolve conflicts before saving.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Summary Preview */}
              {selectedDate && selectedTime && selectedExaminers.length >= 2 && selectedRoom && conflicts.length === 0 && (
                <Card className="border-2 border-green-300 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-base text-green-700">Schedule Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student:</span>
                      <span>{selectedStudent.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span>{selectedDate.toLocaleDateString()} at {selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room:</span>
                      <span>{selectedRoom}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Examiners:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedExaminers.map((examiner, idx) => (
                          <Badge key={idx} variant="secondary">
                            {examiner}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* D. Footer Buttons */}
          <DialogFooter className="gap-3">
            <Button variant="ghost" onClick={() => setIsScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitSchedule}
              disabled={!selectedDate || !selectedTime || selectedExaminers.length < 2 || !selectedRoom || conflicts.length > 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
