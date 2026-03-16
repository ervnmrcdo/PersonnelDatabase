"use client";

import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import ReviewPage from "@/components/Review/ReviewPage";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0f1117]">
      <AdminSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">
        <ReviewPage />
      </main>
    </div>
  );
}
