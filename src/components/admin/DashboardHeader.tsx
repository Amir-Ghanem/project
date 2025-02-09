import { Bell, Settings, User } from 'lucide-react';
import { Logo } from '../Logo';

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}