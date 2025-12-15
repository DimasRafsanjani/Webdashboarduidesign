import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, GraduationCap, FileText, Calendar, TrendingUp, Clock, Plus, Eye, CheckSquare } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const statsCards = [
  {
    title: "Active Students",
    value: "248",
    change: "+12 this month",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Supervisors & Examiners",
    value: "45",
    change: "32 supervisors, 13 examiners",
    icon: GraduationCap,
    color: "bg-green-500",
  },
  {
    title: "Title Submissions",
    value: "18",
    change: "8 pending, 7 approved, 3 rejected",
    icon: FileText,
    color: "bg-yellow-500",
  },
  {
    title: "Upcoming Defenses",
    value: "12",
    change: "Next 30 days",
    icon: Calendar,
    color: "bg-purple-500",
  },
];

const progressData = [
  { name: "In Progress", value: 142, color: "#3b82f6" },
  { name: "Passed", value: 89, color: "#10b981" },
  { name: "Revision", value: 17, color: "#f59e0b" },
];

const monthlyData = [
  { month: "Jan", submissions: 12, defenses: 8 },
  { month: "Feb", submissions: 15, defenses: 10 },
  { month: "Mar", submissions: 18, defenses: 12 },
  { month: "Apr", submissions: 14, defenses: 15 },
  { month: "May", submissions: 20, defenses: 18 },
  { month: "Jun", submissions: 16, defenses: 14 },
];

const recentActivities = [
  {
    user: "Ahmad Fauzi",
    action: "submitted title proposal",
    time: "2 minutes ago",
    type: "submission",
  },
  {
    user: "Dr. Siti Rahmah",
    action: "approved thesis defense for Sarah Putri",
    time: "15 minutes ago",
    type: "approval",
  },
  {
    user: "Budi Santoso",
    action: "uploaded revision document",
    time: "1 hour ago",
    type: "upload",
  },
  {
    user: "Admin",
    action: "created new user account for Dr. Ahmad",
    time: "2 hours ago",
    type: "account",
  },
  {
    user: "Dewi Lestari",
    action: "scheduled supervision meeting",
    time: "3 hours ago",
    type: "schedule",
  },
  {
    user: "Prof. Dr. Bambang",
    action: "submitted final grades for 5 students",
    time: "5 hours ago",
    type: "grade",
  },
];

const upcomingDefenses = [
  {
    student: "Sarah Putri Wijaya",
    nim: "2019010001",
    title: "Machine Learning for Sentiment Analysis",
    date: "May 15, 2024",
    time: "09:00",
    room: "Room A-301",
  },
  {
    student: "Muhammad Rizki",
    nim: "2019010002",
    title: "Blockchain Implementation in Supply Chain",
    date: "May 16, 2024",
    time: "10:30",
    room: "Room B-202",
  },
  {
    student: "Aisyah Rahmadani",
    nim: "2019010003",
    title: "IoT-based Smart Agriculture System",
    date: "May 17, 2024",
    time: "13:00",
    room: "Online - Zoom",
  },
  {
    student: "Dimas Prasetyo",
    nim: "2019010004",
    title: "Computer Vision for Traffic Monitoring",
    date: "May 18, 2024",
    time: "09:00",
    room: "Room A-301",
  },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's what's happening with the final projects.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h2 className="mt-2">{stat.value}</h2>
                  <p className="text-sm text-gray-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Plus className="w-6 h-6 text-blue-600" />
              <span>Add Event</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Eye className="w-6 h-6 text-green-600" />
              <span>Review Thesis Proposals</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <CheckSquare className="w-6 h-6 text-purple-600" />
              <span>Manage Assignments</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="submissions" fill="#3b82f6" name="Title Submissions" />
                <Bar dataKey="defenses" fill="#10b981" name="Thesis Defenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Progress Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {progressData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm">{item.value} students</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Upcoming Defenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="text-gray-900">{activity.user}</span>
                      <span className="text-gray-600"> {activity.action}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Thesis Defenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDefenses.map((defense, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm">{defense.student}</h4>
                      <p className="text-sm text-gray-500 mt-1">{defense.title}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{defense.date}</span>
                        </div>
                        <span className="text-xs text-gray-600">{defense.time}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{defense.room}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}