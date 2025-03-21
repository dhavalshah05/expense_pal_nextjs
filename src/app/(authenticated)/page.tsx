import Link from "next/link";
import {categoriesPageRoute, expensesPageRoute} from "@/utils/routing/route-names";

export default function Home() {
    return (
        <div>
            <h2>Home Page</h2>
            <p>
                <Link href={expensesPageRoute()}>Expenses</Link>
            </p>
            <p>
                <Link href={categoriesPageRoute()}>Categories</Link>
            </p>
        </div>
    );
}
