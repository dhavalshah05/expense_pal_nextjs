import React from "react";
import HeaderProfileSection from "@/features/shared/components/header/HeaderProfileSection";
import getUser from "@/features/shared/hooks/get-user";

export default async function Header() {
    const user = await getUser();

    return (
        <header className="bg-gray-900 shadow-lg px-4 py-3 flex justify-between items-center">
            {/* App Name */}
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-emerald-400">ExpensePal</h1>
            </div>

            <HeaderProfileSection userEmail={user.userEmail} />

        </header>
    );
}
