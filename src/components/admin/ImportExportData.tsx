import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Upload, Download, FileSpreadsheet, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

const importHistory = [
  {
    id: "1",
    filename: "students_batch_2024.xlsx",
    date: "2024-05-10 14:30",
    records: 45,
    status: "success",
    user: "Admin User",
  },
  {
    id: "2",
    filename: "lecturers_update.xlsx",
    date: "2024-05-08 09:15",
    records: 12,
    status: "success",
    user: "Admin User",
  },
  {
    id: "3",
    filename: "students_batch_2023.xlsx",
    date: "2024-05-05 16:45",
    records: 38,
    status: "failed",
    user: "Admin User",
  },
  {
    id: "4",
    filename: "thesis_titles.xlsx",
    date: "2024-05-03 11:20",
    records: 28,
    status: "partial",
    user: "Admin User",
  },
];

export function ImportExportData() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Import / Export Data</h1>
        <p className="text-gray-500 mt-2">Bulk upload and download student and lecturer data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import Section */}
        <Card>
          <CardHeader>
            <CardTitle>Import Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please download the template file first to ensure correct format
              </AlertDescription>
            </Alert>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="mb-2">Upload Excel File</h3>
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <p className="text-xs text-gray-400 mt-4">Supported formats: .xlsx, .xls (Max 5MB)</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm">Download Templates</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-start">
                  <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                  Student Data Template
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                  Lecturer Data Template
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                  Thesis Title Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Section */}
        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm">Export Student Data</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-between">
                  <span className="flex items-center">
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    All Students (Excel)
                  </span>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="justify-between">
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-red-600" />
                    All Students (PDF)
                  </span>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="justify-between">
                  <span className="flex items-center">
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    Active Students Only (Excel)
                  </span>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm">Export Lecturer Data</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-between">
                  <span className="flex items-center">
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    All Lecturers (Excel)
                  </span>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="justify-between">
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-red-600" />
                    All Lecturers (PDF)
                  </span>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm">Export Thesis Data</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-between">
                  <span className="flex items-center">
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    Thesis Titles (Excel)
                  </span>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="justify-between">
                  <span className="flex items-center">
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    Final Grades (Excel)
                  </span>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Import History */}
      <Card>
        <CardHeader>
          <CardTitle>Import History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {importHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {item.status === "success" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {item.status === "failed" && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  {item.status === "partial" && (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="text-sm">{item.filename}</p>
                    <p className="text-xs text-gray-500">
                      {item.date} • {item.records} records • by {item.user}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === "success" && (
                    <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Success
                    </span>
                  )}
                  {item.status === "failed" && (
                    <span className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      Failed
                    </span>
                  )}
                  {item.status === "partial" && (
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                      Partial
                    </span>
                  )}
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
