/*
import {categoriesTable, expensesTable} from "@/db/schema";
import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres';

import * as schema from '@/db/schema'
import {eq} from "drizzle-orm";
import {PgTable} from "drizzle-orm/pg-core";

// For PostgreSQL
const connectionString = "postgresql://postgres.thppzvzvxbikxbrncrot:hap7H4SpzwRG4vS@@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";
const client = postgres(connectionString);
export const db = drizzle(client, {schema});

/!*
const seedDb = async () => {
    await db.delete(categoriesTable);
    console.log('✅ Categories Deleted!')
    await db.delete(expensesTable);
    console.log('✅ Expenses Deleted!')

    const [fuelCategory] = await db.insert(categoriesTable).values({
        name: 'Fuel'
    }).returning()

    const [foodCategory] = await db.insert(categoriesTable).values({
        name: 'Food'
    }).returning()

    const [medicalCateogory] = await db.insert(categoriesTable).values({
        name: 'Medical'
    }).returning()

    console.log('✅ Categories Created!')

    await db.insert(expensesTable).values({
        amount: 500,
        categoryId: fuelCategory.id,
        description: 'Activa Fuel'
    })

    await db.insert(expensesTable).values({
        amount: 1200,
        categoryId: fuelCategory.id,
        description: 'i10 Fuel'
    })

    await db.insert(expensesTable).values({
        amount: 430,
        categoryId: medicalCateogory.id,
        description: 'FaceWash'
    })

    await db.insert(expensesTable).values({
        amount: 70,
        categoryId: medicalCateogory.id,
        description: 'L-Dio One'
    })

    await db.insert(expensesTable).values({
        amount: 1890,
        categoryId: medicalCateogory.id,
        description: 'BackPain Medicines'
    })

    await db.insert(expensesTable).values({
        amount: 100,
        categoryId: foodCategory.id,
        description: 'Black Coffee'
    })

    await db.insert(expensesTable).values({
        amount: 1400,
        categoryId: foodCategory.id,
        description: 'Birthday Dinner'
    })

    console.log('✅ Expenses Created!')
}

//seedDb();

function selectAll<T extends PgTable>(table: T): Record<string, unknown> {
    return Object.fromEntries(
        Object.entries(table).filter(([key]) =>
            !['_', '$inferSelect', '$inferInsert', '$schema'].includes(key)
        ).map(([key, value]) => [key, value])
    );
}

const queryDb = async () => {
    const expenses = await db.select({
        ...selectAll(expensesTable),
        categoryName: categoriesTable.name,
    })
        .from(expensesTable)
        .innerJoin(categoriesTable, eq(expensesTable.categoryId, categoriesTable.id))
    expenses.forEach(expense => console.log(expense))
}

queryDb();
*!/

*/
