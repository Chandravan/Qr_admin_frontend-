import { useState } from "react";
import { Link } from "react-router-dom";

import { registerUser } from "../Services/api";

export const SignUp = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setuser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(user);
      if (response.status == 200 || response.status == 201) {
        alert("registration Succesfull!");
        setuser({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.log("error in registration", error);
      alert(error.response?.data?.message || "Registration faild");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className=" max-w-150 w-full bg-gray-800 p-10 flex flex-col items-center border border-gray-700   "
      >
        <h2 className="text-3xl font-bold text-white mb-8">Create Account </h2>
        {/*name inpute */}
        <div className="w-full mb-4">
          <label className="block text-gray-400 mb-2">Full name </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInput}
            placeholder="Enter name "
            className="w-full border p-2 border-gray-600 bg-gray-700 text-white focus:-outline-none focus:ring-2 focus:ring-red-500 transition-all rounded"
          />
        </div>
        {/* Email */}
        <div className="w-full mb-4">
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInput}
            placeholder="Enter email "
            className="w-full border p-2 border-gray-600 bg-gray-700 text-white focus:-outline-none focus:ring-2 focus:ring-red-500 transition-all rounded"
          />
        </div>
        {/*password */}
        <div className="w-full mb-4">
          <label className="block text-gray-400 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            placeholder="Enter password "
            className="w-full border p-2 border-gray-600 bg-gray-700 text-white focus:-outline-none focus:ring-2 focus:ring-red-500 transition-all rounded"
          />
        </div>
        {/*term and condition */}
        <div className="w-full flex items-center mb-6 text-sm ">
          <input type="checkbox" className="mr-2 accent-red-500  h-4 w-4" />
          <span>I aggre to Terms and conditions</span>
        </div>
        {/*submit button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font bold rounded p-2 mb-6  shadow-lg"
        >
          Sign Up
        </button>
        {/*Login Link */}
        <div className="text-gray-400 text-sm">
          Already have account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};
