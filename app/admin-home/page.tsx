"use client";

import FormManaging from "@/components/admin/FormManaging";
import AdminSidebar from "@/components/AdminSidebar";
import ReviewPage from "@/components/review/ReviewPage";
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
    switch (activeComponent) {
      case "Home":
        return <div>yes</div>;
      case "Profile":
        return <div>no</div>;
      case "Account Settings":
        return <div>acc settings</div>;
      case "To Review":
        return <ReviewPage />;
      case "Forms":
        return <FormManaging />;
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
