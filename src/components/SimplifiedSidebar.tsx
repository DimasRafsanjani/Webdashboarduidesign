import { useState } from "react";
import { Home, CheckSquare, Calendar, ClipboardCheck } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SimplifiedSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "title-validation", label: "Title Validation", icon: CheckSquare },
  { id: "sempro-scheduling", label: "Sempro Scheduling", icon: Calendar },
  { id: "defense-scheduling", label: "Defense Scheduling", icon: ClipboardCheck },
];

export function SimplifiedSidebar({ currentPage, onNavigate }: SimplifiedSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xl">SI</span>
          </div>
          <div>
            <h1 className="text-lg">Sistem Informasi TA</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Admin Dashboard v1.0</p>
          <p className="mt-1">© 2024 University</p>
        </div>
      </div>
    </aside>
  );
}
