import {db} from "@/db";
import {eq} from "drizzle-orm";
import getUserIdFromHeader from "@/features/shared/hooks/get-user-id-from-header";
import Link from "next/link";
import {bucketsTable} from "@/db/schema";
import {createBucketPageRoute} from "@/utils/routing/route-names";


export default async function BucketsPage() {
    const userId = await getUserIdFromHeader();
    const buckets = await getBuckets(userId);

    return (
        <section className={"grid grid-cols-1 grid-row-[auto_1fr] overflow-y-auto place-content-start"}>
            <div className={"flex items-center justify-between p-4"}>
                <h2 className={"text-xl font-bold"}>Buckets</h2>
                <Link
                    href={createBucketPageRoute()}
                    className={"bg-gray-900 text-white px-3 py-2 text-sm rounded-md"}>
                    Add Bucket
                </Link>
            </div>
            <ul className={"overflow-y-auto"}>
                {buckets.map((bucket) => (
                    <BucketItem key={bucket.id} id={bucket.id} name={bucket.name} />
                ))}
            </ul>
        </section>
    )
}

function BucketItem(
    {
        // id,
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

async function getBuckets(userId: string) {
    return db
        .select()
        .from(bucketsTable)
        .where(eq(bucketsTable.userId, userId));
}
