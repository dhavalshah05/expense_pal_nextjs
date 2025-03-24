"use client";

import {TableCell, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {expenseByCategoryRoute} from "@/utils/routing/route-names";

export default function CategoryDashboardSummaryRow(
    {
        id,
        name,
        amount
    }: {
        id: string,
        name: string,
        amount: string
    }
) {
    const router = useRouter();

    function handleClick() {
        router.push(expenseByCategoryRoute(id))
    }

    return (
        <TableRow onClick={handleClick}>
            <TableCell>{name}</TableCell>
            <TableCell className={"text-right text-gray-900 font-bold"}>{amount}</TableCell>
        </TableRow>
    );
}
