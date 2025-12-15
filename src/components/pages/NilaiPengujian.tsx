import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Save, Edit } from "lucide-react";

interface StudentGrade {
  id: number;
  nama: string;
  nim: string;
  nilaiPenguji1: number;
  nilaiPenguji2: number;
  statusAkhir: "lulus" | "revisi" | "tidak-lulus";
  editable: boolean;
}

const initialGradesData: StudentGrade[] = [
  {
    id: 1,
    nama: "Dewi Lestari",
    nim: "2019010104",
    nilaiPenguji1: 85,
    nilaiPenguji2: 82,
    statusAkhir: "lulus",
    editable: false,
  },
  {
    id: 2,
    nama: "Hana Aulia",
    nim: "2019010108",
    nilaiPenguji1: 78,
    nilaiPenguji2: 80,
    statusAkhir: "lulus",
    editable: false,
  },
  {
    id: 3,
    nama: "Rifki Ananda",
    nim: "2019010109",
    nilaiPenguji1: 70,
    nilaiPenguji2: 68,
    statusAkhir: "revisi",
    editable: false,
  },
  {
    id: 4,
    nama: "Maya Sari",
    nim: "2019010110",
    nilaiPenguji1: 88,
    nilaiPenguji2: 90,
    statusAkhir: "lulus",
    editable: false,
  },
  {
    id: 5,
    nama: "Farhan Hidayat",
    nim: "2019010111",
    nilaiPenguji1: 92,
    nilaiPenguji2: 89,
    statusAkhir: "lulus",
    editable: false,
  },
];

export function NilaiPengujian() {
  const [gradesData, setGradesData] = useState<StudentGrade[]>(initialGradesData);

  const toggleEdit = (id: number) => {
    setGradesData((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, editable: !student.editable } : student
      )
    );
  };

  const updateGrade = (
    id: number,
    field: "nilaiPenguji1" | "nilaiPenguji2" | "statusAkhir",
    value: any
  ) => {
    setGradesData((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const calculateAverage = (nilai1: number, nilai2: number) => {
    return ((nilai1 + nilai2) / 2).toFixed(1);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; color: string }> = {
      lulus: { variant: "default", label: "Lulus", color: "bg-green-100 text-green-800" },
      revisi: { variant: "secondary", label: "Revisi", color: "bg-yellow-100 text-yellow-800" },
      "tidak-lulus": { variant: "destructive", label: "Tidak Lulus", color: "bg-red-100 text-red-800" },
    };
    const config = variants[status] || variants.lulus;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleSave = () => {
    setGradesData((prev) =>
      prev.map((student) => ({ ...student, editable: false }))
    );
    alert("Perubahan nilai berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Input Nilai Pengujian</h1>
        <p className="text-gray-600">Kelola dan input nilai hasil ujian sidang</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tabel Nilai Mahasiswa</CardTitle>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Simpan Semua Perubahan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Mahasiswa</TableHead>
                  <TableHead>NIM</TableHead>
                  <TableHead className="text-center">Nilai Penguji 1</TableHead>
                  <TableHead className="text-center">Nilai Penguji 2</TableHead>
                  <TableHead className="text-center">Rata-rata</TableHead>
                  <TableHead className="text-center">Status Akhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradesData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.nama}</TableCell>
                    <TableCell>{student.nim}</TableCell>
                    <TableCell className="text-center">
                      {student.editable ? (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={student.nilaiPenguji1}
                          onChange={(e) =>
                            updateGrade(
                              student.id,
                              "nilaiPenguji1",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 mx-auto text-center"
                        />
                      ) : (
                        <span className="text-gray-900">{student.nilaiPenguji1}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.editable ? (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={student.nilaiPenguji2}
                          onChange={(e) =>
                            updateGrade(
                              student.id,
                              "nilaiPenguji2",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 mx-auto text-center"
                        />
                      ) : (
                        <span className="text-gray-900">{student.nilaiPenguji2}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-blue-600">
                        {calculateAverage(student.nilaiPenguji1, student.nilaiPenguji2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {student.editable ? (
                        <Select
                          value={student.statusAkhir}
                          onValueChange={(value) =>
                            updateGrade(student.id, "statusAkhir", value)
                          }
                        >
                          <SelectTrigger className="w-32 mx-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lulus">Lulus</SelectItem>
                            <SelectItem value="revisi">Revisi</SelectItem>
                            <SelectItem value="tidak-lulus">Tidak Lulus</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        getStatusBadge(student.statusAkhir)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEdit(student.id)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {student.editable ? "Batal" : "Edit"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <p className="text-sm text-green-700">Total Lulus</p>
                <p className="text-2xl text-green-900 mt-1">
                  {gradesData.filter((s) => s.statusAkhir === "lulus").length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-6">
                <p className="text-sm text-yellow-700">Total Revisi</p>
                <p className="text-2xl text-yellow-900 mt-1">
                  {gradesData.filter((s) => s.statusAkhir === "revisi").length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">Rata-rata Nilai</p>
                <p className="text-2xl text-blue-900 mt-1">
                  {(
                    gradesData.reduce(
                      (acc, s) => acc + (s.nilaiPenguji1 + s.nilaiPenguji2) / 2,
                      0
                    ) / gradesData.length
                  ).toFixed(1)}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
