"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserPlus, FaSignInAlt, FaUserShield } from "react-icons/fa";

export default function Signup() {
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, user, { withCredentials: true });
      console.log(response);

      toast.success(" User added successfully");
      setUser({ fname: "", lname: "", email: "", password: "" });

      setTimeout(() => router.push("/signup/loginasuser"), 1200);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400 && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-auto bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">First Name</label>
            <input
              type="text"
              name="fname"
              value={user.fname}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Last Name</label>
            <input
              type="text"
              name="lname"
              value={user.lname}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* BEAUTIFUL BUTTONS */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaUserPlus /> Sign Up
            </button>

            <button
              type="button"
              onClick={() => router.push("/signup/loginasuser")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaSignInAlt /> Login As User
            </button>

            <button
              type="button"
              onClick={() => router.push("/signup/loginasadmin")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaUserShield /> Login As Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
