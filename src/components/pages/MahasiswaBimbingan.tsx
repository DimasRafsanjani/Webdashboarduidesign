import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { Search, Eye } from "lucide-react";

interface Student {
  id: number;
  nama: string;
  nim: string;
  judul: string;
  status: "aktif" | "revisi" | "selesai";
}

const studentsData: Student[] = [
  {
    id: 1,
    nama: "Budi Santoso",
    nim: "2019010101",
    judul: "Implementasi Machine Learning untuk Prediksi Cuaca",
    status: "aktif",
  },
  {
    id: 2,
    nama: "Siti Rahma",
    nim: "2019010102",
    judul: "Sistem Informasi Manajemen Perpustakaan Berbasis Web",
    status: "revisi",
  },
  {
    id: 3,
    nama: "Ahmad Fauzi",
    nim: "2019010103",
    judul: "Aplikasi Mobile untuk Monitoring Kesehatan",
    status: "aktif",
  },
  {
    id: 4,
    nama: "Dewi Lestari",
    nim: "2019010104",
    judul: "Analisis Sentimen Media Sosial Menggunakan NLP",
    status: "selesai",
  },
  {
    id: 5,
    nama: "Eko Prasetyo",
    nim: "2019010105",
    judul: "Pengembangan Chatbot Customer Service dengan AI",
    status: "aktif",
  },
  {
    id: 6,
    nama: "Fitri Handayani",
    nim: "2019010106",
    judul: "Sistem Pakar Diagnosa Penyakit Tanaman",
    status: "revisi",
  },
  {
    id: 7,
    nama: "Gilang Ramadhan",
    nim: "2019010107",
    judul: "E-Commerce Platform dengan Rekomendasi Produk",
    status: "aktif",
  },
  {
    id: 8,
    nama: "Hana Aulia",
    nim: "2019010108",
    judul: "Dashboard Analytics untuk Business Intelligence",
    status: "aktif",
  },
];

interface MahasiswaBimbinganProps {
  onNavigateToDetail: (studentId: number) => void;
}

export function MahasiswaBimbingan({ onNavigateToDetail }: MahasiswaBimbinganProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = studentsData.filter(
    (student) =>
      student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nim.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      aktif: { variant: "default", label: "Aktif" },
      revisi: { variant: "secondary", label: "Revisi" },
      selesai: { variant: "outline", label: "Selesai" },
    };
    const config = variants[status] || variants.aktif;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Mahasiswa Bimbingan</h1>
        <p className="text-gray-600">Daftar mahasiswa yang dibimbing</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mahasiswa</CardTitle>
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
                <TableHead>Status Bimbingan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.nama}</TableCell>
                  <TableCell>{student.nim}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{student.judul}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigateToDetail(student.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada mahasiswa yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
