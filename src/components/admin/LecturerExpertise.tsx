import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Search, Plus, Edit, Trash2, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface Expertise {
  id: string;
  keyword: string;
  assignedLecturers: string[];
  usageCount: number;
}

const mockExpertise: Expertise[] = [
  {
    id: "1",
    keyword: "Machine Learning",
    assignedLecturers: ["Dr. Ahmad Fauzi", "Prof. Dr. Siti Rahmah"],
    usageCount: 15,
  },
  {
    id: "2",
    keyword: "UI/UX Design",
    assignedLecturers: ["Dr. Budi Santoso"],
    usageCount: 8,
  },
  {
    id: "3",
    keyword: "Blockchain Technology",
    assignedLecturers: ["Dr. Ahmad Fauzi", "Dr. Dewi Lestari"],
    usageCount: 6,
  },
  {
    id: "4",
    keyword: "Accounting Information System",
    assignedLecturers: ["Prof. Dr. Bambang"],
    usageCount: 12,
  },
  {
    id: "5",
    keyword: "Internet of Things",
    assignedLecturers: ["Dr. Dewi Lestari"],
    usageCount: 10,
  },
  {
    id: "6",
    keyword: "Computer Vision",
    assignedLecturers: ["Dr. Ahmad Fauzi"],
    usageCount: 7,
  },
  {
    id: "7",
    keyword: "Data Mining",
    assignedLecturers: ["Prof. Dr. Siti Rahmah", "Dr. Budi Santoso"],
    usageCount: 9,
  },
  {
    id: "8",
    keyword: "Mobile Application Development",
    assignedLecturers: ["Dr. Budi Santoso", "Dr. Dewi Lestari"],
    usageCount: 14,
  },
];

export function LecturerExpertise() {
  const [expertise, setExpertise] = useState<Expertise[]>(mockExpertise);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise | null>(null);
  const [formData, setFormData] = useState({
    keyword: "",
  });

  const filteredExpertise = expertise.filter((exp) =>
    exp.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExpertise = () => {
    if (!formData.keyword.trim()) {
      toast.error("Validation Error", {
        description: "Keyword cannot be empty",
      });
      return;
    }

    // Check for duplicates
    const exists = expertise.find(
      (exp) => exp.keyword.toLowerCase() === formData.keyword.toLowerCase()
    );

    if (exists) {
      toast.error("Duplicate Keyword", {
        description: "This expertise keyword already exists",
      });
      return;
    }

    const newExpertise: Expertise = {
      id: Date.now().toString(),
      keyword: formData.keyword,
      assignedLecturers: [],
      usageCount: 0,
    };

    setExpertise([...expertise, newExpertise]);
    setIsAddDialogOpen(false);
    toast.success("Expertise Added", {
      description: `${formData.keyword} has been added to the expertise list`,
    });

    setFormData({ keyword: "" });
  };

  const handleEditExpertise = () => {
    if (!selectedExpertise) return;

    setExpertise(
      expertise.map((exp) =>
        exp.id === selectedExpertise.id
          ? { ...exp, keyword: formData.keyword }
          : exp
      )
    );

    setIsEditDialogOpen(false);
    toast.success("Expertise Updated", {
      description: "The expertise keyword has been updated",
    });
    setSelectedExpertise(null);
    setFormData({ keyword: "" });
  };

  const handleDeleteExpertise = (id: string) => {
    setExpertise(expertise.filter((exp) => exp.id !== id));
    toast.success("Expertise Deleted", {
      description: "The expertise keyword has been removed",
    });
  };

  const openEditDialog = (exp: Expertise) => {
    setSelectedExpertise(exp);
    setFormData({ keyword: exp.keyword });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Lecturer Expertise Management</h1>
          <p className="text-gray-500 mt-2">
            Manage expertise keywords for automatic thesis proposal matching
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Expertise
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Expertise Keyword</DialogTitle>
              <DialogDescription>
                Create a new expertise keyword for lecturer matching
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Keyword</Label>
                <Input
                  placeholder="e.g., Machine Learning, UI/UX Design"
                  value={formData.keyword}
                  onChange={(e) =>
                    setFormData({ ...formData, keyword: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  This keyword will be used to match thesis proposals with lecturers
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExpertise}>Add Keyword</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Expertise Keyword</DialogTitle>
              <DialogDescription>
                Update the expertise keyword
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Keyword</Label>
                <Input
                  placeholder="e.g., Machine Learning, UI/UX Design"
                  value={formData.keyword}
                  onChange={(e) =>
                    setFormData({ ...formData, keyword: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditExpertise}>Update Keyword</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Keywords</p>
                <h2 className="mt-2">{expertise.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Assignments</p>
                <h2 className="mt-2">
                  {expertise.reduce((sum, exp) => sum + exp.assignedLecturers.length, 0)}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Usage</p>
                <h2 className="mt-2">
                  {expertise.reduce((sum, exp) => sum + exp.usageCount, 0)}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Expertise Keywords</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Assigned Lecturers</TableHead>
                <TableHead className="text-center">Usage Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpertise.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50">
                        {exp.keyword}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {exp.assignedLecturers.length > 0 ? (
                        exp.assignedLecturers.map((lecturer, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {lecturer}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">No lecturers assigned</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge>{exp.usageCount}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(exp)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteExpertise(exp.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
