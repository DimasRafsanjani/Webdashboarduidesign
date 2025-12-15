import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import { Search, Eye, CheckCircle, XCircle, AlertCircle, Download } from "lucide-react";

const defenseResults = [
  {
    id: "1",
    student: "Sarah Putri Wijaya",
    nim: "2019010002",
    title: "Machine Learning for Sentiment Analysis",
    date: "2024-05-15",
    examiner1: "Prof. Dr. Siti Rahmah",
    examiner1Score: 88,
    examiner2: "Dr. Bambang Supriyanto",
    examiner2Score: 86,
    averageScore: 87,
    result: "Passed",
    notes: "Excellent work with minor revisions needed",
  },
  {
    id: "2",
    student: "Muhammad Rizki",
    nim: "2019010003",
    title: "Blockchain Implementation in Supply Chain",
    date: "2024-05-16",
    examiner1: "Dr. Ahmad Hasan",
    examiner1Score: 80,
    examiner2: "Prof. Dr. Joko Widodo",
    examiner2Score: 79,
    averageScore: 79.5,
    result: "Passed",
    notes: "Good implementation, needs documentation improvement",
  },
  {
    id: "3",
    student: "Aisyah Rahmadani",
    nim: "2019010006",
    title: "IoT-based Smart Agriculture System",
    date: "2024-05-17",
    examiner1: "Dr. Budi Santoso",
    examiner1Score: 72,
    examiner2: "Dr. Dewi Kusuma",
    examiner2Score: 68,
    averageScore: 70,
    result: "Revision",
    notes: "Major revisions needed in methodology chapter",
  },
  {
    id: "4",
    student: "Dimas Prasetyo",
    nim: "2019010007",
    title: "Computer Vision for Traffic Monitoring",
    date: "2024-05-18",
    examiner1: "Prof. Dr. Siti Rahmah",
    examiner1Score: 85,
    examiner2: "Dr. Ahmad Hasan",
    examiner2Score: 83,
    averageScore: 84,
    result: "Passed",
    notes: "Well-executed research with solid results",
  },
];

export function DefenseResult() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("all");

  const filteredResults = defenseResults.filter((result) => {
    const matchesSearch =
      result.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.nim.includes(searchTerm) ||
      result.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterResult === "all" || result.result === filterResult;
    return matchesSearch && matchesFilter;
  });

  const getResultBadge = (result: string) => {
    switch (result) {
      case "Passed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Passed
          </Badge>
        );
      case "Revision":
        return (
          <Badge className="bg-yellow-500">
            <AlertCircle className="w-3 h-3 mr-1" />
            Revision
          </Badge>
        );
      case "Failed":
        return (
          <Badge className="bg-red-500">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge>{result}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 65) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Thesis Defense Results</h1>
          <p className="text-gray-500 mt-2">View and manage thesis defense outcomes</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Defenses</div>
            <div className="text-2xl mt-1">{defenseResults.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Passed</div>
            <div className="text-2xl mt-1 text-green-600">
              {defenseResults.filter((r) => r.result === "Passed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Need Revision</div>
            <div className="text-2xl mt-1 text-yellow-600">
              {defenseResults.filter((r) => r.result === "Revision").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Average Score</div>
            <div className="text-2xl mt-1 text-blue-600">
              {(defenseResults.reduce((sum, r) => sum + r.averageScore, 0) / defenseResults.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by student name, NIM, or title..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterResult} onValueChange={setFilterResult}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="Passed">Passed</SelectItem>
                <SelectItem value="Revision">Revision</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No defense results found
              </div>
            ) : (
              filteredResults.map((result) => (
                <Card key={result.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Student Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="mb-1">{result.student}</h3>
                            <p className="text-sm text-gray-500 mb-2">{result.nim}</p>
                            <p className="text-sm text-gray-700 line-clamp-2">{result.title}</p>
                          </div>
                          {getResultBadge(result.result)}
                        </div>
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <span className="text-gray-900">Notes:</span> {result.notes}
                          </p>
                        </div>
                      </div>

                      {/* Scores */}
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Examiner 1</div>
                          <div className="text-sm mb-1">{result.examiner1}</div>
                          <div className={`text-xl ${getScoreColor(result.examiner1Score)}`}>
                            {result.examiner1Score}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Examiner 2</div>
                          <div className="text-sm mb-1">{result.examiner2}</div>
                          <div className={`text-xl ${getScoreColor(result.examiner2Score)}`}>
                            {result.examiner2Score}
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Defense Date</div>
                          <div className="text-sm mb-4">{result.date}</div>
                          
                          <div className="text-sm text-gray-500 mb-1">Average Score</div>
                          <div className={`text-3xl ${getScoreColor(result.averageScore)}`}>
                            {result.averageScore}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {filteredResults.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredResults.length} of {defenseResults.length} results
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
