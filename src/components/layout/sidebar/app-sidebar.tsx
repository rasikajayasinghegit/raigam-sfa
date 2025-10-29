"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Settings,
  CircleHelp,
  Search,
  Database,
  ClipboardList,
  File,
  Command,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { NavMain } from "./nav-main";
import logo from "@/public/logo.png";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="w-64 border-r bg-white dark:bg-gray-900">
      <SidebarHeader className="h-15 text-center">
        <Link href="/dashboard">
          <Image
            src="/logo.png"
            alt={APP_CONFIG.name}
            width={150}
            height={50}
            priority
            className="mx-auto my-2"
          />
          {/* <span className="font-bold text-red-600 text-3xl">
            {APP_CONFIG.name}
          </span> */}
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0 border border-b border-amber-50">
        <NavMain items={sidebarItems} />
      </SidebarContent>
    </Sidebar>
  );
}
