import React from 'react';
import { Card } from '../ui/card';
import { Calendar, Users, FileText, ClipboardCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function LecturerDashboard() {
  const stats = [
    { label: 'Active Supervisions', value: '8', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Upcoming Sessions', value: '5', icon: Calendar, color: 'text-green-600 bg-green-50' },
    { label: 'Sempro Evaluations', value: '3', icon: FileText, color: 'text-orange-600 bg-orange-50' },
    { label: 'Defense Evaluations', value: '2', icon: ClipboardCheck, color: 'text-purple-600 bg-purple-50' },
  ];

  const upcomingSessions = [
    {
      student: 'Budi Santoso',
      nim: '20.11.1234',
      title: 'Machine Learning untuk Deteksi Penyakit Tanaman',
      date: 'Dec 15, 2025',
      time: '10:00 AM',
      location: 'Online',
      session: '3rd Guidance',
    },
    {
      student: 'Siti Nurhaliza',
      nim: '20.11.1245',
      title: 'Sistem Informasi Manajemen Perpustakaan Berbasis Web',
      date: 'Dec 15, 2025',
      time: '2:00 PM',
      location: 'Room 301',
      session: '5th Guidance',
    },
    {
      student: 'Ahmad Fauzi',
      nim: '20.11.1256',
      title: 'Aplikasi Mobile untuk Monitoring Kesehatan',
      date: 'Dec 16, 2025',
      time: '9:00 AM',
      location: 'Online',
      session: '2nd Guidance',
    },
  ];

  const pendingEvaluations = [
    {
      type: 'Sempro',
      student: 'Sarah Rahman',
      nim: '20.11.1267',
      title: 'Analisis Sentimen Media Sosial menggunakan Deep Learning',
      date: 'Dec 14, 2025',
      role: 'Supervisor',
    },
    {
      type: 'Sempro',
      student: 'Indra Gunawan',
      nim: '20.11.1278',
      title: 'E-Commerce dengan Rekomendasi Produk Berbasis AI',
      date: 'Dec 14, 2025',
      role: 'Examiner',
    },
    {
      type: 'Final Defense',
      student: 'Maya Putri',
      nim: '20.11.1289',
      title: 'Smart Home Automation System menggunakan IoT',
      date: 'Dec 16, 2025',
      role: 'Examiner',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, Dr. Ahmad Wijaya. Here's your supervision and evaluation overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <h2 className="mt-2">{stat.value}</h2>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Upcoming Supervision Sessions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Upcoming Supervision Sessions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm">{session.student}</h4>
                    <p className="text-xs text-muted-foreground">{session.nim}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {session.session}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                  {session.title}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${session.location === 'Online' ? 'bg-green-500' : 'bg-blue-500'}`} />
                    {session.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Evaluations */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Pending Evaluations</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {pendingEvaluations.map((evaluation, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={evaluation.type === 'Sempro' ? 'bg-orange-500' : 'bg-purple-500'}>
                        {evaluation.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {evaluation.role}
                      </Badge>
                    </div>
                    <h4 className="text-sm">{evaluation.student}</h4>
                    <p className="text-xs text-muted-foreground">{evaluation.nim}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                  {evaluation.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Due: {evaluation.date}
                  </div>
                  <Button size="sm" variant="outline">Evaluate</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Completed supervision session', student: 'Rina Wijayanti', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-600' },
            { action: 'Submitted Sempro evaluation', student: 'Doni Prasetyo', time: '5 hours ago', icon: FileText, color: 'text-orange-600' },
            { action: 'Scheduled supervision meeting', student: 'Budi Santoso', time: '1 day ago', icon: Calendar, color: 'text-blue-600' },
            { action: 'Submitted Final Defense evaluation', student: 'Lisa Anggraini', time: '2 days ago', icon: ClipboardCheck, color: 'text-purple-600' },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className={`p-2 rounded-full bg-gray-50 ${activity.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.student} • {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
