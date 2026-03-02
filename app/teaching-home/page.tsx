"use client";

import AwardsPage from "@/components/Awards/AwardsPage";
import TeachingSidebar from "@/components/Sidebar/TeachingSidebar";
import TeachingDashboard from "@/components/Dashboard/TeachingDashboard";
import TeachingProfile from "@/components/Profile/TeachingProfile";
import ReviewTab from "@/components/ReviewTab";
import Publications from "@/components/Publications/Publications";
import { useState, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

type TeachingPage =
  | "Home"
  | "Profile"
  | "Publications"
  | "Awards"
  | "Documents";
export default function Page() {
  const [activeComponent, setActiveComponent] =
    useState<TeachingPage>("Home");
  const { user } = useAuth();
  const TEACHING_UUID = user?.id;

  const renderContent = (): ReactNode => {
    switch (activeComponent) {
      case "Home":
        return <TeachingDashboard />;
      case "Profile":
        return <TeachingProfile />;
      case "Awards":
        return <AwardsPage />;
      case "Publications":
        return <Publications />;
      case "Documents":
        return <>Documents</>;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f1117]">
      <TeachingSidebar
        setActiveComponent={setActiveComponent}
        active={activeComponent}
      />
      <main className="flex-1 bg-[#0f1117] overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
