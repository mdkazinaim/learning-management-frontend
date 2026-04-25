import { Suspense } from "react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GoGraph } from "react-icons/go";
import { Progress } from "@radix-ui/react-progress";
import { FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import { HiMiniTrophy } from "react-icons/hi2";
import { TiStarFullOutline } from "react-icons/ti";
import { useAppDispatch } from "@/hooks/useRedux";
import { logOut } from "@/store/Slices/AuthSlice/authSlice";
import { useNavigate } from "react-router-dom";
import useGetMe from "@/hooks/useGetMe";
import { Skeleton } from "@/components/ui/skeleton";

export const userStats = [
  {
    _id: "purchased_courses",
    label: "Purchased Courses",
    description: "Total enrolled",
    value: 12,
    className: "grid place-items-center size-10 bg-primary-blue rounded-full",
    icon_type: <FaGraduationCap className="text-white size-5" />,
    color: "bg-border",
    text_color: "text-primary-blue",
  },
  {
    _id: "courses_completed",
    label: "Courses Completed",
    description: "Finished learning",
    value: 7,
    className: "grid place-items-center size-10 bg-primary-green rounded-full",
    icon_type: <FaCheckCircle className="text-white size-5" />,
    color: "bg-primary-green/10",
    text_color: "text-primary-green",
  },
  {
    _id: "badges_earned",
    label: "Badges Earned",
    description: "Achievements unlocked",
    value: 15,
    className: "grid place-items-center size-10 bg-primary-yellow rounded-full",
    icon_type: <HiMiniTrophy className="text-white size-5" />,
    color: "bg-primary-yellow/10",
    text_color: "text-primary-yellow",
  },
  {
    _id: "total_points",
    label: "Total Points",
    description: "Learning rewards",
    value: 2450,
    className: "grid place-items-center size-10 bg-primary-purple rounded-full",
    icon_type: <TiStarFullOutline className="text-white size-5" />,
    color: "bg-primary-purple/10",
    text_color: "text-primary-purple",
  },
];

export function NavUser() {
  return (
    <Suspense
      fallback={
        <div className="w-56 p-4 space-y-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      }
    >
      <NavUserInner />
    </Suspense>
  );
}

function NavUserInner() {
  const { role, fullName, email, isLoading } = useGetMe() || {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (isLoading) return null; // Suspense fallback handles loading

  const user = {
    name: fullName || "",
    email: email || "",
    role: role || "",
    avatar: "https://github.com/user.png",
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="border border-gray rounded-xl">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:ring-0!"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
                <span className="truncate text-xs">{user.role}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-96 rounded-lg bg-white border-none! px-5"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-sm">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            {role !== "ADMIN" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium">
                    <p>ACTIVITY OVERVIEW</p>
                  </DropdownMenuLabel>

                  {userStats.map((item) => (
                    <DropdownMenuItem key={item._id}>
                      <div
                        className={`${item.color} p-3 rounded-xl w-full flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-2">
                          <p className={`${item.className}`}>
                            {item.icon_type}
                          </p>
                          <div>
                            <h6 className="text-primary-text">{item.label}</h6>
                            <p>{item.description}</p>
                          </div>
                        </div>
                        <h2 className={`${item.text_color}`}>{item.value}</h2>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium">
                    <GoGraph className="size-5 text-primary-green" />
                    Level 3: Advanced Learner
                  </DropdownMenuLabel>

                  <DropdownMenuItem>
                    <div className="w-full space-y-1">
                      <Progress
                        value={70}
                        className="h-2 rounded-full bg-border"
                      >
                        <div
                          className="h-full w-full rounded-full bg-primary-green transition-all"
                          style={{ width: "70%" }}
                        />
                      </Progress>
                      <span className="text-xs text-secondary-text">
                        70% Complete
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await dispatch(logOut());
                  navigate("/");
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
            >
              <LogOut size={18} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
