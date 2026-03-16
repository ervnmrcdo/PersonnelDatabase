"use client";

import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <AdminSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <AdminDashboard />
      </main>
    </div>
  );
}
