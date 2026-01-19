import React, { useState, useEffect } from "react";
import { getLiveLogs } from "../Services/api";
import {
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  User,
} from "lucide-react";

const LiveLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isSyncing, setIsSyncing] = useState(true);

  // Fetch logs function
  const fetchLogs = async () => {
    try {
      const res = await getLiveLogs();
      setLogs(res.data);
    } catch (err) {
      console.error("Live log error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Activity className="text-green-500" size={32} />
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800 tracking-tight">
              LIVE SCAN LOGS
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Monitoring real-time hostel traffic
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            System Status
          </p>
          <p className="text-sm font-bold text-green-600">ONLINE & SYNCING</p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <Th>Student</Th>
              <Th>Activity</Th>
              <Th>Time</Th>
              <Th>Gate Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr
                key={log._id}
                className="hover:bg-blue-50/30 transition-all group"
              >
                {/* Student Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">
                        {log.studentName}
                      </p>
                      <p className="text-xs font-mono text-gray-400">
                        {log.rollNo}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Activity Column */}
                <td className="px-6 py-4">
                  <ActivityBadge type={log.type} />
                </td>

                {/* Time Column */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span className="text-sm font-semibold">
                        {new Date(log.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </td>

                {/* Gate Status */}
                <td className="px-6 py-4">
                  <GateStatus isLate={log.isLate} type={log.type} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && !isSyncing && (
          <div className="p-20 text-center">
            <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
              <Activity className="text-gray-200" size={40} />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              Waiting for scans...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* Table Header */
const Th = ({ children }) => (
  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

/* Activity Badge */
const ActivityBadge = ({ type }) => {
  const isEntry = type === "ENTRY";
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${
        isEntry
          ? "bg-green-50 text-green-800 border border-green-100 hover:bg-green-100"
          : "bg-orange-50 text-orange-800 border border-orange-100 hover:bg-orange-100"
      }`}
    >
      {isEntry ? (
        <ArrowDownLeft size={14} className="text-green-600" />
      ) : (
        <ArrowUpRight size={14} className="text-orange-600" />
      )}
      <span className="uppercase">{isEntry ? "ENTRY" : "EXIT"}</span>
    </span>
  );
};

/* Gate Status Badge */
const GateStatus = ({ isLate, type }) => {
  const isEntry = type === "ENTRY";
  return (
    <span
      className={`text-[10px] font-black px-2 py-0.5 rounded shadow-sm ${
        isLate
          ? "bg-red-500 text-white"
          : isEntry
          ? "bg-blue-700 text-white"
          : "bg-gray-700 text-white"
      }`}
    >
      {isLate ? "LATE ENTRY" : isEntry ? "IN" : "OUT"}
    </span>
  );
};

export default LiveLogs;
