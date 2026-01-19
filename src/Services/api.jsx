import axios from "axios";

const API = axios.create({
  baseURL: "https://qr-node-backend.onrender.com/api",
  withCredentials: true,
});

export const createStudent = (formData) => {
  return API.post("/admin/students/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDashboardStats = () => {
  return API.get("admin/getDashboardStats");
};

export const getAllStudents = ({ page, limit, search, branch, batch }) => {
  return API.get("/admin/students", {
    params: { page, limit, search, branch, batch },
  });
};

export const getLiveLogs = () => {
  return API.get("admin/getLiveLogs");
};

export const getStudentDetails = (id) => API.get(`/admin/students/${id}`);

export const getStudentLogs = (id) => API.get(`/admin/students/${id}/logs`);

export const registerUser = (userData) => {
  API.post("/auth/registration", userData);
};

export const checkAuth = () => {
  return API.get("/auth/me");
};

export const logout = () => {
  return API.get("/auth/logout");
};

export const login = (userData) => {
  return API.post("/auth/login", userData);
};
