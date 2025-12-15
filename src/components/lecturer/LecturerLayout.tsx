import React, { useState } from 'react';
import { Bell, Search, User, Calendar, FileText, ClipboardCheck, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

interface LecturerLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export function LecturerLayout({ children, activePage, onNavigate }: LecturerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(3);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'supervision', label: 'Supervision Schedule', icon: Calendar },
    { id: 'sempro', label: 'Sempro Evaluation', icon: FileText },
    { id: 'final-defense', label: 'Final Defense Evaluation', icon: ClipboardCheck },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-primary">SI Tugas Akhir</h1>
          <p className="text-sm text-muted-foreground mt-1">Lecturer Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-accent rounded-lg p-4">
            <p className="text-sm text-accent-foreground">Dr. Ahmad Wijaya</p>
            <p className="text-xs text-muted-foreground mt-1">NIP: 198501012010121001</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students, thesis titles..."
                  className="pl-10 bg-input-background border-gray-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <h3 className="text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <DropdownMenuItem className="p-4 flex flex-col items-start gap-1">
                      <p className="text-sm">Supervision session scheduled</p>
                      <p className="text-xs text-muted-foreground">
                        Meeting with Budi Santoso on Dec 15, 2025 at 10:00 AM
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-4 flex flex-col items-start gap-1">
                      <p className="text-sm">Sempro evaluation due</p>
                      <p className="text-xs text-muted-foreground">
                        Evaluate proposal for Sarah Rahman by Dec 14, 2025
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-4 flex flex-col items-start gap-1">
                      <p className="text-sm">Final defense scheduled</p>
                      <p className="text-xs text-muted-foreground">
                        Defense session on Dec 16, 2025 at 2:00 PM
                      </p>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-3 border-b">
                    <p className="text-sm">Dr. Ahmad Wijaya</p>
                    <p className="text-xs text-muted-foreground">ahmad.wijaya@university.ac.id</p>
                  </div>
                  <DropdownMenuItem className="gap-2">
                    <User className="w-4 h-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
