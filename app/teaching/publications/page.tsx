"use client";

import TeachingSidebar from "@/components/Sidebar/TeachingSidebar";
import Publications from "@/components/Publications/Publications";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <TeachingSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <Publications />
      </main>
    </div>
  );
}
