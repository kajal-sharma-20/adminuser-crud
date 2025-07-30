"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEdit, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getall`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users");
      }
    };
    fetchdata();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(" User deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  async function handleLogout() {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/adminlogout`, {
        withCredentials: true,
      });
      toast.info("Logged out successfully");
      window.location.href = "/signup/loginasadmin";
    } catch (error) {
      console.log("Logout error:", error);
      toast.error("Logout failed");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6 tracking-wide">
          Admin Dashboard - <span className="text-blue-400">Users List</span>
        </h1>

        {/* Top Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Log Out
          </button>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            onClick={() => router.push("/signup/adminlogin/adduser")}
          >
            <FaUserPlus /> Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-300">
                <th className="border border-gray-600 p-3">S.No.</th>
                <th className="border border-gray-600 p-3">Name</th>
                <th className="border border-gray-600 p-3">Email</th>
                <th className="border border-gray-600 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-700 transition duration-300"
                >
                  <td className="border border-gray-700 p-3 text-center">{index + 1}</td>
                  <td className="border border-gray-700 p-3">{`${user.fname} ${user.lname}`}</td>
                  <td className="border border-gray-700 p-3">{user.email}</td>
                  <td className="border border-gray-700 p-3 flex gap-3 justify-center">
                    <button
                      className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow-md transition transform hover:scale-105"
                      onClick={() => router.push(`/signup/adminlogin/update/${user._id}`)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md transition transform hover:scale-105"
                      onClick={() => deleteUser(user._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
