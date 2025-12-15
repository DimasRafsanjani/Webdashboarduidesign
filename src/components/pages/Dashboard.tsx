import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, Calendar, FileText, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Bimbingan", aktif: 12, selesai: 8 },
  { name: "Sidang", dijadwalkan: 5, selesai: 3 },
];

const notifications = [
  { id: 1, type: "upload", student: "Budi Santoso", message: "mengunggah file Bab 3", time: "10 menit lalu" },
  { id: 2, type: "revision", student: "Siti Rahma", message: "telah merevisi Bab 2", time: "1 jam lalu" },
  { id: 3, type: "schedule", student: "Ahmad Fauzi", message: "meminta jadwal bimbingan", time: "2 jam lalu" },
  { id: 4, type: "info", student: "Dewi Lestari", message: "sidang dijadwalkan 20 Okt 2025", time: "3 jam lalu" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Dashboard Utama</h1>
        <p className="text-gray-600">Selamat datang, Dr. Ahmad Wijaya</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Mahasiswa Aktif</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">12</div>
            <p className="text-xs text-gray-500 mt-1">Bimbingan berlangsung</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Jadwal Bimbingan</CardTitle>
            <Calendar className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">3</div>
            <p className="text-xs text-gray-500 mt-1">Minggu ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Jadwal Sidang</CardTitle>
            <FileText className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">2</div>
            <p className="text-xs text-gray-500 mt-1">Bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Menunggu Penilaian</CardTitle>
            <Clock className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">5</div>
            <p className="text-xs text-gray-500 mt-1">Perlu ditindaklanjuti</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifikasi Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    <span>{notif.student}</span> {notif.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Bimbingan & Pengujian</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="aktif" fill="#3b82f6" name="Aktif/Dijadwalkan" />
                <Bar dataKey="selesai" fill="#10b981" name="Selesai" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Schedules */}
      <Card>
        <CardHeader>
          <CardTitle>Jadwal Terdekat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-gray-900">Bimbingan - Budi Santoso</p>
                <p className="text-sm text-gray-600">Rabu, 15 Oktober 2025 - 10:00 WIB</p>
              </div>
            </div>
            <Badge>Online</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-gray-900">Sidang - Dewi Lestari</p>
                <p className="text-sm text-gray-600">Jumat, 20 Oktober 2025 - 14:00 WIB</p>
              </div>
            </div>
            <Badge variant="outline">Ruang 301</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-gray-900">Bimbingan - Ahmad Fauzi</p>
                <p className="text-sm text-gray-600">Senin, 21 Oktober 2025 - 09:00 WIB</p>
              </div>
            </div>
            <Badge>Online</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
