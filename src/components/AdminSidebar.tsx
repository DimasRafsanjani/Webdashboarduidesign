import { Home, Users, GraduationCap, FileText, Calendar, ClipboardCheck, Award, Archive, UserCog, Bell, Settings, ChevronRight, BookOpen, Clock, BarChart3, CheckSquare, CalendarCheck } from "lucide-react";
import { cn } from "./ui/utils";

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  children?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  {
    id: "validation",
    label: "Title Validation",
    icon: CheckSquare,
  },
  {
    id: "calendar",
    label: "Academic Calendar",
    icon: Calendar,
    children: [
      { id: "manage-calendar", label: "Manage Events" },
      { id: "semester-schedule", label: "Semester Schedule" },
    ],
  },
  {
    id: "scheduling",
    label: "Defense Scheduling",
    icon: CalendarCheck,
    children: [
      { id: "sempro-schedule", label: "Sempro Schedule" },
      { id: "final-defense-schedule", label: "Final Defense Schedule" },
    ],
  },
  {
    id: "students",
    label: "Student Management",
    icon: Users,
    children: [
      { id: "student-list", label: "Student List" },
      { id: "add-student", label: "Add New Student" },
      { id: "import-export", label: "Import/Export Data" },
    ],
  },
  {
    id: "lecturers",
    label: "Lecturer Management",
    icon: GraduationCap,
    children: [
      { id: "lecturer-list", label: "Lecturer List" },
      { id: "lecturer-expertise", label: "Lecturer Expertise" },
      { id: "assign-lecturer", label: "Assign Lecturer" },
      { id: "schedule-sync", label: "Schedule Synchronization" },
    ],
  },
  {
    id: "titles",
    label: "Title Submissions",
    icon: FileText,
    children: [
      { id: "submission-list", label: "Submission List" },
      { id: "validate-title", label: "Validate Title" },
      { id: "submission-history", label: "Submission History" },
    ],
  },
  {
    id: "thesis",
    label: "Thesis Lifecycle",
    icon: BarChart3,
    children: [
      { id: "thesis-progress", label: "Progress Tracking" },
      { id: "supervision-schedule", label: "Supervision Schedule" },
      { id: "supervision-recap", label: "Supervision Recap" },
    ],
  },
  {
    id: "defense",
    label: "Thesis Defense",
    icon: ClipboardCheck,
    children: [
      { id: "defense-registration", label: "Defense Registration" },
      { id: "defense-schedule", label: "Schedule Management" },
      { id: "defense-result", label: "Defense Results" },
      { id: "revision-validation", label: "Revision Validation" },
    ],
  },
  {
    id: "grades",
    label: "Evaluation & Grades",
    icon: Award,
    children: [
      { id: "supervision-grades", label: "Supervision Grades" },
      { id: "examiner-grades", label: "Examiner Grades" },
      { id: "final-grades", label: "Final Grade Recap" },
    ],
  },
  {
    id: "archive",
    label: "Archive & Documents",
    icon: Archive,
    children: [
      { id: "thesis-archive", label: "Thesis Archive" },
      { id: "document-management", label: "Document Management" },
    ],
  },
  {
    id: "accounts",
    label: "Account Management",
    icon: UserCog,
    children: [
      { id: "user-accounts", label: "User Accounts" },
      { id: "reset-password", label: "Reset Password" },
      { id: "role-management", label: "Role Management" },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    children: [
      { id: "activity-log", label: "Activity Log" },
      { id: "broadcast", label: "Broadcast Announcement" },
    ],
  },
  { id: "profile", label: "Admin Profile", icon: Settings },
];

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-blue-600">Sistem Informasi TA</h1>
        <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
      </div>

      <nav className="p-4">
        {navItems.map((item) => (
          <div key={item.id} className="mb-2">
            {item.children ? (
              <details className="group" open={item.children.some((child) => child.id === currentPage)}>
                <summary className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="flex-1 text-gray-700">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => onNavigate(child.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        currentPage === child.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              </details>
            ) : (
              <button
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  currentPage === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}