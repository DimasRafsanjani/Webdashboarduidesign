import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  FileText,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const stats: StatCard[] = [
  {
    title: "Pending Title Validation",
    value: "12",
    change: "+3 today",
    icon: FileText,
    color: "bg-yellow-500",
  },
  {
    title: "Scheduled Sempro",
    value: "8",
    change: "This week",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    title: "Upcoming Defense",
    value: "5",
    change: "This month",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Active Students",
    value: "156",
    change: "+12 this semester",
    icon: TrendingUp,
    color: "bg-green-500",
  },
];

const recentSubmissions = [
  {
    id: "1",
    studentName: "Ahmad Fauzi",
    nim: "2019010001",
    title: "Machine Learning for Sentiment Analysis",
    date: "2024-05-15",
    status: "Pending",
  },
  {
    id: "2",
    studentName: "Sarah Putri Wijaya",
    nim: "2019010002",
    title: "Blockchain for Supply Chain Transparency",
    date: "2024-05-15",
    status: "Pending",
  },
  {
    id: "3",
    studentName: "Muhammad Rizki",
    nim: "2019010003",
    title: "IoT Smart Agriculture System",
    date: "2024-05-14",
    status: "Validated",
  },
];

const upcomingSchedules = [
  {
    id: "1",
    type: "Sempro",
    studentName: "Aisyah Rahmadani",
    date: "2024-05-20",
    time: "09:00",
    room: "Room A-301",
  },
  {
    id: "2",
    type: "Defense",
    studentName: "Dimas Prasetyo",
    date: "2024-05-22",
    time: "10:30",
    room: "Room B-202",
  },
  {
    id: "3",
    type: "Sempro",
    studentName: "Fitri Handayani",
    date: "2024-05-23",
    time: "13:00",
    room: "Room A-302",
  },
];

export function SimplifiedDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1>Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Here's what's happening with the thesis management system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h2 className="mt-2">{stat.value}</h2>
                    <p className="text-sm text-gray-600 mt-1">{stat.change}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Title Submissions */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Title Submissions</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm">{submission.studentName}</h4>
                      <p className="text-xs text-gray-500">{submission.nim}</p>
                    </div>
                    <Badge
                      variant={
                        submission.status === "Pending" ? "secondary" : "default"
                      }
                      className={
                        submission.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      {submission.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{submission.title}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {submission.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedules */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Schedules</CardTitle>
              <Button variant="ghost" size="sm">
                View Calendar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={
                            schedule.type === "Sempro"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                          }
                        >
                          {schedule.type}
                        </Badge>
                        <h4 className="text-sm">{schedule.studentName}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {schedule.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {schedule.time}
                    </div>
                    <div className="flex items-center">
                      <span>{schedule.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-blue-50 hover:border-blue-500 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <p>Review Title Submissions</p>
                <p className="text-xs text-gray-500 mt-1">12 pending</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-green-50 hover:border-green-500 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-center">
                <p>Schedule Sempro</p>
                <p className="text-xs text-gray-500 mt-1">6 ready to schedule</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-purple-50 hover:border-purple-500 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-center">
                <p>Schedule Defense</p>
                <p className="text-xs text-gray-500 mt-1">4 ready to schedule</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">All Services Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Database Backup: Today 03:00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Academic Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Semester</span>
                <span>Ganjil 2024/2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Registration Period</span>
                <Badge className="bg-green-500">Open</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Defense Period</span>
                <Badge className="bg-blue-500">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
