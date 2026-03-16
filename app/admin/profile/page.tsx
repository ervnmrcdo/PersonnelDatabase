"use client";

import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import AdminProfile from "@/components/Profile/AdminProfile";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <AdminSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <AdminProfile />
      </main>
    </div>
  );
}
