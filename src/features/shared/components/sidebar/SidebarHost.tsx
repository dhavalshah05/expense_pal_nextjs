"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import React from "react";
import Header from "@/features/shared/components/header/Header";
import {useRouter} from "next/navigation";
import {useIsMobile} from "@/hooks/use-mobile";
import {bucketsPageRoute, createBucketPageRoute} from "@/utils/routing/route-names";

export default function SidebarHost(
    {
        children,
        userEmail,
    }:{
        children: React.ReactNode,
        userEmail: string
    }
) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="grid grid-cols-1 grid-rows-[auto_1fr] h-screen w-full">
                <Header
                    sidebarTrigger={<SidebarTrigger className={"text-white"} />}
                    userEmail={userEmail} />
                {children}
            </main>
        </SidebarProvider>
    );
}

function AppSidebar() {
    const sidebar = useSidebar();
    const router = useRouter();
    const isMobile = useIsMobile();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                {SIDEBAR_ITEMS.map((item) => (
                                    <SidebarMenuButton
                                        key={item.title}
                                        onClick={() => {
                                            if (isMobile) {
                                                sidebar.toggleSidebar();
                                            }
                                            router.push(item.url);
                                        }}
                                    >
                                        {item.title}
                                    </SidebarMenuButton>
                                ))}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

const SIDEBAR_ITEMS = [
    {
        title: "Dashboard",
        url: "/"
    },
    {
        title: "Expenses",
        url: "/expenses"
    },
    {
        title: "Categories",
        url: "/categories"
    },
    {
        title: "Accounts",
        url: "/accounts"
    },
    {
        title: "Buckets",
        url: bucketsPageRoute()
    }
]
