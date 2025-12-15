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
import { Search, ClipboardCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface DefenseStudent {
  id: string;
  studentName: string;
  studentId: string;
  thesisTitle: string;
  defenseDate: string;
  role: 'Examiner';
  supervisors: string[];
  status: 'Not Evaluated' | 'Submitted';
}

interface DefenseScores {
  structure: number;
  analysis: number;
  implementation: number;
  presentation: number;
  argumentation: number;
}

export function FinalDefenseEvaluation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<DefenseStudent | null>(null);
  const [scores, setScores] = useState<DefenseScores>({
    structure: 80,
    analysis: 80,
    implementation: 80,
    presentation: 80,
    argumentation: 80,
  });
  const [graduationStatus, setGraduationStatus] = useState('');
  const [revisionNotes, setRevisionNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const students: DefenseStudent[] = [
    {
      id: '1',
      studentName: 'Maya Putri',
      studentId: '20.11.1289',
      thesisTitle: 'Smart Home Automation System menggunakan Internet of Things dan Machine Learning',
      defenseDate: '2025-12-16',
      role: 'Examiner',
      supervisors: ['Dr. Ahmad Fauzi', 'Dr. Lisa Anggraini'],
      status: 'Not Evaluated',
    },
    {
      id: '2',
      studentName: 'Rizky Ramadhan',
      studentId: '20.11.1290',
      thesisTitle: 'Sistem Deteksi Fraud Transaksi Online menggunakan Deep Learning',
      defenseDate: '2025-12-17',
      role: 'Examiner',
      supervisors: ['Dr. Budi Santoso', 'Dr. Sarah Rahman'],
      status: 'Not Evaluated',
    },
    {
      id: '3',
      studentName: 'Lisa Anggraini',
      studentId: '20.11.1301',
      thesisTitle: 'Platform E-Learning Adaptif dengan Personalisasi menggunakan Artificial Intelligence',
      defenseDate: '2025-12-13',
      role: 'Examiner',
      supervisors: ['Dr. Ahmad Wijaya', 'Dr. Rina Wijayanti'],
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

  const handleEvaluate = (student: DefenseStudent) => {
    setSelectedStudent(student);
    setScores({
      structure: 80,
      analysis: 80,
      implementation: 80,
      presentation: 80,
      argumentation: 80,
    });
    setGraduationStatus('');
    setRevisionNotes('');
    setShowConfirmation(false);
  };

  const calculateFinalScore = (): number => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round(total / 5);
  };

  const handleContinueToConfirmation = () => {
    if (!graduationStatus) return;
    if ((graduationStatus === 'pass-revision' || graduationStatus === 'fail') && !revisionNotes) return;
    setShowConfirmation(true);
  };

  const handleSubmitEvaluation = () => {
    const finalScore = calculateFinalScore();
    console.log('Submitting final defense evaluation:', {
      studentId: selectedStudent?.id,
      scores,
      finalScore,
      graduationStatus,
      revisionNotes,
    });
    setSelectedStudent(null);
    setShowConfirmation(false);
  };

  const updateScore = (criterion: keyof DefenseScores, value: number[]) => {
    setScores({ ...scores, [criterion]: value[0] });
  };

  const getGraduationStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-500';
      case 'pass-revision':
        return 'bg-orange-500';
      case 'fail':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getGraduationStatusLabel = (status: string) => {
    switch (status) {
      case 'pass':
        return 'Pass without Revision';
      case 'pass-revision':
        return 'Pass with Revision';
      case 'fail':
        return 'Fail';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1>Final Defense Evaluation</h1>
        <p className="text-muted-foreground mt-2">
          Evaluate students' final thesis defense presentations
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
              <TableHead>Defense Date</TableHead>
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
                  {new Date(student.defenseDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{student.role}</Badge>
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
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    {student.status === 'Not Evaluated' ? 'Evaluate' : 'View Evaluation'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Evaluation Modal */}
      <Dialog open={selectedStudent !== null && !showConfirmation} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Final Defense Evaluation Form</DialogTitle>
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

              {/* Evaluation Criteria */}
              <div className="space-y-6">
                <h3>Evaluation Criteria</h3>

                {/* Thesis Structure & Systematics */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Thesis Structure & Systematics</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.structure}
                    </span>
                  </div>
                  <Slider
                    value={[scores.structure]}
                    onValueChange={(value) => updateScore('structure', value)}
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

                {/* Depth of Analysis */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Depth of Analysis</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.analysis}
                    </span>
                  </div>
                  <Slider
                    value={[scores.analysis]}
                    onValueChange={(value) => updateScore('analysis', value)}
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

                {/* Implementation / Results */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Implementation / Results</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.implementation}
                    </span>
                  </div>
                  <Slider
                    value={[scores.implementation]}
                    onValueChange={(value) => updateScore('implementation', value)}
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

                {/* Presentation & Communication */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Presentation & Communication</Label>
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

                {/* Argumentation & Defense Ability */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Argumentation & Defense Ability</Label>
                    <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      {scores.argumentation}
                    </span>
                  </div>
                  <Slider
                    value={[scores.argumentation]}
                    onValueChange={(value) => updateScore('argumentation', value)}
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

              {/* Final Decision */}
              <Card className="p-6 bg-accent border-accent-foreground/10">
                <h3 className="mb-4">Final Decision</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Final Score (Auto-calculated)</Label>
                    <p className="mt-2 text-3xl">{calculateFinalScore()}</p>
                  </div>

                  <div>
                    <Label htmlFor="graduationStatus">Graduation Status</Label>
                    <Select value={graduationStatus} onValueChange={setGraduationStatus}>
                      <SelectTrigger id="graduationStatus" className="mt-2 bg-background">
                        <SelectValue placeholder="Select graduation status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pass">Pass without Revision</SelectItem>
                        <SelectItem value="pass-revision">Pass with Revision</SelectItem>
                        <SelectItem value="fail">Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(graduationStatus === 'pass-revision' || graduationStatus === 'fail') && (
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
                      {(graduationStatus === 'pass-revision' || graduationStatus === 'fail') && !revisionNotes && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                          <AlertCircle className="w-4 h-4" />
                          <span>Revision notes are required when selecting this status</span>
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
                  onClick={handleContinueToConfirmation}
                  disabled={!graduationStatus || ((graduationStatus === 'pass-revision' || graduationStatus === 'fail') && !revisionNotes)}
                >
                  Continue to Confirmation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={() => setShowConfirmation(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Confirm Evaluation Submission</DialogTitle>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6 mt-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm">
                    Please review your evaluation carefully. Once submitted, this evaluation will be final and cannot be changed.
                  </p>
                </div>
              </div>

              <Card className="p-6 bg-accent border-accent-foreground/10">
                <h3 className="mb-4">Evaluation Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Student Name</Label>
                      <p className="mt-1">{selectedStudent.studentName}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Student ID</Label>
                      <p className="mt-1">{selectedStudent.studentId}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-muted-foreground">Thesis Title</Label>
                    <p className="mt-1 text-sm">{selectedStudent.thesisTitle}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-muted-foreground">Structure & Systematics</Label>
                        <p className="mt-1">{scores.structure}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Depth of Analysis</Label>
                        <p className="mt-1">{scores.analysis}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Implementation</Label>
                        <p className="mt-1">{scores.implementation}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Presentation</Label>
                        <p className="mt-1">{scores.presentation}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Argumentation</Label>
                        <p className="mt-1">{scores.argumentation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-muted-foreground">Final Score</Label>
                      <p className="text-2xl">{calculateFinalScore()}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Label className="text-muted-foreground">Graduation Status</Label>
                    <div className="mt-2">
                      <Badge className={getGraduationStatusColor(graduationStatus)}>
                        {getGraduationStatusLabel(graduationStatus)}
                      </Badge>
                    </div>
                  </div>

                  {revisionNotes && (
                    <div className="border-t pt-4">
                      <Label className="text-muted-foreground">Revision Notes</Label>
                      <p className="mt-2 text-sm bg-background p-4 rounded-lg border">
                        {revisionNotes}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-800">
                  By submitting this evaluation, you confirm that all information is accurate and complete.
                </p>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                  Back to Edit
                </Button>
                <Button onClick={handleSubmitEvaluation}>
                  Save & Submit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
