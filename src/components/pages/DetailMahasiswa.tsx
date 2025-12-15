import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { ArrowLeft, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const studentDetail = {
  nama: "Budi Santoso",
  nim: "2019010101",
  judul: "Implementasi Machine Learning untuk Prediksi Cuaca",
  email: "budi.santoso@student.ac.id",
  phone: "+62 812-3456-7890",
};

const progressData = [
  { bab: "Bab 1", title: "Pendahuluan", progress: 100, status: "selesai" },
  { bab: "Bab 2", title: "Landasan Teori", progress: 100, status: "selesai" },
  { bab: "Bab 3", title: "Metodologi Penelitian", progress: 75, status: "revisi" },
  { bab: "Bab 4", title: "Hasil dan Pembahasan", progress: 30, status: "progress" },
  { bab: "Bab 5", title: "Kesimpulan dan Saran", progress: 0, status: "pending" },
];

const bimbinganHistory = [
  {
    id: 1,
    tanggal: "10 Oktober 2025",
    file: "Bab_3_Metodologi_v2.pdf",
    status: "diterima",
    catatan: "Metodologi sudah baik, lanjutkan ke Bab 4. Perhatikan referensi yang digunakan.",
  },
  {
    id: 2,
    tanggal: "5 Oktober 2025",
    file: "Bab_3_Metodologi_v1.pdf",
    status: "revisi",
    catatan: "Perlu perbaikan pada bagian metode pengumpulan data. Tambahkan flowchart sistem.",
  },
  {
    id: 3,
    tanggal: "28 September 2025",
    file: "Bab_2_Landasan_Teori.pdf",
    status: "diterima",
    catatan: "Landasan teori sudah komprehensif. Lanjutkan ke bab metodologi.",
  },
  {
    id: 4,
    tanggal: "20 September 2025",
    file: "Bab_1_Pendahuluan.pdf",
    status: "diterima",
    catatan: "Pendahuluan sudah sesuai dengan guidelines. Good job!",
  },
];

interface DetailMahasiswaProps {
  onBack: () => void;
}

export function DetailMahasiswa({ onBack }: DetailMahasiswaProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "selesai":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "revisi":
        return <Clock className="w-4 h-4 text-orange-600" />;
      case "progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />;
    }
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
        <h1 className="text-gray-900 mb-2">Detail Mahasiswa Bimbingan</h1>
        <p className="text-gray-600">Informasi lengkap dan progress bimbingan</p>
      </div>

      {/* Student Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profil Mahasiswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-blue-600 text-white text-xl">
                {studentDetail.nama.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h2 className="text-gray-900">{studentDetail.nama}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">NIM</p>
                  <p className="text-gray-900">{studentDetail.nim}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{studentDetail.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Judul Tugas Akhir</p>
                  <p className="text-gray-900">{studentDetail.judul}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Pengerjaan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progressData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <p className="text-gray-900">
                    {item.bab}: {item.title}
                  </p>
                </div>
                <span className="text-sm text-gray-600">{item.progress}%</span>
              </div>
              <Progress value={item.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bimbingan History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Bimbingan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bimbinganHistory.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-gray-900">{item.file}</p>
                    <p className="text-sm text-gray-500">{item.tanggal}</p>
                  </div>
                </div>
                <Badge variant={item.status === "diterima" ? "default" : "secondary"}>
                  {item.status === "diterima" ? "Diterima" : "Revisi"}
                </Badge>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Catatan Dosen:</p>
                <p className="text-gray-900 mt-1">{item.catatan}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
