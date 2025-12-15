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
import { Search, Download, Filter } from "lucide-react";

const activities = [
  {
    id: "1",
    date: "2024-05-10 14:30:25",
    user: "Admin User",
    role: "Admin",
    action: "Created new user account",
    description: "Created account for Dr. Ahmad Hasan",
    ipAddress: "192.168.1.100",
    type: "create",
  },
  {
    id: "2",
    date: "2024-05-10 14:15:10",
    user: "Dr. Budi Santoso",
    role: "Lecturer",
    action: "Submitted final grades",
    description: "Submitted grades for 5 students",
    ipAddress: "192.168.1.105",
    type: "update",
  },
  {
    id: "3",
    date: "2024-05-10 13:45:33",
    user: "Ahmad Fauzi",
    role: "Student",
    action: "Submitted title proposal",
    description: "Submitted new thesis title for approval",
    ipAddress: "192.168.1.120",
    type: "create",
  },
  {
    id: "4",
    date: "2024-05-10 12:20:15",
    user: "Admin User",
    role: "Admin",
    action: "Approved title submission",
    description: "Approved thesis title for Sarah Putri",
    ipAddress: "192.168.1.100",
    type: "approve",
  },
  {
    id: "5",
    date: "2024-05-10 11:30:42",
    user: "Prof. Dr. Siti Rahmah",
    role: "Lecturer",
    action: "Scheduled supervision meeting",
    description: "Scheduled meeting with Muhammad Rizki",
    ipAddress: "192.168.1.108",
    type: "update",
  },
  {
    id: "6",
    date: "2024-05-10 10:15:28",
    user: "Admin User",
    role: "Admin",
    action: "Deleted user account",
    description: "Deleted inactive account: old.user",
    ipAddress: "192.168.1.100",
    type: "delete",
  },
  {
    id: "7",
    date: "2024-05-10 09:45:17",
    user: "Dewi Lestari",
    role: "Student",
    action: "Uploaded revision document",
    description: "Uploaded revised thesis chapter 3",
    ipAddress: "192.168.1.125",
    type: "upload",
  },
  {
    id: "8",
    date: "2024-05-10 09:00:05",
    user: "Admin User",
    role: "Admin",
    action: "System login",
    description: "Logged in to admin panel",
    ipAddress: "192.168.1.100",
    type: "login",
  },
];

export function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || activity.role === filterRole;
    const matchesType = filterType === "all" || activity.type === filterType;
    return matchesSearch && matchesRole && matchesType;
  });

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      create: "bg-green-500",
      update: "bg-blue-500",
      delete: "bg-red-500",
      approve: "bg-purple-500",
      upload: "bg-yellow-500",
      login: "bg-gray-500",
    };
    return <Badge className={colors[type] || "bg-gray-500"}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>System Activity Log</h1>
          <p className="text-gray-500 mt-2">Monitor all system activities and user actions</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Log
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Today's Activities</div>
            <div className="text-2xl mt-1">{activities.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Admin Actions</div>
            <div className="text-2xl mt-1">
              {activities.filter((a) => a.role === "Admin").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Lecturer Actions</div>
            <div className="text-2xl mt-1">
              {activities.filter((a) => a.role === "Lecturer").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Student Actions</div>
            <div className="text-2xl mt-1">
              {activities.filter((a) => a.role === "Student").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Critical Actions</div>
            <div className="text-2xl mt-1 text-red-600">
              {activities.filter((a) => a.type === "delete").length}
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
                placeholder="Search activities..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Lecturer">Lecturer</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="upload">Upload</SelectItem>
                <SelectItem value="login">Login</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No activities found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="text-sm">{activity.date}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{activity.role}</Badge>
                      </TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="line-clamp-2 text-sm text-gray-600">
                          {activity.description}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(activity.type)}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {activity.ipAddress}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredActivities.length} of {activities.length} activities
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
        </CardContent>
      </Card>
    </div>
  );
}
