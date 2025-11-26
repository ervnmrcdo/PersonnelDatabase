"use client";

import AwardsPage from "@/components/Awards/AwardsPage";
import TeachingSidebar from "@/components/TeachingSidebar";
import TeachingDashboard from "@/components/Dashboard/TeachingDashboard";
import ReviewTab from "@/components/ReviewTab";
import { useState, ReactNode } from "react";

type TeachingPage =
  | "Home"
  | "Profile"
  | "Publications"
  | "Awards"
  | "Documents";
export default function Page() {
  const [activeComponent, setActiveComponent] =
    useState<TeachingPage>("Home");

  const renderContent = (): ReactNode => {
    console.log("hi");
    switch (activeComponent) {
      case "Home":
        return <TeachingDashboard/>;
      case "Profile":
        return <>Teaching Profile</>;
      case "Awards":
        return <>Awards</>;
      case "Publications":
        return <>Publications</>;
      case "Documents":
        return <>Documents</>;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <TeachingSidebar
        setActiveComponent={setActiveComponent}
        active={activeComponent}
      />
      <main className="flex-1 bg-white overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
