import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

const studentData = {
  nama: "Dewi Lestari",
  nim: "2019010104",
  judul: "Analisis Sentimen Media Sosial Menggunakan NLP",
  jadwalSidang: "2025-10-20",
  waktu: "14:00 WIB",
  ruangan: "Ruang Sidang 301",
};

interface PenilaianPengujiProps {
  onBack: () => void;
}

export function PenilaianPenguji({ onBack }: PenilaianPengujiProps) {
  const [struktur, setStruktur] = useState([75]);
  const [presentasi, setPresentasi] = useState([80]);
  const [penguasaan, setPenguasaan] = useState([85]);
  const [ketepatan, setKetepatan] = useState([90]);
  const [catatan, setCatatan] = useState("");

  const nilaiRataRata = Math.round(
    (struktur[0] + presentasi[0] + penguasaan[0] + ketepatan[0]) / 4
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Penilaian berhasil dikirim ke Admin Sidang!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      <div>
        <h1 className="text-gray-900 mb-2">Penilaian Penguji</h1>
        <p className="text-gray-600">Form penilaian untuk ujian sidang tugas akhir</p>
      </div>

      {/* Student Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Mahasiswa & Sidang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-blue-600 text-white">
                {studentData.nama.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-gray-900">{studentData.nama}</h2>
                <p className="text-gray-600">{studentData.nim}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Judul Tugas Akhir</p>
                <p className="text-gray-900">{studentData.judul}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-sm text-gray-500">Jadwal Sidang</p>
                  <p className="text-gray-900">
                    {new Date(studentData.jadwalSidang).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Waktu & Lokasi</p>
                  <p className="text-gray-900">
                    {studentData.waktu} - {studentData.ruangan}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Form Penilaian</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Struktur & Sistematika Laporan</Label>
                  <span className="text-blue-600">{struktur[0]}/100</span>
                </div>
                <Slider
                  value={struktur}
                  onValueChange={setStruktur}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Penilaian terhadap struktur penulisan, sistematika, dan kelengkapan laporan
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Kemampuan Presentasi</Label>
                  <span className="text-blue-600">{presentasi[0]}/100</span>
                </div>
                <Slider
                  value={presentasi}
                  onValueChange={setPresentasi}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Kemampuan menyampaikan materi, komunikasi, dan penjelasan
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Penguasaan Materi</Label>
                  <span className="text-blue-600">{penguasaan[0]}/100</span>
                </div>
                <Slider
                  value={penguasaan}
                  onValueChange={setPenguasaan}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Pemahaman terhadap topik, teori, dan metodologi yang digunakan
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Ketepatan Waktu Presentasi</Label>
                  <span className="text-blue-600">{ketepatan[0]}/100</span>
                </div>
                <Slider
                  value={ketepatan}
                  onValueChange={setKetepatan}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Manajemen waktu dan efisiensi penyampaian materi
                </p>
              </div>
            </div>

            {/* Average Score Display */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Nilai Rata-rata</p>
                    <p className="text-3xl text-blue-900 mt-1">{nilaiRataRata}</p>
                  </div>
                  <Badge
                    variant={
                      nilaiRataRata >= 80
                        ? "default"
                        : nilaiRataRata >= 70
                        ? "secondary"
                        : "outline"
                    }
                    className="text-lg px-4 py-2"
                  >
                    {nilaiRataRata >= 80
                      ? "Sangat Baik"
                      : nilaiRataRata >= 70
                      ? "Baik"
                      : nilaiRataRata >= 60
                      ? "Cukup"
                      : "Perlu Perbaikan"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label>Catatan / Komentar Revisi</Label>
              <Textarea
                placeholder="Catatan evaluasi, komentar, dan saran perbaikan untuk mahasiswa..."
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Simpan & Kirim ke Admin Sidang
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
