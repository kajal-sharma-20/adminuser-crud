"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaUserShield, FaArrowLeft } from "react-icons/fa";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handlesubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/adminlogin`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.message === "Login successful") {
        toast.success("Admin login successful");
        setTimeout(() => router.push("/signup/adminlogin/user"), 1200);
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-400 tracking-wide">
          Admin Login
        </h2>

        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter admin email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter admin password"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaUserShield /> Login as Admin
            </button>

            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaArrowLeft /> Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
