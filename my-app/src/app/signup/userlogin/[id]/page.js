"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { FaUserCircle, FaSignOutAlt, FaUserEdit } from "react-icons/fa";

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      if (!id) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getone/${id}`);
        if (response.data) {
          setUser(response.data);
        } else {
          setError("User not found");
        }
      } catch (error) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  async function handlelogout() {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userlogout`, { withCredentials: true });
      toast.success("Logged out successfully");
      setTimeout(() => {
        window.location.href = "/signup/loginasuser";
      }, 1000);
    } catch (error) {
      toast.error(" Logout failed");
    }
  }

  if (loading) return <p className="text-center text-gray-300 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="w-full max-w-lg bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl border border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-6xl text-blue-400 mb-3" />
          <h2 className="text-3xl font-bold text-gray-100">User Profile</h2>
        </div>

        <div className="bg-gray-800 rounded-lg p-5 text-gray-200 space-y-3 shadow-md border border-gray-700">
          <p><strong>First Name:</strong> {user.fname}</p>
          <p><strong>Last Name:</strong> {user.lname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> ******</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={() => router.push(`/signup/userlogin/updateuser/${id}`)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-3 px-5 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            <FaUserEdit /> Update Profile
          </button>

          <button
            onClick={handlelogout}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white py-3 px-5 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
