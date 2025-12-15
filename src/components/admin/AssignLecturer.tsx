import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Save, X, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

export function AssignLecturer() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Assign Lecturer</h1>
        <p className="text-gray-500 mt-2">Assign supervisors and examiners to students</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Assignment Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="student">Select Student *</Label>
                <Select>
                  <SelectTrigger id="student">
                    <SelectValue placeholder="Choose a student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ahmad Fauzi - 2019010001</SelectItem>
                    <SelectItem value="2">Sarah Putri Wijaya - 2019010002</SelectItem>
                    <SelectItem value="3">Muhammad Rizki - 2019010003</SelectItem>
                    <SelectItem value="4">Dewi Lestari - 2019010004</SelectItem>
                    <SelectItem value="5">Budi Hartanto - 2019010005</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor">Select Supervisor *</Label>
                <Select>
                  <SelectTrigger id="supervisor">
                    <SelectValue placeholder="Choose a supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      Dr. Budi Santoso - (8 students)
                    </SelectItem>
                    <SelectItem value="2">
                      Prof. Dr. Siti Rahmah - (12 students)
                    </SelectItem>
                    <SelectItem value="3">
                      Dr. Ahmad Hasan - (6 students)
                    </SelectItem>
                    <SelectItem value="4">
                      Dr. Bambang Supriyanto - (10 students)
                    </SelectItem>
                    <SelectItem value="6">
                      Dr. Dewi Kusuma - (7 students)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examiner1">Select Examiner 1 *</Label>
                <Select>
                  <SelectTrigger id="examiner1">
                    <SelectValue placeholder="Choose first examiner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Prof. Dr. Siti Rahmah</SelectItem>
                    <SelectItem value="4">Dr. Bambang Supriyanto</SelectItem>
                    <SelectItem value="5">Prof. Dr. Joko Widodo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examiner2">Select Examiner 2</Label>
                <Select>
                  <SelectTrigger id="examiner2">
                    <SelectValue placeholder="Choose second examiner (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Prof. Dr. Siti Rahmah</SelectItem>
                    <SelectItem value="4">Dr. Bambang Supriyanto</SelectItem>
                    <SelectItem value="5">Prof. Dr. Joko Widodo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <AlertDescription>
                  Make sure the supervisor and examiners are available and not overloaded with students.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Assign Lecturers
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lecturer Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Dr. Ahmad Hasan</span>
                    <span className="text-xs text-green-600">Available</span>
                  </div>
                  <div className="text-xs text-gray-600">6 students</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Dr. Bambang S.</span>
                    <span className="text-xs text-yellow-600">Moderate</span>
                  </div>
                  <div className="text-xs text-gray-600">10 students</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Prof. Dr. Siti R.</span>
                    <span className="text-xs text-red-600">Full</span>
                  </div>
                  <div className="text-xs text-gray-600">12 students</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-gray-900">Ahmad Fauzi</p>
                  <p className="text-gray-500 text-xs">Assigned to Dr. Budi Santoso</p>
                  <p className="text-gray-400 text-xs">2 hours ago</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-gray-900">Sarah Putri</p>
                  <p className="text-gray-500 text-xs">Assigned to Prof. Dr. Siti R.</p>
                  <p className="text-gray-400 text-xs">5 hours ago</p>
                </div>
                <div>
                  <p className="text-gray-900">Muhammad Rizki</p>
                  <p className="text-gray-500 text-xs">Assigned to Dr. Ahmad Hasan</p>
                  <p className="text-gray-400 text-xs">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
