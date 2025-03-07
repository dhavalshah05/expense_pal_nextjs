'use client';

import React from "react";
import logoutUserAction from "@/features/shared/components/header/actions/logout-user-action";

export default function HeaderProfileSection(
    {
        userEmail,
    }: {
        userEmail: string;
    }
) {
    const [isOpen, setIsOpen] = React.useState(false);
    const popupRef = React.useRef<HTMLDivElement | null>(null);

    // Close popup when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={popupRef}>
            <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                onClick={togglePopup}
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

            {/* Profile Popup */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-xs text-gray-400">{userEmail}</p>
                    </div>
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        onClick={logoutUserAction}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 mr-2 text-gray-400"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
