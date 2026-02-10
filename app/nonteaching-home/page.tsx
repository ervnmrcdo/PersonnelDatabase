"use client";

import AwardsPage from "@/components/Awards/AwardsPage";
import NonTeachingSidebar from "@/components/Sidebar/NonTeachingSidebar";
import NonteachingDashboard from "@/components/Dashboard/NonteachingDashboard";
import NonteachingProfile from "@/components/Profile/NonteachingProfile";
import ReviewTab from "@/components/ReviewTab";
import Publications from "@/components/Publications/Publications";
import TeachingProfile from "@/components/Profile/TeachingProfile";
import { useState, ReactNode } from "react";
import SubmissionsPage from "@/components/Submissions/SubmissionsPage";

type NonTeachingPage =
  | "Home"
  | "Profile"
  | "Publications"
  | "Awards"
  | "Submissions"
  | "Documents";
export default function Page() {
  const [activeComponent, setActiveComponent] =
    useState<NonTeachingPage>("Home");

  const renderContent = (): ReactNode => {
    switch (activeComponent) {
      case "Home":
        return <NonteachingDashboard />;
      case "Profile":
        return <NonteachingProfile />;
      case "Awards":
        return <AwardsPage />;
      case "Submissions":
        return <SubmissionsPage />
      case "Publications":
        return <Publications />;
      case "Documents":
        return <>Documents</>;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <NonTeachingSidebar
        setActiveComponent={setActiveComponent}
        active={activeComponent}
      />
      <main className="flex-1 bg-white overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
