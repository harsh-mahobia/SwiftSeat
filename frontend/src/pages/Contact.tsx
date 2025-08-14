// src/pages/Contact.tsx
import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Section */}
      <div className="bg-blue-600 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg">
          We’re here to help! Reach out to our support team anytime.
        </p>
      </div>

      {/* Contact Details */}
      <div className="max-w-4xl mx-auto mt-10 px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Get in Touch
        </h2>
        <p className="mb-2">
          📧 Email:{" "}
          <a
            href="mailto:support@swiftseat.com"
            className="text-blue-600 underline"
          >
            support@swiftseat.com
          </a>
        </p>
        <p className="mb-2">📞 Customer Support: +91 9XX65 43210</p>
        <p className="mb-2">📞 Sales Inquiry: +91 9XX54 56789</p>
      </div>

      {/* Ratings Section */}
      <div className="max-w-4xl mx-auto mt-12 px-6 pb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Our Customer Service Ratings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-5xl font-bold text-yellow-400">⭐ 4.8</p>
            <p className="mt-2 text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-5xl font-bold text-green-500">98%</p>
            <p className="mt-2 text-gray-600">Satisfaction Rate</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-5xl font-bold text-blue-500">24x7</p>
            <p className="mt-2 text-gray-600">Support Availability</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
