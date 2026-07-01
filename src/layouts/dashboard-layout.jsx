import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/sidebar";
import Topbar from "../components/dashboard/topbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <div className="mx-auto flex max-w-[1400px] gap-6 p-4 sm:p-6">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <Topbar />

          <Outlet />
        </div>
      </div>
    </div>
  );
}