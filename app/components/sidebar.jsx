import Link from "next/link";
import { Book, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import LogoutButton from "../dashboard/logoutsuccess";

const Sidebar = ({ handleLogout }) => (
  <div className="p-5">
    <h1 className="text-xl font-bold mb-6">HerLingua</h1>
    <nav className="mt-8 space-y-6">
      {/* Main Section */}
      <div>
        <p className="text-purple-300 text-xs uppercase tracking-wider mb-3">Main</p>
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
      </div>
      
      {/* Learning Section */}
      <div>
        <p className="text-purple-300 text-xs uppercase tracking-wider mb-3">Learning</p>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/lessons" 
              className="flex items-center gap-3 py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors"
            >
              <Book className="h-5 w-5" />
              <span>Lessons</span>
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Account Section */}
      <div>
        <p className="text-purple-300 text-xs uppercase tracking-wider mb-3">Account</p>
        <ul className="space-y-2">
          <li>
            <Link 
              href="#" 
              className="flex items-center gap-3 py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link 
              href="#" 
              className="flex items-center gap-3 py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </li>
          <li className="w-full">
  <LogoutButton 
    onClick={handleLogout}
    className="py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors text-left"
  />
</li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Sidebar;