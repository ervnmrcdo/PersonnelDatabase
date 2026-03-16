"use client";

import NonTeachingSidebar from "@/components/Sidebar/NonTeachingSidebar";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <NonTeachingSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-white">Documents</h1>
        </div>
      </main>
    </div>
  );
}
