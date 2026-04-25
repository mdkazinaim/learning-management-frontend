import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { userRoutes } from "@/routes/UserRoutes";
import { IconType } from "react-icons/lib";
import { adminRoutes } from "@/routes/AdminRoutes";
export type NavItem = {
  index?: boolean;
  icon?: IconType;
  path: string;
  name?: string;
  element: ReactElement;
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const [navData, setNavData] = useState<NavItem[]>([]);
  const location = useLocation();
  const currentRoute = location.pathname.split("/").filter(Boolean)[1];
  const role = location?.pathname?.split("/").filter(Boolean)[0];
  useEffect(() => {
    if (role === "admin") {
      setNavData(adminRoutes);
    } else {
      setNavData(userRoutes);
    }
  }, [role]);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-white border border-gray"
    >
      {/* Logo Section */}
      <SidebarHeader className="min-h-[40px] bg-white">
        <Link to={`/${role}`}>
          <img src="/lms.png" className="mx-auto" />
        </Link>
      </SidebarHeader>
      {/* Navigation */}
      <SidebarContent style={{ scrollbarWidth: "none" }} className=" bg-white">
        <SidebarGroup className="h-full">
          <SidebarGroupContent className="h-full grid">
            <SidebarMenu className="space-y-3">
              {navData
                ?.filter((item) => item.name)
                .map((item) => {
                  return (
                    <SidebarMenuItem key={item.name}>
                      <NavLink
                        to={item.path || "/"} // fallback if no path
                        className={({ isActive }) =>
                          `self-stretch rounded-xl text-light-Gray text-base font-medium inline-flex justify-start items-center w-full transition duration-200 ease-in-out hover:bg-primary-blue hover:text-primary-white!
                        ${
                          isActive
                            ? "bg-primary-blue text-primary-white! "
                            : "text-secondary-text!"
                        }
                      `
                        }
                      >
                        <SidebarMenuButton
                          asChild
                          className=""
                          tooltip={item.name}
                          isActive={
                            currentRoute ===
                            item.path.split("/").filter(Boolean)[1]
                          }
                        >
                          <div className="flex items-center justify-start gap-3 pl-5 py-5">
                            {item.icon && <item.icon className="size-4!" />}
                            <span className="text-base font-normal w-full ">
                              {item.name}
                            </span>
                          </div>
                        </SidebarMenuButton>
                      </NavLink>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
            {/* Profile section */}
            <div className="place-self-end w-full"></div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default AppSidebar;
