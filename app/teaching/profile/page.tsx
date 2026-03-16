"use client";

import TeachingSidebar from "@/components/Sidebar/TeachingSidebar";
import TeachingProfile from "@/components/Profile/TeachingProfile";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <TeachingSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <TeachingProfile />
      </main>
    </div>
  );
}
