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
import { Search, Calendar as CalendarIcon, Clock, MapPin, Plus, Award, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

interface Student {
  id: string;
  name: string;
  studentId: string;
  title: string;
  supervisor: string;
  status: string;
  isScheduled: boolean;
}

interface Examiner {
  id: string;
  name: string;
  expertise: string[];
  maxQuota: number;
  currentAssignments: number;
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
    notes: "Student should prepare full documentation and working prototype",
  },
];

const mockExaminers: Examiner[] = [
  {
    id: "1",
    name: "Prof. Dr. Siti Rahmah",
    expertise: ["Data Science", "Big Data", "Analytics", "Research Methods"],
    maxQuota: 5,
    currentAssignments: 3,
  },
  {
    id: "2",
    name: "Prof. Dr. Bambang",
    expertise: ["Software Engineering", "System Architecture", "Cloud Computing"],
    maxQuota: 5,
    currentAssignments: 4,
  },
  {
    id: "3",
    name: "Dr. Ahmad Fauzi",
    expertise: ["Machine Learning", "AI", "NLP", "Deep Learning"],
    maxQuota: 5,
    currentAssignments: 2,
  },
  {
    id: "4",
    name: "Dr. Ahmad Hasan",
    expertise: ["Software Engineering", "DevOps", "System Design"],
    maxQuota: 5,
    currentAssignments: 3,
  },
  {
    id: "5",
    name: "Dr. Budi Santoso",
    expertise: ["UI/UX", "Mobile Development", "HCI", "User Research"],
    maxQuota: 5,
    currentAssignments: 2,
  },
  {
    id: "6",
    name: "Dr. Dewi Lestari",
    expertise: ["IoT", "Embedded Systems", "Sensor Networks", "Hardware"],
    maxQuota: 5,
    currentAssignments: 3,
  },
  {
    id: "7",
    name: "Dr. Bambang Supriyanto",
    expertise: ["Blockchain", "Cryptography", "Security", "Distributed Systems"],
    maxQuota: 5,
    currentAssignments: 1,
  },
];

const rooms = [
  { id: "1", name: "Room A-301", capacity: 20, facilities: "Projector, Whiteboard" },
  { id: "2", name: "Room A-302", capacity: 15, facilities: "Smart TV, Whiteboard" },
  { id: "3", name: "Room B-201", capacity: 25, facilities: "Projector, Sound System" },
  { id: "4", name: "Room B-202", capacity: 30, facilities: "Smart Board, Conference Setup" },
  { id: "5", name: "Auditorium", capacity: 100, facilities: "Full AV System, Stage" },
  { id: "6", name: "Online - Zoom", capacity: 300, facilities: "Video Conference" },
];

export function DefenseSchedulingEnhanced() {
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
    setSelectedExaminers([]);
    setSelectedTime("");
    setSelectedRoom("");
    setNotes("");
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

    setIsScheduleDialogOpen(false);
    setSelectedStudent(null);
  };

  const toggleExaminer = (examinerName: string) => {
    if (selectedExaminers.includes(examinerName)) {
      setSelectedExaminers(selectedExaminers.filter((e) => e !== examinerName));
    } else {
      if (selectedExaminers.length < 5) {
        setSelectedExaminers([...selectedExaminers, examinerName]);
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
                <p className="text-sm text-gray-500">Upcoming Defenses</p>
                <h2 className="mt-2">{scheduled.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <h2 className="mt-2">
                  {scheduled.filter((s) => new Date(s.date).getMonth() === new Date().getMonth()).length}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
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
                          <Badge className="bg-green-500">{student.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => handleSchedule(student)}
                            className="bg-purple-600 hover:bg-purple-700 transition-all duration-300"
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
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300"
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

      {/* Large Detail Modal */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Schedule Final Defense</DialogTitle>
            <DialogDescription>
              Fill in the complete scheduling details for the final thesis defense session
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6 mt-4">
              {/* A. Student Information */}
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
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

              {/* B. Scheduling Form */}
              <div className="space-y-6">
                <h3 className="text-base">Defense Schedule Details</h3>
                
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
                  <Label>Select Examiner(s) * (minimum 3, maximum 5)</Label>
                  <p className="text-xs text-gray-500 mt-1 mb-3">
                    Click to select/deselect examiners. Selected: {selectedExaminers.length}
                    {selectedExaminers.length < 3 && <span className="text-red-500"> (Need at least 3)</span>}
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto border rounded-lg p-3">
                    {mockExaminers.map((examiner) => {
                      const isSelected = selectedExaminers.includes(examiner.name);
                      const hasCapacity = examiner.currentAssignments < examiner.maxQuota;
                      
                      return (
                        <div
                          key={examiner.id}
                          onClick={() => hasCapacity && toggleExaminer(examiner.name)}
                          className={`p-4 border-2 rounded-xl transition-all ${
                            isSelected
                              ? "border-purple-500 bg-purple-50"
                              : hasCapacity 
                                ? "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer"
                                : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm">{examiner.name}</h4>
                            <div className="flex gap-1">
                              {isSelected && (
                                <Badge className="bg-purple-500 text-xs">Selected</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {examiner.expertise.slice(0, 3).map((exp, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {exp}
                              </Badge>
                            ))}
                            {examiner.expertise.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{examiner.expertise.length - 3}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-600">
                              Quota: {examiner.currentAssignments}/{examiner.maxQuota}
                            </span>
                            <Badge className={hasCapacity ? "bg-green-500" : "bg-red-500 text-xs"}>
                              {hasCapacity ? "Available" : "Full"}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Select Room */}
                <div>
                  <Label>Select Room / Location *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room.name)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedRoom === room.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{room.name}</span>
                        </div>
                        <p className="text-xs text-gray-500">Capacity: {room.capacity}</p>
                        <p className="text-xs text-gray-500 mt-1">{room.facilities}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label>Add Notes (Optional)</Label>
                  <Textarea
                    placeholder="Special instructions, preparation requirements, or additional notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* C. Confirmation Block - Summary */}
              {selectedDate && selectedTime && selectedExaminers.length >= 3 && selectedRoom && (
                <Card className="border-2 border-green-300 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      Defense Schedule Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Student:</span>
                        <p className="mt-1">{selectedStudent.name} ({selectedStudent.studentId})</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Thesis Title:</span>
                        <p className="mt-1 text-sm">{selectedStudent.title}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Date & Time:</span>
                        <p className="mt-1">{selectedDate.toLocaleDateString()} at {selectedTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Room:</span>
                        <p className="mt-1">{selectedRoom}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Supervisor:</span>
                        <p className="mt-1">{selectedStudent.supervisor}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Examiners ({selectedExaminers.length}):</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedExaminers.map((examiner, idx) => (
                            <Badge key={idx} variant="secondary">
                              {examiner}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {notes && (
                        <div className="col-span-2">
                          <span className="text-gray-600">Notes:</span>
                          <p className="mt-1 text-sm italic">{notes}</p>
                        </div>
                      )}
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
              disabled={!selectedDate || !selectedTime || selectedExaminers.length < 3 || !selectedRoom}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Save & Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
