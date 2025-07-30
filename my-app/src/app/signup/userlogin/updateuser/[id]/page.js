"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserEdit, FaTimes } from "react-icons/fa";

export default function Update() {
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getone/${id}`);
        const { fname, lname, email } = response.data; // exclude password
    setUser({ fname, lname, email, password: "" }); // clear password
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(" Failed to load user details");
      }
    };
    if (id) fetchUser();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/update/${id}`, user);
      toast.success("Profile updated successfully");
      router.push(`/signup/userlogin/${id}`);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="w-full max-w-lg bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6 flex items-center justify-center gap-2">
          <FaUserEdit className="text-blue-400" /> Update Profile
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
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
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
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
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
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaUserEdit /> Update
            </button>
            <button
              type="button"
              onClick={() => router.push(`/signup/userlogin/${id}`)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

