import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Save, X } from "lucide-react";

export function AddStudent() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Add New Student</h1>
        <p className="text-gray-500 mt-2">Create a new student record in the system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="Enter full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nim">Student ID (NIM) *</Label>
                  <Input id="nim" placeholder="e.g. 2019010001" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="student@university.edu" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+62 812 3456 7890" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="program">Program of Study *</Label>
                  <Select>
                    <SelectTrigger id="program">
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="is">Information Systems</SelectItem>
                      <SelectItem value="se">Software Engineering</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batch">Batch Year *</Label>
                  <Select>
                    <SelectTrigger id="batch">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2019">2019</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="supervisor">Assign Supervisor</Label>
                  <Select>
                    <SelectTrigger id="supervisor">
                      <SelectValue placeholder="Select supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dr. Budi Santoso</SelectItem>
                      <SelectItem value="2">Prof. Dr. Siti Rahmah</SelectItem>
                      <SelectItem value="3">Dr. Ahmad Hasan</SelectItem>
                      <SelectItem value="4">Dr. Bambang Supriyanto</SelectItem>
                      <SelectItem value="5">Prof. Dr. Joko Widodo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter student address" />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Student
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Please ensure all required fields (*) are filled correctly:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full name should match official documents</li>
                  <li>Student ID (NIM) must be unique</li>
                  <li>Email should be university email</li>
                  <li>Program and batch must be accurate</li>
                  <li>Supervisor can be assigned later if not available</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  View All Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Import from Excel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Bulk Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
