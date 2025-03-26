"use client";

import React from "react";
import HeaderProfileSection from "@/features/shared/components/header/HeaderProfileSection";

export default function Header(
    { userEmail, sidebarTrigger }: { userEmail: string, sidebarTrigger: React.ReactNode }
) {

    return (
        <header className="bg-gray-900 shadow-lg px-4 py-3 flex justify-between items-center">
            {sidebarTrigger}

            {/* App Name */}
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-emerald-400">ExpensePal</h1>
            </div>

            <HeaderProfileSection userEmail={userEmail} />

        </header>
    );
}
