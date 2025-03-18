import Link from "next/link";
import {expensesPageRoute} from "@/utils/routing/route-names";

export default function Home() {
    return (
        <div>
            <h2>Home Page</h2>
            <Link href={expensesPageRoute()}>Expenses</Link>
        </div>
    );
}
