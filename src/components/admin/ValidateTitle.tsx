import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CheckCircle, XCircle, FileText, User, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";

export function ValidateTitle() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Validate Title Submission</h1>
        <p className="text-gray-500 mt-2">Review and approve or reject thesis title submissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Title Submission Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Student</div>
                    <div>Ahmad Fauzi</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Student ID</div>
                    <div>2019010001</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Supervisor</div>
                    <div>Dr. Budi Santoso</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Submitted</div>
                    <div>May 10, 2024</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Proposed Thesis Title</Label>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p>Machine Learning for Sentiment Analysis on Social Media: A Comparative Study of Indonesian Language Processing</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Title Description / Abstract</Label>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                <p className="text-sm text-gray-700 leading-relaxed">
                  This research aims to develop and evaluate machine learning models for sentiment analysis
                  specifically designed for Indonesian language social media content. The study will compare
                  various algorithms including Naive Bayes, Support Vector Machines, and deep learning approaches
                  such as LSTM and BERT-based models.
                  <br /><br />
                  The research will focus on collecting and preprocessing Indonesian social media data from
                  platforms like Twitter and Instagram, implementing sentiment classification models, and
                  evaluating their performance. Special attention will be given to handling Indonesian language
                  characteristics such as informal language, slang, and code-mixing.
                  <br /><br />
                  Expected outcomes include a comparative analysis of model performance, identification of the
                  most effective approach for Indonesian sentiment analysis, and recommendations for practical
                  implementation in social media monitoring applications.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Validation Status *</Label>
              <Select defaultValue="pending">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approve</SelectItem>
                  <SelectItem value="rejected">Reject</SelectItem>
                  <SelectItem value="revision">Request Revision</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Admin Notes / Feedback *</Label>
              <Textarea
                id="notes"
                placeholder="Enter your feedback, suggestions, or reasons for rejection..."
                rows={6}
              />
              <p className="text-xs text-gray-500">
                This feedback will be sent to the student and supervisor
              </p>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" className="text-red-600 border-red-200">
                <XCircle className="w-4 h-4 mr-2" />
                Reject Title
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Title
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Validation Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div className="text-sm">
                    <p>Title is clear and specific</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div className="text-sm">
                    <p>Scope is appropriate for final project</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div className="text-sm">
                    <p>Topic aligns with program of study</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div className="text-sm">
                    <p>No similar ongoing research</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div className="text-sm">
                    <p>Methodology is feasible</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div className="text-sm">
                    <p>Supervisor expertise matches topic</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                View Student Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Supervisor Info
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Check Similar Titles
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending</span>
                <Badge className="bg-yellow-500">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Approved Today</span>
                <Badge className="bg-green-500">5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rejected Today</span>
                <Badge className="bg-red-500">2</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
