import React from "react";

const PersonalDetails: React.FC = () => {
  const user = {
    name: "Harsh M",
    email: "harsh@example.com",
    phone: "+91 9876543210",
    address: "Bhopal, Madhya Pradesh, India",
  };

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
