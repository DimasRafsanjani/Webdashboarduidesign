import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Search, FileCheck } from "lucide-react";
import { useState } from "react";

const mahasiswaUjian = [
  {
    id: 1,
    nama: "Dewi Lestari",
    nim: "2019010104",
    judul: "Analisis Sentimen Media Sosial Menggunakan NLP",
    jadwalSidang: "2025-10-20",
    waktu: "14:00 WIB",
    status: "Terjadwal",
  },
  {
    id: 2,
    nama: "Hana Aulia",
    nim: "2019010108",
    judul: "Dashboard Analytics untuk Business Intelligence",
    jadwalSidang: "2025-10-22",
    waktu: "10:00 WIB",
    status: "Terjadwal",
  },
  {
    id: 3,
    nama: "Rifki Ananda",
    nim: "2019010109",
    judul: "Sistem Deteksi Fraud Menggunakan Deep Learning",
    jadwalSidang: "2025-10-25",
    waktu: "13:00 WIB",
    status: "Terjadwal",
  },
  {
    id: 4,
    nama: "Maya Sari",
    nim: "2019010110",
    judul: "Aplikasi AR untuk Edukasi Interaktif",
    jadwalSidang: "2025-10-27",
    waktu: "09:00 WIB",
    status: "Terjadwal",
  },
  {
    id: 5,
    nama: "Farhan Hidayat",
    nim: "2019010111",
    judul: "Platform E-Learning Berbasis Gamifikasi",
    jadwalSidang: "2025-10-18",
    waktu: "15:00 WIB",
    status: "Selesai Dinilai",
  },
];

interface SelectMahasiswaProps {
  onNavigateToPenilaian: (studentId: number) => void;
}

export function SelectMahasiswa({ onNavigateToPenilaian }: SelectMahasiswaProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMahasiswa = mahasiswaUjian.filter(
    (mhs) =>
      mhs.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mhs.nim.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Mahasiswa Ujian Sidang</h1>
        <p className="text-gray-600">Daftar mahasiswa yang akan diuji sebagai penguji</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mahasiswa Sidang</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari nama atau NIM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Mahasiswa</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Judul Tugas Akhir</TableHead>
                <TableHead>Jadwal Sidang</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMahasiswa.map((mhs) => (
                <TableRow key={mhs.id}>
                  <TableCell>{mhs.nama}</TableCell>
                  <TableCell>{mhs.nim}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{mhs.judul}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>
                        {new Date(mhs.jadwalSidang).toLocaleDateString("id-ID", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-500">{mhs.waktu}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={mhs.status === "Terjadwal" ? "default" : "outline"}
                    >
                      {mhs.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigateToPenilaian(mhs.id)}
                      disabled={mhs.status === "Selesai Dinilai"}
                    >
                      <FileCheck className="w-4 h-4 mr-2" />
                      {mhs.status === "Selesai Dinilai" ? "Sudah Dinilai" : "Buka Penilaian"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredMahasiswa.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada mahasiswa yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
