"use client";

import TeachingSidebar from "@/components/Sidebar/TeachingSidebar";
import TeachingDashboard from "@/components/Dashboard/TeachingDashboard";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <TeachingSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <TeachingDashboard />
      </main>
    </div>
  );
}
