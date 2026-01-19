import React, { useState } from "react";
import { createStudent } from "../Services/api";
import {
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  X,
} from "lucide-react";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    registrationNo: "",
    branch: "",
    batch: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        setStatus({ type: "error", msg: "Only image files allowed" });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setStatus({ type: "error", msg: "Image must be under 2MB" });
        return;
      }
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "loading", msg: "Registering student..." });

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      await createStudent(data);

      setStatus({ type: "success", msg: "Student registered successfully!" });
      setFormData({
        name: "",
        registrationNo: "",
        branch: "",
        batch: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Failed to register student",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 p-6 flex items-center gap-3 text-white">
        <UserPlus size={24} />
        <h2 className="text-xl font-bold">Register New Student</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Status */}
        {status.msg && <StatusBox status={status} />}

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Registration No"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
          />
          <Input
            label="Branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          />
          <Input
            label="Batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="border-2 border-dashed rounded-xl p-6 text-center">
          {!preview ? (
            <>
              <ImageIcon className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload student image (JPG/PNG, max 2MB)
              </p>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
                className="mx-auto block text-sm"
              />
            </>
          ) : (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-xl object-cover border"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFormData((prev) => ({ ...prev, image: null }));
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-bold disabled:bg-blue-300"
        >
          {loading ? "Processing..." : "Register Student"}
        </button>
      </form>
    </div>
  );
};

/* Components */

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      {...props}
      required
      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const StatusBox = ({ status }) => (
  <div
    className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
      status.type === "success"
        ? "bg-green-50 text-green-700 border border-green-200"
        : status.type === "error"
        ? "bg-red-50 text-red-700 border border-red-200"
        : "bg-blue-50 text-blue-700"
    }`}
  >
    {status.type === "success" ? (
      <CheckCircle2 size={18} />
    ) : (
      <AlertCircle size={18} />
    )}
    {status.msg}
  </div>
);

export default AddStudent;
