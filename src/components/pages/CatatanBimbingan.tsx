import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
import { Search, FileDown, Plus } from "lucide-react";
import { Badge } from "../ui/badge";

const catatanData = [
  {
    id: 1,
    tanggal: "2025-10-10",
    mahasiswa: "Budi Santoso",
    nim: "2019010101",
    topik: "Pembahasan Bab 3",
    catatan: "Metodologi sudah baik, lanjutkan ke Bab 4. Perhatikan referensi yang digunakan.",
    status: "Selesai",
  },
  {
    id: 2,
    tanggal: "2025-10-05",
    mahasiswa: "Budi Santoso",
    nim: "2019010101",
    topik: "Revisi Bab 3",
    catatan: "Perlu perbaikan pada bagian metode pengumpulan data. Tambahkan flowchart sistem.",
    status: "Revisi",
  },
  {
    id: 3,
    tanggal: "2025-10-08",
    mahasiswa: "Ahmad Fauzi",
    nim: "2019010103",
    topik: "Review Progress",
    catatan: "Progress Bab 4 sudah mencapai 60%. Perlu dipercepat untuk mencapai target deadline.",
    status: "Progress",
  },
  {
    id: 4,
    tanggal: "2025-10-07",
    mahasiswa: "Eko Prasetyo",
    nim: "2019010105",
    topik: "Konsultasi Metodologi",
    catatan: "Diskusi mengenai pendekatan machine learning yang akan digunakan. Disarankan menggunakan Random Forest.",
    status: "Selesai",
  },
  {
    id: 5,
    tanggal: "2025-10-06",
    mahasiswa: "Siti Rahma",
    nim: "2019010102",
    topik: "Review Bab 2",
    catatan: "Landasan teori perlu ditambah referensi terbaru (2020-2025). Struktur sudah bagus.",
    status: "Revisi",
  },
];

export function CatatanBimbingan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedMahasiswa, setSelectedMahasiswa] = useState("");
  const [topik, setTopik] = useState("");
  const [catatanBaru, setCatatanBaru] = useState("");

  const filteredCatatan = catatanData.filter((catatan) => {
    const matchesSearch =
      catatan.mahasiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      catatan.nim.includes(searchTerm) ||
      catatan.topik.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || catatan.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Catatan berhasil ditambahkan!");
    setSelectedMahasiswa("");
    setTopik("");
    setCatatanBaru("");
  };

  const handleExport = () => {
    alert("Mengexport catatan ke PDF...");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      Selesai: { variant: "default", label: "Selesai" },
      Revisi: { variant: "secondary", label: "Revisi" },
      Progress: { variant: "outline", label: "Progress" },
    };
    const config = variants[status] || variants.Progress;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Catatan Bimbingan</h1>
        <p className="text-gray-600">Kelola dan simpan catatan bimbingan mahasiswa</p>
      </div>

      {/* Add New Note */}
      <Card>
        <CardHeader>
          <CardTitle>Tambah Catatan Manual</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectItem value="4">Eko Prasetyo - 2019010105</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Topik Bimbingan</Label>
                <Input
                  placeholder="Contoh: Pembahasan Bab 3"
                  value={topik}
                  onChange={(e) => setTopik(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Catatan</Label>
              <Textarea
                placeholder="Tulis catatan bimbingan di sini..."
                value={catatanBaru}
                onChange={(e) => setCatatanBaru(e.target.value)}
                rows={4}
              />
            </div>

            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              Simpan Catatan
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notes Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Riwayat Catatan</CardTitle>
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="w-4 h-4 mr-2" />
              Export ke PDF
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cari nama, NIM, atau topik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Revisi">Revisi</SelectItem>
                <SelectItem value="Progress">Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Mahasiswa</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Topik</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCatatan.map((catatan) => (
                <TableRow key={catatan.id}>
                  <TableCell>
                    {new Date(catatan.tanggal).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>{catatan.mahasiswa}</TableCell>
                  <TableCell>{catatan.nim}</TableCell>
                  <TableCell>{catatan.topik}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{catatan.catatan}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(catatan.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCatatan.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada catatan yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
