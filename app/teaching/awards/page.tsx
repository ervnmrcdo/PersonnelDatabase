"use client";

import TeachingSidebar from "@/components/Sidebar/TeachingSidebar";
import AwardsPage from "@/components/Awards/AwardsPage";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <TeachingSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <AwardsPage />
      </main>
    </div>
  );
}
