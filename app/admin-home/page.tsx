"use client";

import AdminSidebar from "@/components/AdminSidebar";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import AdminProfile from "@/components/Profile/AdminProfile";
import ReviewPage from "@/components/Review/ReviewPage";
import ReviewTab from "@/components/ReviewTab";
import { useState, ReactNode } from "react";

type Page =
  | "Home"
  | "Profile"
  | "Account Settings"
  | "To Review"
  | "Faculty"
  | "Students"
  | "Forms"
  | "Crawler"
  | "Database";

export default function Page() {
  const [activeComponent, setActiveComponent] = useState<Page>("Home");

  const renderContent = (): ReactNode => {
    console.log("hi");
    switch (activeComponent) {
      case "Home":
        return <AdminDashboard />;
      case "Profile":
        return <AdminProfile />;
      case "To Review":
        return <ReviewPage />;
      case "Faculty":
        return <>Faculty</>;
      case "Students":
        return <>Students</>;
      case "Forms":
        return <>Forms</>;
      case "Crawler":
        return <>Crawler</>;
      case "Account Settings":
        return <>Account Settings</>;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar
        setActiveComponent={setActiveComponent}
        active={activeComponent}
      />
      <main className="flex-1 bg-white overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
