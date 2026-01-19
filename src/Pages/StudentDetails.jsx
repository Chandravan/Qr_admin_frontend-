import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentDetails, getStudentLogs } from "../Services/api";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [studentRes, logsRes] = await Promise.all([
        getStudentDetails(id),
        getStudentLogs(id),
      ]);

      setStudent(studentRes.data);
      setLogs(logsRes.data);
    };
    fetchData();
  }, [id]);

  if (!student) return <p className="p-10">Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Student Card */}
      <div className="bg-white p-6 rounded-xl shadow border flex gap-6">
        <img
          src={student.imageUrl}
          className="w-28 h-28 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-2xl font-black">{student.name}</h2>
          <p className="text-gray-500">Reg No: {student.registrationNo}</p>
          <p className="text-gray-500">
            {student.branch.toUpperCase()} • {student.batch}
          </p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
              student.status === "IN"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {student.status}
          </span>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-xl shadow border">
        <h3 className="p-4 font-black border-b">Entry / Exit History</h3>
        <table className="w-full">
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-b">
                <td className="p-4 flex items-center gap-2">
                  {log.action === "ENTRY" ? (
                    <ArrowDownLeft className="text-green-600" />
                  ) : (
                    <ArrowUpRight className="text-orange-600" />
                  )}
                  {log.action}
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
