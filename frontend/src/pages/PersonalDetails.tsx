// src/pages/PersonalDetails.tsx
import React, { useEffect, useState } from "react";
import api from "../config/axios";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address?: string; // optional
}

const PersonalDetails: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address || "Not Provided"
        });
      } catch (error) {
        console.error("Error fetching personal details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading personal details...</p>;
  if (!user) return <p className="text-center mt-6 text-red-500">No user data found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Personal Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Full Name</p>
          <p className="text-lg text-gray-800">{user.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Email Address</p>
          <p className="text-lg text-gray-800">{user.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Phone Number</p>
          <p className="text-lg text-gray-800">{user.phone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Address</p>
          <p className="text-lg text-gray-800">{user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
