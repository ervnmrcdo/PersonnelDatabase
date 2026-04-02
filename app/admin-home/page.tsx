"use client";

import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import AdminProfile from "@/components/Profile/AdminProfile";
import ReviewPage from "@/components/Review/ReviewPage";
import ReviewTab from "@/components/ReviewTab";
import PersonnelList from "@/components/Admin/PersonnelList";
import SignedFormsPage from "@/components/Admin/SignedFormsPage";
import { useState, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

type Page =
  | "Home"
  | "Profile"
  | "To Review"
  | "Signed Forms"
  | "Teaching"
  | "NonTeaching"
  | "Awards"
  | "Crawler"
  | "Database";

export default function Page() {
  const [activeComponent, setActiveComponent] = useState<Page>("Home");
  const { user } = useAuth();
  const ADMIN_UUID = user?.id;

  const renderContent = (): ReactNode => {
    switch (activeComponent) {
      case "Home":
        return <AdminDashboard />;
      case "Profile":
        return <AdminProfile />;
      case "To Review":
        return <ReviewPage />;
      case "Signed Forms":
        return <SignedFormsPage />;
      case "Teaching":
        return <PersonnelList role="teaching" />;
      case "NonTeaching":
        return <PersonnelList role="nonteaching" />;
      case "Awards":
        return <>Awards</>;
      case "Crawler":
        return <>Crawler</>;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f1117]">
      <AdminSidebar />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
