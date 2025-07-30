"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

export default function AddUser() {
  const router = useRouter();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, user);
      toast.success("User added successfully");
      setUser({ fname: "", lname: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400 && error.response.data?.message)  {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-100 tracking-wide">
          Add <span className="text-blue-400">User</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">First Name</label>
            <input
              type="text"
              name="fname"
              value={user.fname}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Last Name</label>
            <input
              type="text"
              name="lname"
              value={user.lname}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaUserPlus /> Add User
            </button>
            <button
              type="button"
              className="flex items-center gap-2 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
              onClick={() => router.push("/signup/adminlogin/user")}
            >
              <IoArrowBack /> Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
