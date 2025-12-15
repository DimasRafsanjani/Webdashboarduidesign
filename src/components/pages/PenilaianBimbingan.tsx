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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { FileUp, Save } from "lucide-react";

const studentsToEvaluate = [
  {
    id: 1,
    nama: "Dewi Lestari",
    nim: "2019010104",
    judul: "Analisis Sentimen Media Sosial Menggunakan NLP",
    status: "Siap Dinilai",
  },
  {
    id: 2,
    nama: "Hana Aulia",
    nim: "2019010108",
    judul: "Dashboard Analytics untuk Business Intelligence",
    status: "Siap Dinilai",
  },
];

export function PenilaianBimbingan() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [kedisiplinan, setKedisiplinan] = useState([75]);
  const [kemajuan, setKemajuan] = useState([80]);
  const [kualitas, setKualitas] = useState([85]);
  const [nilaiAkhir, setNilaiAkhir] = useState("");
  const [catatan, setCatatan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Penilaian berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Penilaian Bimbingan</h1>
        <p className="text-gray-600">Evaluasi dan penilaian mahasiswa bimbingan</p>
      </div>

      {/* Students Ready for Evaluation */}
      <Card>
        <CardHeader>
          <CardTitle>Mahasiswa Siap Dinilai</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Mahasiswa</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsToEvaluate.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.nama}</TableCell>
                  <TableCell>{student.nim}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{student.judul}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{student.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Evaluation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Form Penilaian Bimbingan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Pilih Mahasiswa</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mahasiswa untuk dinilai" />
                </SelectTrigger>
                <SelectContent>
                  {studentsToEvaluate.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.nama} - {student.nim}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Kedisiplinan</Label>
                  <span className="text-blue-600">{kedisiplinan[0]}/100</span>
                </div>
                <Slider
                  value={kedisiplinan}
                  onValueChange={setKedisiplinan}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Penilaian terhadap kehadiran dan ketepatan waktu dalam bimbingan
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Kemajuan Laporan</Label>
                  <span className="text-blue-600">{kemajuan[0]}/100</span>
                </div>
                <Slider
                  value={kemajuan}
                  onValueChange={setKemajuan}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Konsistensi dan kecepatan dalam menyelesaikan target bimbingan
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Kualitas Penulisan</Label>
                  <span className="text-blue-600">{kualitas[0]}/100</span>
                </div>
                <Slider
                  value={kualitas}
                  onValueChange={setKualitas}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Kualitas bahasa, struktur, dan substansi laporan
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nilai Akhir Bimbingan (0-100)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="Masukkan nilai akhir"
                value={nilaiAkhir}
                onChange={(e) => setNilaiAkhir(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Catatan & Komentar</Label>
              <Textarea
                placeholder="Catatan evaluasi dan masukan untuk mahasiswa..."
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Lembar Penilaian (PDF)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <FileUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Klik untuk upload atau drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF (Max. 5MB)</p>
                <Input type="file" accept=".pdf" className="hidden" />
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Simpan Penilaian
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
