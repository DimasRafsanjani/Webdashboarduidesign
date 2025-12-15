import { Home, Users, Calendar, ClipboardList, FileText, CheckSquare, UserCheck, BarChart3 } from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard Utama", icon: Home, section: null },
    { id: "divider-1", label: "Role: Pembimbing", icon: null, section: "header" },
    { id: "mahasiswa-bimbingan", label: "Mahasiswa Bimbingan", icon: Users, section: "pembimbing" },
    { id: "penjadwalan", label: "Penjadwalan Bimbingan", icon: Calendar, section: "pembimbing" },
    { id: "penilaian-bimbingan", label: "Penilaian Bimbingan", icon: ClipboardList, section: "pembimbing" },
    { id: "catatan-bimbingan", label: "Catatan Bimbingan", icon: FileText, section: "pembimbing" },
    { id: "divider-2", label: "Role: Penguji", icon: null, section: "header" },
    { id: "select-mahasiswa", label: "Mahasiswa Ujian", icon: UserCheck, section: "penguji" },
    { id: "penilaian-penguji", label: "Penilaian Penguji", icon: CheckSquare, section: "penguji" },
    { id: "nilai-pengujian", label: "Input Nilai", icon: BarChart3, section: "penguji" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-blue-600">Sistem Informasi TA</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          if (item.section === "header") {
            return (
              <div key={item.id} className="mt-6 mb-2 px-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</p>
              </div>
            );
          }

          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
