import { useState } from "react";
import { SimplifiedSidebar } from "./components/SimplifiedSidebar";
import { SimplifiedTopBar } from "./components/SimplifiedTopBar";
import { SimplifiedDashboard } from "./components/admin/SimplifiedDashboard";
import { TitleValidationEnhanced } from "./components/admin/TitleValidationEnhanced";
import { SemproSchedulingEnhanced } from "./components/admin/SemproSchedulingEnhanced";
import { DefenseSchedulingEnhanced } from "./components/admin/DefenseSchedulingEnhanced";
import { Toaster } from "./components/ui/sonner";

function AppSimplified() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <SimplifiedDashboard />;
      case "title-validation":
        return <TitleValidationEnhanced />;
      case "sempro-scheduling":
        return <SemproSchedulingEnhanced />;
      case "defense-scheduling":
        return <DefenseSchedulingEnhanced />;
      default:
        return <SimplifiedDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimplifiedSidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <SimplifiedTopBar />
      
      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>

      <Toaster />
    </div>
  );
}

export default AppSimplified;