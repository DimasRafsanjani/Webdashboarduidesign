import React, { useState } from 'react';
import { LecturerLayout } from './components/lecturer/LecturerLayout';
import { LecturerDashboard } from './components/lecturer/LecturerDashboard';
import { SupervisionSchedule } from './components/lecturer/SupervisionSchedule';
import { SemproEvaluation } from './components/lecturer/SemproEvaluation';
import { FinalDefenseEvaluation } from './components/lecturer/FinalDefenseEvaluation';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <LecturerDashboard />;
      case 'supervision':
        return <SupervisionSchedule />;
      case 'sempro':
        return <SemproEvaluation />;
      case 'final-defense':
        return <FinalDefenseEvaluation />;
      default:
        return <LecturerDashboard />;
    }
  };

  return (
    <LecturerLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </LecturerLayout>
  );
}
