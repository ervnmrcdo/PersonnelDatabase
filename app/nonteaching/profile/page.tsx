"use client";

import NonTeachingSidebar from "@/components/Sidebar/NonTeachingSidebar";
import NonteachingProfile from "@/components/Profile/NonteachingProfile";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <NonTeachingSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <NonteachingProfile />
      </main>
    </div>
  );
}
