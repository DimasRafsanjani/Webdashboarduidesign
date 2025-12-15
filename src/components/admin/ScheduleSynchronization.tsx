import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock, Plus, Edit, AlertCircle } from "lucide-react";
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
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "sonner";

interface TimeSlot {
  day: string;
  time: string;
  available: boolean;
}

interface LecturerSchedule {
  id: string;
  name: string;
  nidn: string;
  totalSlots: number;
  availableSlots: number;
  schedule: TimeSlot[];
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

const mockLecturers: LecturerSchedule[] = [
  {
    id: "1",
    name: "Dr. Ahmad Fauzi",
    nidn: "0012345678",
    totalSlots: 40,
    availableSlots: 28,
    schedule: days.flatMap((day) =>
      timeSlots.map((time) => ({
        day,
        time,
        available: Math.random() > 0.3,
      }))
    ),
  },
  {
    id: "2",
    name: "Prof. Dr. Siti Rahmah",
    nidn: "0012345679",
    totalSlots: 40,
    availableSlots: 22,
    schedule: days.flatMap((day) =>
      timeSlots.map((time) => ({
        day,
        time,
        available: Math.random() > 0.4,
      }))
    ),
  },
  {
    id: "3",
    name: "Dr. Budi Santoso",
    nidn: "0012345680",
    totalSlots: 40,
    availableSlots: 30,
    schedule: days.flatMap((day) =>
      timeSlots.map((time) => ({
        day,
        time,
        available: Math.random() > 0.25,
      }))
    ),
  },
];

export function ScheduleSynchronization() {
  const [lecturers, setLecturers] = useState<LecturerSchedule[]>(mockLecturers);
  const [selectedLecturer, setSelectedLecturer] = useState<string>(lecturers[0]?.id || "");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<TimeSlot[]>([]);

  const currentLecturer = lecturers.find((l) => l.id === selectedLecturer);

  const openEditDialog = () => {
    if (currentLecturer) {
      setEditingSchedule([...currentLecturer.schedule]);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveSchedule = () => {
    if (!currentLecturer) return;

    const availableCount = editingSchedule.filter((slot) => slot.available).length;

    setLecturers(
      lecturers.map((lecturer) =>
        lecturer.id === selectedLecturer
          ? {
              ...lecturer,
              schedule: editingSchedule,
              availableSlots: availableCount,
            }
          : lecturer
      )
    );

    setIsEditDialogOpen(false);
    toast.success("Schedule Updated", {
      description: `Schedule for ${currentLecturer.name} has been updated`,
    });
  };

  const toggleSlot = (day: string, time: string) => {
    setEditingSchedule(
      editingSchedule.map((slot) =>
        slot.day === day && slot.time === time
          ? { ...slot, available: !slot.available }
          : slot
      )
    );
  };

  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600 bg-green-50";
    if (percentage >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Academic Schedule Synchronization</h1>
          <p className="text-gray-500 mt-2">
            Manage lecturer availability to avoid scheduling conflicts
          </p>
        </div>
      </div>

      {/* Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This schedule is synchronized with the academic calendar to prevent conflicts
          between supervision sessions and examination schedules.
        </AlertDescription>
      </Alert>

      {/* Lecturer Availability Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lecturers.map((lecturer) => {
          const availabilityPercentage = Math.round(
            (lecturer.availableSlots / lecturer.totalSlots) * 100
          );
          return (
            <Card key={lecturer.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4>{lecturer.name}</h4>
                    <p className="text-sm text-gray-500">{lecturer.nidn}</p>
                  </div>
                  <Badge className={getAvailabilityColor(availabilityPercentage)}>
                    {availabilityPercentage}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available Slots:</span>
                    <span>
                      {lecturer.availableSlots} / {lecturer.totalSlots}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${availabilityPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Schedule View</CardTitle>
            <div className="flex items-center gap-4">
              <Select value={selectedLecturer} onValueChange={setSelectedLecturer}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lecturers.map((lecturer) => (
                    <SelectItem key={lecturer.id} value={lecturer.id}>
                      {lecturer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openEditDialog}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Schedule
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Edit Schedule - {currentLecturer?.name}</DialogTitle>
                    <DialogDescription>
                      Click on time slots to toggle availability
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-96 overflow-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border p-2 bg-gray-50 text-left">Time</th>
                          {days.map((day) => (
                            <th key={day} className="border p-2 bg-gray-50 text-center">
                              {day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {timeSlots.map((time) => (
                          <tr key={time}>
                            <td className="border p-2 text-sm">{time}</td>
                            {days.map((day) => {
                              const slot = editingSchedule.find(
                                (s) => s.day === day && s.time === time
                              );
                              return (
                                <td
                                  key={`${day}-${time}`}
                                  className={`border p-2 text-center cursor-pointer hover:opacity-80 ${
                                    slot?.available
                                      ? "bg-green-100"
                                      : "bg-red-100"
                                  }`}
                                  onClick={() => toggleSlot(day, time)}
                                >
                                  {slot?.available ? "✓" : "✗"}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveSchedule}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentLecturer && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-3 bg-gray-50 text-left">Time</th>
                    {days.map((day) => (
                      <th key={day} className="border p-3 bg-gray-50 text-center">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="border p-3 text-sm">{time}</td>
                      {days.map((day) => {
                        const slot = currentLecturer.schedule.find(
                          (s) => s.day === day && s.time === time
                        );
                        return (
                          <td
                            key={`${day}-${time}`}
                            className={`border p-3 text-center ${
                              slot?.available
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {slot?.available ? (
                              <Badge className="bg-green-500">Available</Badge>
                            ) : (
                              <Badge variant="destructive">Busy</Badge>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Available for supervision/examination</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Busy / Not available</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
