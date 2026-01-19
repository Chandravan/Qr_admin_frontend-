import React, { useState, useEffect } from "react";
import { getAllStudents } from "../Services/api";
import { Search, UserCheck, UserX, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents({
        page,
        limit,
        search: searchTerm,
        branch: branchFilter,
        batch: batchFilter,
      });

      setStudents(res.data.students || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [searchTerm, branchFilter, batchFilter, page]);

  const uniqueBranches = [...new Set(students.map((s) => s.branch))];
  const uniqueBatches = [...new Set(students.map((s) => s.batch))];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border">
        <div className="flex items-center gap-2 w-full max-w-md">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or reg no"
            className="w-full py-2 outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          className="border p-2 rounded-lg"
          value={branchFilter}
          onChange={(e) => {
            setBranchFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Branches</option>
          {uniqueBranches.map((b) => (
            <option key={b} value={b}>
              {b.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded-lg"
          value={batchFilter}
          onChange={(e) => {
            setBatchFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Batches</option>
          {uniqueBatches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <div className="text-sm text-gray-500 font-semibold ml-auto">
          Page {page} / {totalPages}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="animate-spin text-blue-600" size={36} />
          </div>
        ) : students.length === 0 ? (
          <div className="p-20 text-center text-gray-400">
            No students found
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <Th>Student</Th>
                <Th>Reg No</Th>
                <Th>Branch</Th>
                <Th>Batch</Th>
                <Th>Activity</Th>
                <Th>Last Scan</Th>
                <Th></Th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {students.map((student) => (
                <tr
                  key={student._id}
                  onClick={() => navigate(`/students/${student._id}`)}
                  className="hover:bg-blue-50 cursor-pointer transition"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={student.imageUrl}
                      alt={student.name}
                      className="w-10 h-10 rounded-full border"
                    />
                    <span className="font-semibold">{student.name}</span>
                  </td>

                  <td className="px-6 py-4 font-mono text-sm">
                    {student.registrationNo}
                  </td>

                  <td className="px-6 py-4">{student.branch.toUpperCase()}</td>

                  <td className="px-6 py-4">{student.batch}</td>

                  <td className="px-6 py-4">
                    {student.status === "IN" ? (
                      <Badge green icon={<UserCheck size={14} />} text="IN" />
                    ) : (
                      <Badge orange icon={<UserX size={14} />} text="OUT" />
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.updatedAt
                      ? new Date(student.updatedAt).toLocaleString()
                      : "--"}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    <ArrowRight size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* Helpers */

const Th = ({ children }) => (
  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
    {children}
  </th>
);

const Badge = ({ green, orange, icon, text }) => {
  const style = green
    ? "bg-green-100 text-green-700"
    : "bg-orange-100 text-orange-700";

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${style}`}
    >
      {icon}
      {text}
    </span>
  );
};

export default StudentList;
