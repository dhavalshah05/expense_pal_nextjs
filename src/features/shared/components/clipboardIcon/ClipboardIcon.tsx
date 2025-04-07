"use client";

import {Button} from "@/components/ui/button";
import {ClipboardCopyIcon} from "lucide-react";

export default function ClipboardIcon(
    {
        textContent,
        date,
    }: {
        textContent: string,
        date: Date,
    }
) {

    async function copyToClipboard() {
        await navigator.clipboard.writeText(`${getFormattedDate()} - ${textContent}`);
    }

    function getFormattedDate() {
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short'
        }).format(date);
    }

    return (
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
            <ClipboardCopyIcon />
        </Button>
    );
}
