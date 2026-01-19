import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentDetails, getStudentLogs } from "../Services/api";

import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

const StudentProfile = () => {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, logsRes] = await Promise.all([
          getStudentDetails(id),
          getStudentLogs(id),
        ]);

        setStudent(studentRes.data);
        setLogs(logsRes.data);
      } catch (err) {
        console.error("Student profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  if (!student) {
    return (
      <div className="p-10 text-center text-red-500">Student not found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT – Student Info */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-3xl p-8 shadow-sm border text-center">
          {/* Profile Image */}
          <img
            src={student.imageUrl}
            alt={student.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border"
          />

          <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>

          <p className="text-blue-600 font-mono font-bold text-sm mb-6">
            {student.registrationNo}
          </p>

          <div className="space-y-4 text-left border-t pt-6">
            <InfoRow label="Branch">{student.branch.toUpperCase()}</InfoRow>
            <InfoRow label="Batch">{student.batch}</InfoRow>

            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                Current Status
              </p>
              <p
                className={`font-bold ${
                  student.status === "IN" ? "text-green-600" : "text-orange-600"
                }`}
              >
                {student.status === "IN"
                  ? "Currently Inside"
                  : "Currently Outside"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT – Logs Timeline */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-3xl p-8 shadow-sm border min-h-[500px]">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="text-blue-500" size={20} />
            Movement History
          </h3>

          <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
            {logs.length === 0 && (
              <div className="pl-8 text-gray-400 italic">
                No movement records found.
              </div>
            )}

            {logs.map((log) => (
              <TimelineItem key={log._id} log={log} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const InfoRow = ({ label, children }) => (
  <div className="flex items-center gap-3 text-gray-600">
    <span className="text-sm font-medium">
      {label}: {children}
    </span>
  </div>
);

const TimelineItem = ({ log }) => {
  const isEntry = log.action === "ENTRY";

  return (
    <div className="relative pl-8">
      <div
        className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white shadow-sm ${
          isEntry ? "bg-blue-500" : "bg-purple-500"
        }`}
      />

      <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
        <div className="flex items-center gap-3">
          <span
            className={`p-2 rounded-lg ${
              isEntry
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {isEntry ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
          </span>

          <div>
            <p className="font-bold uppercase text-sm">{log.action}</p>
            <p className="text-xs text-gray-400">Gate No. 01</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold text-gray-600">
            {new Date(log.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(log.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
