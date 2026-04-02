"use client";

import AdminSidebar from "@/components/Sidebar/AdminSidebar";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <AdminSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-white">Crawler</h1>
        </div>
      </main>
    </div>
  );
}
