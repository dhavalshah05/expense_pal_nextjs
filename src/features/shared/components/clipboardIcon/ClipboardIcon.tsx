"use client";

import {Button} from "@/components/ui/button";
import {ClipboardCopyIcon} from "lucide-react";
import {showSuccessToast} from "@/utils/toast/custom-toast";

export default function ClipboardIcon(
    {
        textContent,
    }: {
        textContent: string,
    }
) {

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(textContent);
            showSuccessToast("Copied to clipboard");
        } catch (e: unknown) {
            console.log(e)
        }
    }

    return (
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
            <ClipboardCopyIcon />
        </Button>
    );
}
