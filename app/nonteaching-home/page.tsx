"use client";

import Non from "@/components/AdminSidebar";
import AwardsPage from "@/components/Awards/AwardsPage";
import NonTeachingSidebar from "@/components/NonTeachingSidebar";
import ReviewTab from "@/components/ReviewTab";
import { useState, ReactNode } from "react";

type NonTeachingPage =
  | "Home"
  | "Profile"
  | "Publications"
  | "Awards"
  | "Documents";
export default function Page() {
  const [activeComponent, setActiveComponent] =
    useState<NonTeachingPage>("Home");

  const renderContent = (): ReactNode => {
    console.log("hi");
    switch (activeComponent) {
      case "Home":
        return <>yes</>;
      case "Profile":
        return <>no</>;
      case "Awards":
        return <AwardsPage />;
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
