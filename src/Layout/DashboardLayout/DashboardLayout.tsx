/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { IoMdNotificationsOutline } from "react-icons/io";

const DashboardLayout = () => {
  return (
    <div className="h-screen w-full overflow-hidden flex">
      <SidebarProvider>
        <AppSidebar variant="sidebar" />
        <SidebarInset className="">
          <div className="flex-1 flex flex-col min-h-screen">
            <div className="h-[60px] sticky top-0 flex items-center  px-5 shadow-sm bg-white">
              <div className="flex items-center justify-between w-full">
                <SidebarTrigger />
                <div className="flex items-center gap-4">
                  <IoMdNotificationsOutline className="size-8" />
                  <NavUser />
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto h-[calc(100vh-60px)] bg-gray">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
