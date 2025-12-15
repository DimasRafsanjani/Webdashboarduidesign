import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar, Clock, MapPin, Video, Save, X } from "lucide-react";

export function DefenseSchedule() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Schedule Thesis Defense</h1>
        <p className="text-gray-500 mt-2">Schedule and manage thesis defense sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Defense Information</CardTitle>
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
                    <SelectItem value="1">Sarah Putri Wijaya - 2019010002</SelectItem>
                    <SelectItem value="2">Muhammad Rizki - 2019010003</SelectItem>
                    <SelectItem value="3">Aisyah Rahmadani - 2019010006</SelectItem>
                    <SelectItem value="4">Dimas Prasetyo - 2019010007</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Defense Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="date" type="date" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="time" type="time" className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location Type *</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Physical Room</SelectItem>
                    <SelectItem value="online">Online (Zoom/Meet)</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Room / Online Link *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="room" placeholder="e.g., Room A-301 or https://zoom.us/..." className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examiner1">Chief Examiner *</Label>
                <Select>
                  <SelectTrigger id="examiner1">
                    <SelectValue placeholder="Select chief examiner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Prof. Dr. Siti Rahmah</SelectItem>
                    <SelectItem value="2">Dr. Bambang Supriyanto</SelectItem>
                    <SelectItem value="3">Prof. Dr. Joko Widodo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examiner2">Second Examiner *</Label>
                <Select>
                  <SelectTrigger id="examiner2">
                    <SelectValue placeholder="Select second examiner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Prof. Dr. Siti Rahmah</SelectItem>
                    <SelectItem value="2">Dr. Bambang Supriyanto</SelectItem>
                    <SelectItem value="3">Prof. Dr. Joko Widodo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional information or requirements..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Schedule Defense
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Defenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">May 15, 2024</span>
                  </div>
                  <p className="text-sm">Sarah Putri Wijaya</p>
                  <p className="text-xs text-gray-600 mt-1">Room A-301, 09:00</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">May 16, 2024</span>
                  </div>
                  <p className="text-sm">Muhammad Rizki</p>
                  <p className="text-xs text-gray-600 mt-1">Room B-202, 10:30</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">May 17, 2024</span>
                  </div>
                  <p className="text-sm">Aisyah Rahmadani</p>
                  <p className="text-xs text-gray-600 mt-1">Online - Zoom, 13:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Room A-301</span>
                  <span className="text-xs text-green-600">Available</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Room A-302</span>
                  <span className="text-xs text-green-600">Available</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span>Room B-202</span>
                  <span className="text-xs text-red-600">Occupied</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Room C-101</span>
                  <span className="text-xs text-green-600">Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
