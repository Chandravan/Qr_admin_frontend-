import { Link, Navigate, useNavigate } from "react-router-dom";
import { login as loginApi } from "../Services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/authContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleInpute = (e) => {
    const { name, value } = e.target;
    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(user);
      console.log("Response Data:", response.data);
      if (response.status === 201) {
        login(response.data);
        alert("login succesfull");
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "login failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-500 flex flex-col justify-center items-center p-4">
      <div className="p-6 bg-gray-600 rounded-lg ">
        <span className="  text-xl font-bold text-center mb-4 flex justify-center ">
          login here
        </span>
        <form className="space-y-4  " onSubmit={handleSubmit}>
          <div className=" ">
            <label className="block">email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInpute}
              placeholder="Email"
              className="bg-gray-200 rounded w-full border p-2"
            />
          </div>
          <div>
            <label className="block">Password</label>
            <input
              type="text"
              name="password"
              value={user.password}
              onChange={handleInpute}
              placeholder="password"
              className="bg-gray-200 rounded w-full border p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded p-2"
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?
          <Link to="/signup" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
