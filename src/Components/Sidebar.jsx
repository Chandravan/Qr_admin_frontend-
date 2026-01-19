import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, Activity } from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Students",
    path: "/students",
    icon: <Users size={18} />,
  },
  {
    name: "Add Student",
    path: "/add-student",
    icon: <UserPlus size={18} />,
  },
  {
    name: "Live Logs",
    path: "/logs",
    icon: <Activity size={18} />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-lg font-bold text-blue-600 tracking-wide">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition
               ${
                 isActive
                   ? "bg-blue-100 text-blue-700"
                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
               }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Hostel System
      </div>
    </aside>
  );
};

export default Sidebar;
