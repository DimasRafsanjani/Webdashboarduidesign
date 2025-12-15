import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar as CalendarIcon, Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import { Alert, AlertDescription } from "../ui/alert";

interface AcademicEvent {
  id: string;
  name: string;
  type: "Proposal" | "Seminar" | "Yudisium";
  startDate: Date;
  endDate: Date;
  semester: string;
  description: string;
}

const mockEvents: AcademicEvent[] = [
  {
    id: "1",
    name: "Thesis Proposal Submission Period",
    type: "Proposal",
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 15),
    semester: "Ganjil 2024/2025",
    description: "Period for submitting thesis proposal titles",
  },
  {
    id: "2",
    name: "Seminar Proposal Period",
    type: "Seminar",
    startDate: new Date(2024, 5, 10),
    endDate: new Date(2024, 5, 30),
    semester: "Ganjil 2024/2025",
    description: "Period for conducting seminar proposals",
  },
  {
    id: "3",
    name: "Yudisium Period",
    type: "Yudisium",
    startDate: new Date(2024, 6, 15),
    endDate: new Date(2024, 6, 20),
    semester: "Ganjil 2024/2025",
    description: "Final graduation ceremony period",
  },
];

const eventTypeColors = {
  Proposal: "bg-blue-500",
  Seminar: "bg-green-500",
  Yudisium: "bg-purple-500",
};

export function ManageCalendar() {
  const [events, setEvents] = useState<AcademicEvent[]>(mockEvents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    type: "Proposal" as "Proposal" | "Seminar" | "Yudisium",
    startDate: new Date(),
    endDate: new Date(),
    semester: "",
    description: "",
  });

  const handleAddEvent = () => {
    // Validation: Check if event type already exists for this semester
    const existingEvent = events.find(
      (event) => event.type === formData.type && event.semester === formData.semester
    );

    if (existingEvent) {
      toast.error("Validation Error", {
        description: `A ${formData.type} event already exists for ${formData.semester}. Only one event per type per semester is allowed.`,
      });
      return;
    }

    const newEvent: AcademicEvent = {
      id: Date.now().toString(),
      ...formData,
    };

    setEvents([...events, newEvent]);
    setIsAddDialogOpen(false);
    toast.success("Event Added", {
      description: `${formData.name} has been added to the calendar.`,
    });

    // Reset form
    setFormData({
      name: "",
      type: "Proposal",
      startDate: new Date(),
      endDate: new Date(),
      semester: "",
      description: "",
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success("Event Deleted", {
      description: "The event has been removed from the calendar.",
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return date >= eventStart && date <= eventEnd;
    });
  };

  const eventsThisMonth = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    return (
      eventDate.getMonth() === selectedMonth.getMonth() &&
      eventDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Manage Academic Calendar</h1>
          <p className="text-gray-500 mt-2">
            Set and manage academic events per semester
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Academic Event</DialogTitle>
              <DialogDescription>
                Create a new academic event. Only one event per type per semester is allowed.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Validation Rule: Cannot create duplicate event types for the same semester
                </AlertDescription>
              </Alert>
              <div>
                <Label>Event Name</Label>
                <Input
                  placeholder="e.g., Thesis Proposal Submission Period"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Event Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "Proposal" | "Seminar" | "Yudisium") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Yudisium">Yudisium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Semester</Label>
                  <Select
                    value={formData.semester}
                    onValueChange={(value) =>
                      setFormData({ ...formData, semester: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ganjil 2024/2025">Ganjil 2024/2025</SelectItem>
                      <SelectItem value="Genap 2024/2025">Genap 2024/2025</SelectItem>
                      <SelectItem value="Ganjil 2025/2026">Ganjil 2025/2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Event description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedMonth}
              onSelect={(date) => date && setSelectedMonth(date)}
              className="rounded-md border"
            />
            <div className="mt-4">
              <h4 className="mb-3">Legend</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Proposal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Seminar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Yudisium</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events This Month */}
        <Card>
          <CardHeader>
            <CardTitle>Events This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventsThisMonth.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No events scheduled for this month
                </p>
              ) : (
                eventsThisMonth.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={eventTypeColors[event.type]}>
                        {event.type}
                      </Badge>
                    </div>
                    <h4 className="text-sm mb-1">{event.name}</h4>
                    <p className="text-xs text-gray-500">
                      {event.startDate.toLocaleDateString()} -{" "}
                      {event.endDate.toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Events List */}
      <Card>
        <CardHeader>
          <CardTitle>All Academic Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-1 h-16 ${eventTypeColors[event.type]} rounded-full`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{event.name}</h4>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📅 {event.semester}</span>
                      <span>
                        {event.startDate.toLocaleDateString()} -{" "}
                        {event.endDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
