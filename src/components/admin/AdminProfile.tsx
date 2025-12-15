import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User, Mail, Phone, Lock, Calendar, Activity } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const recentActivities = [
  { date: "2024-05-10 14:30", action: "Created new user account", details: "Dr. Ahmad Hasan" },
  { date: "2024-05-10 12:20", action: "Approved title submission", details: "Sarah Putri" },
  { date: "2024-05-10 10:15", action: "Deleted user account", details: "old.user" },
  { date: "2024-05-09 16:45", action: "Scheduled thesis defense", details: "Muhammad Rizki" },
  { date: "2024-05-09 14:20", action: "Updated student data", details: "Bulk import - 45 records" },
];

export function AdminProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Admin Profile</h1>
        <p className="text-gray-500 mt-2">Manage your account settings and view your activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                      AU
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Upload Photo</Button>
                    <p className="text-xs text-gray-500 mt-2">JPG or PNG, max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="fullName" defaultValue="Admin User" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="admin.user" readOnly className="bg-gray-50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="email" type="email" defaultValue="admin@university.edu" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="phone" defaultValue="+62 812 3456 7890" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="currentPassword" type="password" className="pl-10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="newPassword" type="password" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="confirmPassword" type="password" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Role</div>
                <div className="mt-1">Administrator</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Account Created</div>
                <div className="mt-1">January 15, 2024</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Login</div>
                <div className="mt-1">May 10, 2024 at 14:30</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Login IP</div>
                <div className="mt-1">192.168.1.100</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Actions Today</div>
                <div>24</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Actions This Week</div>
                <div>156</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Actions This Month</div>
                <div>642</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-sm">{activity.date}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell className="text-sm text-gray-600">{activity.details}</TableCell>
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
