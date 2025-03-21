import {db} from "@/db";
import {categoriesTable} from "@/db/schema";
import {eq} from "drizzle-orm";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import Link from "next/link";
import {createCategoryPageRoute} from "@/utils/routing/route-names";

export default async function CategoriesPage() {
    const userId = await getUserIdFromHeader();
    const categories = await getCategories(userId);

    return (
        <section className={"grid grid-cols-1 grid-row-[auto_1fr] overflow-y-auto place-content-start"}>
            <div className={"flex items-center justify-between p-4"}>
                <h2 className={"text-xl font-bold"}>Categories</h2>
                <Link
                    href={createCategoryPageRoute()}
                    className={"bg-gray-900 text-white px-3 py-2 text-sm rounded-md"}>
                    Add Category
                </Link>
            </div>
            <ul className={"overflow-y-auto"}>
                {categories.map((category) => (
                    <CategoryItem key={category.id} id={category.id} name={category.name} />
                ))}
            </ul>
        </section>
    )
}

function CategoryItem(
    {
        id,
        name
    }: {
        id: string,
        name: string
    }
) {
    return (
        <>
            <li className={"px-4 py-3"}>{name}</li>
            <li className={"h-[1px] bg-gray-400"} />
        </>
    )
}

async function getCategories(userId: string) {
    return db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.userId, userId));
}
