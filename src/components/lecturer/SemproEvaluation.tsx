import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
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
import { Search, FileText, AlertCircle } from 'lucide-react';

interface SemproStudent {
  id: string;
  studentName: string;
  studentId: string;
  thesisTitle: string;
  semproDate: string;
  role: 'Supervisor' | 'Examiner';
  supervisors: string[];
  status: 'Not Evaluated' | 'Submitted';
}

interface EvaluationScores {
  background: number;
  objectives: number;
  methodology: number;
  presentation: number;
  mastery: number;
}

export function SemproEvaluation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<SemproStudent | null>(null);
  const [scores, setScores] = useState<EvaluationScores>({
    background: 75,
    objectives: 75,
    methodology: 75,
    presentation: 75,
    mastery: 75,
  });
  const [decision, setDecision] = useState('');
  const [revisionNotes, setRevisionNotes] = useState('');

  const students: SemproStudent[] = [
    {
      id: '1',
      studentName: 'Sarah Rahman',
      studentId: '20.11.1267',
      thesisTitle: 'Analisis Sentimen Media Sosial menggunakan Deep Learning dan Natural Language Processing',
      semproDate: '2025-12-14',
      role: 'Supervisor',
      supervisors: ['Dr. Ahmad Wijaya', 'Dr. Siti Aminah'],
      status: 'Not Evaluated',
    },
    {
      id: '2',
      studentName: 'Indra Gunawan',
      studentId: '20.11.1278',
      thesisTitle: 'E-Commerce Platform dengan Sistem Rekomendasi Produk Berbasis Artificial Intelligence',
      semproDate: '2025-12-14',
      role: 'Examiner',
      supervisors: ['Dr. Budi Santoso', 'Dr. Rina Wijayanti'],
      status: 'Not Evaluated',
    },
    {
      id: '3',
      studentName: 'Maya Putri',
      studentId: '20.11.1289',
      thesisTitle: 'Smart Home Automation System menggunakan Internet of Things dan Machine Learning',
      semproDate: '2025-12-16',
      role: 'Examiner',
      supervisors: ['Dr. Ahmad Fauzi', 'Dr. Lisa Anggraini'],
      status: 'Not Evaluated',
    },
    {
      id: '4',
      studentName: 'Doni Prasetyo',
      studentId: '20.11.1290',
      thesisTitle: 'Aplikasi Augmented Reality untuk Pembelajaran Interaktif Berbasis Mobile',
      semproDate: '2025-12-12',
      role: 'Supervisor',
      supervisors: ['Dr. Ahmad Wijaya', 'Dr. Rahman Hakim'],
      status: 'Submitted',
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery) ||
      student.thesisTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEvaluate = (student: SemproStudent) => {
    setSelectedStudent(student);
    setScores({
      background: 75,
      objectives: 75,
      methodology: 75,
      presentation: 75,
      mastery: 75,
    });
    setDecision('');
    setRevisionNotes('');
  };

  const calculateFinalScore = (): number => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round(total / 5);
  };

  const handleSubmitEvaluation = () => {
    const finalScore = calculateFinalScore();
    console.log('Submitting evaluation:', {
      studentId: selectedStudent?.id,
      scores,
      finalScore,
      decision,
      revisionNotes,
    });
    setSelectedStudent(null);
  };

  const updateScore = (criterion: keyof EvaluationScores, value: number[]) => {
    setScores({ ...scores, [criterion]: value[0] });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1>Seminar Proposal Evaluation</h1>
        <p className="text-muted-foreground mt-2">
          Evaluate students' seminar proposal presentations
        </p>
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
              <SelectItem value="not-evaluated">Not Evaluated</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Students Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Thesis Title</TableHead>
              <TableHead>Sempro Date</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.studentName}</TableCell>
                <TableCell className="text-muted-foreground">{student.studentId}</TableCell>
                <TableCell className="max-w-sm">
                  <p className="line-clamp-2">{student.thesisTitle}</p>
                </TableCell>
                <TableCell>
                  {new Date(student.semproDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant={student.role === 'Supervisor' ? 'default' : 'secondary'}>
                    {student.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={student.status === 'Not Evaluated' ? 'outline' : 'default'}
                    className={student.status === 'Submitted' ? 'bg-green-500' : ''}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={student.status === 'Not Evaluated' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleEvaluate(student)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {student.status === 'Not Evaluated' ? 'Evaluate' : 'View Evaluation'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Evaluation Modal */}
      <Dialog open={selectedStudent !== null} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Seminar Proposal Evaluation Form</DialogTitle>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6 mt-4">
              {/* Student & Thesis Information */}
              <Card className="p-6 bg-accent border-accent-foreground/10">
                <h3 className="mb-4">Student & Thesis Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Student Name</Label>
                    <p className="mt-1">{selectedStudent.studentName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Student ID</Label>
                    <p className="mt-1">{selectedStudent.studentId}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Thesis Title</Label>
                    <p className="mt-1">{selectedStudent.thesisTitle}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Supervisors</Label>
                    <div className="flex gap-2 mt-1">
                      {selectedStudent.supervisors.map((supervisor, index) => (
                        <Badge key={index} variant="outline">
                          {supervisor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Evaluation Form */}
              <div className="space-y-6">
                <h3>Evaluation Criteria</h3>

                {/* Background & Problem Formulation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Background & Problem Formulation</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.background}
                    </span>
                  </div>
                  <Slider
                    value={[scores.background]}
                    onValueChange={(value) => updateScore('background', value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Research Objectives */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Research Objectives</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.objectives}
                    </span>
                  </div>
                  <Slider
                    value={[scores.objectives]}
                    onValueChange={(value) => updateScore('objectives', value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Methodology Feasibility */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Methodology Feasibility</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.methodology}
                    </span>
                  </div>
                  <Slider
                    value={[scores.methodology]}
                    onValueChange={(value) => updateScore('methodology', value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Presentation Quality */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Presentation Quality</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.presentation}
                    </span>
                  </div>
                  <Slider
                    value={[scores.presentation]}
                    onValueChange={(value) => updateScore('presentation', value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Mastery of Topic */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Mastery of Topic</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.mastery}
                    </span>
                  </div>
                  <Slider
                    value={[scores.mastery]}
                    onValueChange={(value) => updateScore('mastery', value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              {/* Final Evaluation */}
              <Card className="p-6 bg-accent border-accent-foreground/10">
                <h3 className="mb-4">Final Evaluation</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Final Score (Auto-calculated)</Label>
                    <p className="mt-2 text-3xl">{calculateFinalScore()}</p>
                  </div>

                  <div>
                    <Label htmlFor="decision">Decision</Label>
                    <Select value={decision} onValueChange={setDecision}>
                      <SelectTrigger id="decision" className="mt-2 bg-background">
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pass">Pass</SelectItem>
                        <SelectItem value="pass-revision">Pass with Revision</SelectItem>
                        <SelectItem value="fail">Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(decision === 'pass-revision' || decision === 'fail') && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="revisionNotes">Revision Notes</Label>
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      </div>
                      <Textarea
                        id="revisionNotes"
                        placeholder="Please provide detailed revision notes..."
                        value={revisionNotes}
                        onChange={(e) => setRevisionNotes(e.target.value)}
                        rows={5}
                        className="bg-background"
                      />
                      {(decision === 'pass-revision' || decision === 'fail') && !revisionNotes && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                          <AlertCircle className="w-4 h-4" />
                          <span>Revision notes are required when selecting this decision</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitEvaluation}
                  disabled={!decision || ((decision === 'pass-revision' || decision === 'fail') && !revisionNotes)}
                >
                  Save Evaluation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
