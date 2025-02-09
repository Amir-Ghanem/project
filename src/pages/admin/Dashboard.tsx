import { Sidebar } from '../../components/admin/Sidebar';
import { DashboardHeader } from '../../components/admin/DashboardHeader';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 ml-64"> {/* Adjust with margin to avoid overlap */}
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
}