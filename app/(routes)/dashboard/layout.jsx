import React from "react";
import SideNavBar from "./_components/SideNavBar";
import DashboardHeader from "./_components/DashboardHeader";
import { Toaster } from "sonner";

function DashboardLayout({ children }) {
  return (
    <article>
      <article className="w-64 bg-slate-50 h-screen fixed hidden md:block">
        <SideNavBar />
      </article>

      <article className="md:ml-64">
        <DashboardHeader />
        <Toaster />
        {children}
      </article>
    </article>
  );
}

export default DashboardLayout;
