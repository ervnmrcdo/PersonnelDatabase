"use client";

import NonTeachingSidebar from "@/components/Sidebar/NonTeachingSidebar";
import NonteachingDashboard from "@/components/Dashboard/NonteachingDashboard";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <NonTeachingSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <NonteachingDashboard />
      </main>
    </div>
  );
}
