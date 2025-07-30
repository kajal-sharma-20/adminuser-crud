"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

export default function Update() {
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  // Fetch user data by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getone/${id}`);
      const { fname, lname, email } = response.data;  // exclude password
      setUser({ fname, lname, email, password: "" }); // clear password field
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      }
    };
    if (id) fetchUser();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/update/${id}`, user);
      toast.success("User updated successfully");
      router.push("/signup/adminlogin/user");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-100 tracking-wide">
          Update <span className="text-blue-400">User</span>
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
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaUserEdit /> Update
            </button>
            <button
              type="button"
              className="flex items-center gap-2 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
              onClick={() => router.push("/signup/adminlogin/user")}
            >
              <IoArrowBack /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
