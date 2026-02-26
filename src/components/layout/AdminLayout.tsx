import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  X,
  Search
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const AdminLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { icon: <BarChart3 size={20} />, label: 'Overview', path: '/admin' },
    { icon: <Users size={20} />, label: 'User Management', path: '/admin/users' },
    { icon: <Package size={20} />, label: 'Products', path: '/admin/products' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">NexGen Admin</span>
          </div>

          <nav className="flex-1 px-4 space-y-1 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${location.pathname === item.path 
                    ? 'bg-indigo-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'}
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search anything..." className="pl-10 bg-slate-50 border-none rounded-full h-10" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">Admin Panel</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <Avatar className="h-9 w-9 border-2 border-indigo-100">
                <AvatarFallback className="bg-indigo-600 text-white">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;