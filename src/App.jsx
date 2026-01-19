import Sidebar from "./Components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import StudentList from "./Pages/StudentList";
import AddStudent from "./Pages/AddStudent";
import LiveLogs from "./Pages/LiveLogs";
import StudentProfile from "./Pages/StudentProfile";

import { Bell } from "lucide-react";

function App() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Hostel Admin
          </h2>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-400" size={20} />
            <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              W
            </div>
          </div>
        </header>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentProfile />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/logs" element={<LiveLogs />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
