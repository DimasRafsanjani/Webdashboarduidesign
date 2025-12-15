import { useState } from "react";
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
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";

const upcomingSchedules = [
  {
    id: 1,
    mahasiswa: "Budi Santoso",
    nim: "2019010101",
    tanggal: "2025-10-15",
    waktu: "10:00 WIB",
    lokasi: "Online",
    catatan: "Pembahasan Bab 3",
  },
  {
    id: 2,
    mahasiswa: "Ahmad Fauzi",
    nim: "2019010103",
    tanggal: "2025-10-21",
    waktu: "09:00 WIB",
    lokasi: "Online",
    catatan: "Review progress Bab 4",
  },
  {
    id: 3,
    mahasiswa: "Eko Prasetyo",
    nim: "2019010105",
    tanggal: "2025-10-22",
    waktu: "14:00 WIB",
    lokasi: "Ruang Dosen 201",
    catatan: "Konsultasi metodologi",
  },
  {
    id: 4,
    mahasiswa: "Gilang Ramadhan",
    nim: "2019010107",
    tanggal: "2025-10-25",
    waktu: "11:00 WIB",
    lokasi: "Online",
    catatan: "Review keseluruhan draft",
  },
];

export function PenjadwalanBimbingan() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMahasiswa, setSelectedMahasiswa] = useState("");
  const [waktu, setWaktu] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [catatan, setCatatan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Jadwal bimbingan berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Penjadwalan Bimbingan</h1>
        <p className="text-gray-600">Kelola jadwal bimbingan mahasiswa</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Jadwal Baru */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Tambah Jadwal Bimbingan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Pilih Mahasiswa</Label>
                  <Select value={selectedMahasiswa} onValueChange={setSelectedMahasiswa}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mahasiswa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Budi Santoso - 2019010101</SelectItem>
                      <SelectItem value="2">Siti Rahma - 2019010102</SelectItem>
                      <SelectItem value="3">Ahmad Fauzi - 2019010103</SelectItem>
                      <SelectItem value="4">Dewi Lestari - 2019010104</SelectItem>
                      <SelectItem value="5">Eko Prasetyo - 2019010105</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tanggal</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Waktu</Label>
                    <Input
                      type="time"
                      value={waktu}
                      onChange={(e) => setWaktu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Lokasi</Label>
                  <Select value={lokasi} onValueChange={setLokasi}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online (Google Meet)</SelectItem>
                      <SelectItem value="zoom">Online (Zoom)</SelectItem>
                      <SelectItem value="ruang201">Ruang Dosen 201</SelectItem>
                      <SelectItem value="ruang202">Ruang Dosen 202</SelectItem>
                      <SelectItem value="lab">Lab Komputer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Catatan Tambahan</Label>
                  <Textarea
                    placeholder="Agenda atau topik pembahasan..."
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Jadwal
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Kalender</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Schedules */}
      <Card>
        <CardHeader>
          <CardTitle>Jadwal Bimbingan Mendatang</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900">{schedule.mahasiswa}</h3>
                  <p className="text-sm text-gray-500">{schedule.nim}</p>
                </div>
                <Badge variant={schedule.lokasi === "Online" ? "default" : "outline"}>
                  {schedule.lokasi}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(schedule.tanggal).toLocaleDateString("id-ID", { 
                    weekday: "long",
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{schedule.waktu}</span>
                </div>
              </div>
              {schedule.catatan && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{schedule.catatan}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
