"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  type NavGroup,
  type NavMainItem,
  type NavSubItem,
} from "@/navigation/sidebar/sidebar-items";

interface NavMainProps {
  readonly items: readonly NavGroup[];
}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800">
    Soon
  </span>
);

/**
 * Recursive menu renderer (handles level 1, 2, 3, ... automatically)
 */
function RenderMenuItems({
  items,
  isActive,
  isSubmenuOpen,
}: {
  items: (NavMainItem | NavSubItem)[];
  isActive: (url: string, subItems?: NavSubItem[]) => boolean;
  isSubmenuOpen: (subItems?: NavSubItem[]) => boolean;
}) {
  return (
    <>
      {items.map((item) => {
        const hasChildren = !!item.subItems?.length;

        if (hasChildren) {
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isSubmenuOpen(item.subItems)}
              className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    disabled={item.comingSoon}
                    isActive={isActive(item.url ?? "", item.subItems)}
                    tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.comingSoon && <IsComingSoon />}
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <RenderMenuItems
                      items={item.subItems ?? []}
                      isActive={isActive}
                      isSubmenuOpen={isSubmenuOpen}
                    />
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        // No children → simple link
        return (
          <SidebarMenuSubItem key={item.title}>
            <SidebarMenuSubButton
              aria-disabled={item.comingSoon}
              isActive={isActive(item.url ?? "")}
              asChild>
              <Link
                href={item.url ?? "#"}
                target={item.newTab ? "_blank" : undefined}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                {item.comingSoon && <IsComingSoon />}
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
    </>
  );
}

export function NavMain({ items }: NavMainProps) {
  const path = usePathname();
  //const { state, isMobile } = useSidebar();

  const isItemActive = (url: string, subItems?: NavSubItem[]) => {
    if (subItems?.length) {
      return subItems.some((sub) => path.startsWith(sub.url ?? ""));
    }
    return path === url;
  };

  const isSubmenuOpen = (subItems?: NavSubItem[]) => {
    return subItems?.some((sub) => path.startsWith(sub.url ?? "")) ?? false;
  };

  return (
    <>
      {items.map((group) => (
        <Collapsible key={group.id} defaultOpen className="group/collapsible">
          <SidebarGroup>
            {group.label && (
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="w-full flex items-center">
                  {group.label}
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
            )}
            <CollapsibleContent>
              <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                  <RenderMenuItems
                    items={group.items}
                    isActive={isItemActive}
                    isSubmenuOpen={isSubmenuOpen}
                  />
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}
