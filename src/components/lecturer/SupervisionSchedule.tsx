import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Search, Calendar as CalendarIcon, MapPin, Video, Eye, Upload, ChevronLeft, ChevronRight } from 'lucide-react';

interface SupervisionSession {
  id: string;
  studentName: string;
  studentId: string;
  thesisTitle: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  sessionNumber: string;
  status: 'upcoming' | 'completed';
  role: string;
}

export function SupervisionSchedule() {
  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSession, setSelectedSession] = useState<SupervisionSession | null>(null);
  const [notes, setNotes] = useState('');
  const [evaluationStatus, setEvaluationStatus] = useState('');
  const [currentWeek, setCurrentWeek] = useState(0);

  const sessions: SupervisionSession[] = [
    {
      id: '1',
      studentName: 'Budi Santoso',
      studentId: '20.11.1234',
      thesisTitle: 'Machine Learning untuk Deteksi Penyakit Tanaman menggunakan Convolutional Neural Networks',
      date: '2025-12-15',
      time: '10:00 AM',
      location: 'Google Meet',
      isOnline: true,
      sessionNumber: '3rd Guidance',
      status: 'upcoming',
      role: 'Primary Supervisor',
    },
    {
      id: '2',
      studentName: 'Siti Nurhaliza',
      studentId: '20.11.1245',
      thesisTitle: 'Sistem Informasi Manajemen Perpustakaan Berbasis Web dengan Teknologi React dan Node.js',
      date: '2025-12-15',
      time: '2:00 PM',
      location: 'Room 301',
      isOnline: false,
      sessionNumber: '5th Guidance',
      status: 'upcoming',
      role: 'Primary Supervisor',
    },
    {
      id: '3',
      studentName: 'Ahmad Fauzi',
      studentId: '20.11.1256',
      thesisTitle: 'Aplikasi Mobile untuk Monitoring Kesehatan menggunakan Flutter dan Firebase',
      date: '2025-12-16',
      time: '9:00 AM',
      location: 'Zoom Meeting',
      isOnline: true,
      sessionNumber: '2nd Guidance',
      status: 'upcoming',
      role: 'Secondary Supervisor',
    },
    {
      id: '4',
      studentName: 'Rina Wijayanti',
      studentId: '20.11.1267',
      thesisTitle: 'Blockchain Technology untuk Sistem Voting Elektronik yang Aman',
      date: '2025-12-13',
      time: '11:00 AM',
      location: 'Google Meet',
      isOnline: true,
      sessionNumber: '4th Guidance',
      status: 'completed',
      role: 'Primary Supervisor',
    },
    {
      id: '5',
      studentName: 'Sarah Rahman',
      studentId: '20.11.1278',
      thesisTitle: 'Analisis Sentimen Media Sosial menggunakan Deep Learning dan Natural Language Processing',
      date: '2025-12-14',
      time: '3:00 PM',
      location: 'Room 202',
      isOnline: false,
      sessionNumber: '6th Guidance',
      status: 'completed',
      role: 'Primary Supervisor',
    },
  ];

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.studentId.includes(searchQuery) ||
      session.thesisTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (session: SupervisionSession) => {
    setSelectedSession(session);
    setNotes('');
    setEvaluationStatus('');
  };

  const handleSaveNotes = () => {
    console.log('Saving notes:', { sessionId: selectedSession?.id, notes, status: evaluationStatus });
    setSelectedSession(null);
  };

  // Generate calendar view
  const generateCalendarWeek = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const dates = ['Dec 14', 'Dec 15', 'Dec 16', 'Dec 17', 'Dec 18'];
    
    return days.map((day, index) => ({
      day,
      date: dates[index],
      sessions: sessions.filter(s => {
        const sessionDate = new Date(s.date);
        const dayOfWeek = sessionDate.getDay();
        return dayOfWeek === index + 1;
      }),
    }));
  };

  const calendarWeek = generateCalendarWeek();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Supervision Schedule</h1>
          <p className="text-muted-foreground mt-2">
            Manage your supervision sessions with students
          </p>
        </div>
        <Button>Schedule New Session</Button>
      </div>

      {/* Filter Bar */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name, ID, or thesis title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 bg-input-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 border rounded-lg p-1">
            <Button
              variant={view === 'table' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('table')}
            >
              Table
            </Button>
            <Button
              variant={view === 'calendar' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('calendar')}
            >
              Calendar
            </Button>
          </div>
        </div>
      </Card>

      {/* Table View */}
      {view === 'table' && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Thesis Title</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.studentName}</TableCell>
                  <TableCell className="text-muted-foreground">{session.studentId}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2">{session.thesisTitle}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-sm text-muted-foreground">{session.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {session.isOnline ? (
                        <Video className="w-4 h-4 text-green-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-sm">{session.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={session.status === 'upcoming' ? 'default' : 'secondary'}
                      className={session.status === 'upcoming' ? 'bg-blue-500' : 'bg-green-500'}
                    >
                      {session.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetail(session)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Week View</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm px-4">December 14-18, 2025</span>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {calendarWeek.map((dayData) => (
              <div key={dayData.day} className="border rounded-lg p-4 bg-gray-50">
                <div className="mb-3">
                  <h4 className="text-sm">{dayData.day}</h4>
                  <p className="text-xs text-muted-foreground">{dayData.date}</p>
                </div>
                <div className="space-y-2">
                  {dayData.sessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
                      onClick={() => handleViewDetail(session)}
                    >
                      <p className="text-xs mb-1">{session.time}</p>
                      <p className="text-sm mb-1">{session.studentName}</p>
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        {session.sessionNumber}
                      </Badge>
                    </div>
                  ))}
                  {dayData.sessions.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No sessions</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Supervision Detail Modal */}
      <Dialog open={selectedSession !== null} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Supervision Session Detail</DialogTitle>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-6 mt-4">
              {/* Student Information */}
              <Card className="p-6 bg-accent border-accent-foreground/10">
                <h3 className="mb-4">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Student Name</Label>
                    <p className="mt-1">{selectedSession.studentName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Student ID</Label>
                    <p className="mt-1">{selectedSession.studentId}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Thesis Title</Label>
                    <p className="mt-1">{selectedSession.thesisTitle}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Supervisor Role</Label>
                    <p className="mt-1">
                      <Badge variant="outline">{selectedSession.role}</Badge>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Schedule Information */}
              <Card className="p-6 bg-accent border-accent-foreground/10">
                <h3 className="mb-4">Schedule Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Date</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <p>{new Date(selectedSession.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Time</Label>
                    <p className="mt-1">{selectedSession.time}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Location</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedSession.isOnline ? (
                        <Video className="w-4 h-4 text-green-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-blue-600" />
                      )}
                      <p>{selectedSession.location}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Session Number</Label>
                    <p className="mt-1">
                      <Badge>{selectedSession.sessionNumber}</Badge>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Supervision Notes */}
              <div className="space-y-4">
                <h3>Supervision Notes</h3>
                <div>
                  <Label htmlFor="notes">Lecturer Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter your notes about this supervision session..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    className="mt-2 bg-input-background"
                  />
                </div>

                <div>
                  <Label htmlFor="document">Attach Reviewed Document (PDF/DOC)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF or DOC (max. 10MB)
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={evaluationStatus} onValueChange={setEvaluationStatus}>
                    <SelectTrigger className="mt-2 bg-input-background">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="revision">Revision Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedSession(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNotes}>
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
