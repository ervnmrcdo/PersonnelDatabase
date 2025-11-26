"use client";

import React from "react";

export default function TeachingProfile() {
  return (
    <div className="flex-1 overflow-auto bg-[#0f1117] text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        </div>

        {/* profile */}
        <div className="bg-[#1b1e2b] rounded-lg p-8 border border-gray-700 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              A
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-white">Amon-Ra St. Brown</h2>
              <p className="text-gray-400">Associate Professor</p>
            </div>
          </div>

          {/* info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-700 pt-6">
            <div>
              <label className="text-sm text-gray-500 uppercase">Full Name</label>
              <p className="text-white font-semibold">Amon-Ra St. Brown</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 uppercase">Email</label>
              <p className="text-white font-semibold">amonra@up.edu.ph</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 uppercase">Role</label>
              <p className="text-white font-semibold">Associate Professor</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 uppercase">Faculty ID</label>
              <p className="text-white font-semibold">B-1523151</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 uppercase">Contact Number</label>
              <p className="text-white font-semibold">09950124352</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 uppercase">Specialization</label>
              <p className="text-white font-semibold">CVIML</p>
            </div>
          </div>
        </div>

        {/* quick actions*/}
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Edit Profile
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}