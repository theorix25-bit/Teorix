"use client";
import BottomNav from "@/components/admin/BottomNav";
import DynamicView from "@/components/admin/DynamicView";
import Header from "@/components/admin/header";
import UploadFile from "@/components/UploadFile";
import Link from "next/link";
import { useState } from "react";

function page() {
  const [activeView, setActiveView] = useState<ViewType>("temas");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <DynamicView view={activeView} />
      </div>
      <BottomNav active={activeView} onChange={setActiveView} />
    </div>
  );
}

export default page;
