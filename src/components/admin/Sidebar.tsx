import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Briefcase, 
  FileText, 
  Settings,
  Building2
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Home, label: 'Home Sections', path: '/admin/home' },
  { icon: Users, label: 'About Page', path: '/admin/about' },
  { icon: Briefcase, label: 'Services', path: '/admin/services' },
  { icon: Building2, label: 'Projects', path: '/admin/projects' },
  { icon: FileText, label: 'Blog Posts', path: '/admin/blog' },
  { icon: Settings, label: 'Careers', path: '/admin/careers' },
  
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-16">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}