import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Send, Users, Calendar, Bell } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

const announcements = [
  {
    id: "1",
    title: "Defense Schedule Changes",
    recipients: "All Students",
    date: "2024-05-10 14:00",
    status: "Sent",
    views: 45,
  },
  {
    id: "2",
    title: "Supervision Session Reminder",
    recipients: "Active Students",
    date: "2024-05-09 10:30",
    status: "Sent",
    views: 128,
  },
  {
    id: "3",
    title: "Title Submission Deadline",
    recipients: "All Students",
    date: "2024-05-08 09:00",
    status: "Sent",
    views: 156,
  },
  {
    id: "4",
    title: "Examiner Assignment Update",
    recipients: "All Lecturers",
    date: "2024-05-07 15:20",
    status: "Sent",
    views: 32,
  },
];

export function BroadcastAnnouncement() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Broadcast Announcement</h1>
        <p className="text-gray-500 mt-2">Send system-wide announcements to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Announcement Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message Content *</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your announcement message..."
                  rows={8}
                />
                <p className="text-xs text-gray-500">
                  Maximum 500 characters
                </p>
              </div>

              <div className="space-y-3">
                <Label>Select Recipients *</Label>
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="all" />
                    <label htmlFor="all" className="text-sm cursor-pointer">
                      All Users (Students + Lecturers)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="students" />
                    <label htmlFor="students" className="text-sm cursor-pointer">
                      All Students
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active-students" />
                    <label htmlFor="active-students" className="text-sm cursor-pointer">
                      Active Students Only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="lecturers" />
                    <label htmlFor="lecturers" className="text-sm cursor-pointer">
                      All Lecturers
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="supervisors" />
                    <label htmlFor="supervisors" className="text-sm cursor-pointer">
                      Supervisors Only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="examiners" />
                    <label htmlFor="examiners" className="text-sm cursor-pointer">
                      Examiners Only
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Notification Options</Label>
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email" defaultChecked />
                    <label htmlFor="email" className="text-sm cursor-pointer">
                      Send via Email
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="system" defaultChecked />
                    <label htmlFor="system" className="text-sm cursor-pointer">
                      Show in System Notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="urgent" />
                    <label htmlFor="urgent" className="text-sm cursor-pointer">
                      Mark as Urgent
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline">Save as Draft</Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600">System Announcement</span>
                </div>
                <h4 className="mb-2">Announcement Title</h4>
                <p className="text-sm text-gray-600">
                  Your announcement message will appear here...
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  Sent by Admin • Just now
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estimated Reach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Total Recipients</span>
                </div>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Students</span>
                <span className="text-sm">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Lecturers</span>
                <span className="text-sm">0</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Keep messages clear and concise</li>
                <li>Use urgent flag sparingly</li>
                <li>Include relevant dates and deadlines</li>
                <li>Proofread before sending</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Date Sent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell>{announcement.title}</TableCell>
                    <TableCell>{announcement.recipients}</TableCell>
                    <TableCell className="text-sm">{announcement.date}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{announcement.status}</Badge>
                    </TableCell>
                    <TableCell>{announcement.views} views</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
