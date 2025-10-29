"use client";

import AdminSidebar from "@/components/AdminSidebar";
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
        return <>yes</>;
      case "Profile":
        return <>no</>;
      case "To Review":
        return <ReviewTab />;
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
