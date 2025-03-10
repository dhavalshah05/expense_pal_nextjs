'use client';

import React, {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import logoutUserAction from "@/features/shared/components/header/actions/logout-user-action";

export default function HeaderProfileSection(
    {
        userEmail,
    }: {
        userEmail: string;
    }
) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsAlertOpen(true);
    };

    const handleLogoutConfirm = async () => {
        await logoutUserAction()
        setIsAlertOpen(false);
        setIsDropdownOpen(false);
    };

    const handleAlertOpenChange = (open: boolean) => {
        setIsAlertOpen(open);
        if (!open) {
            // When alert dialog is closed, also close the dropdown
            setIsDropdownOpen(false);
        }
    };

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-emerald-400"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault();
                    handleLogoutClick();
                }}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>

            <AlertDialog open={isAlertOpen} onOpenChange={handleAlertOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will end your current session and require you to log in again.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogoutConfirm}>
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenu>

    );
}
