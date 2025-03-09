import {integer, pgTable, text, timestamp, varchar} from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2';

export const categoriesTable = pgTable('categories', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(),

    userId: text('user_id').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const expensesTable = pgTable('expenses', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    amount: integer('amount').notNull(),
    expenseDate: timestamp('expense_date').defaultNow().notNull(),
    description: varchar('description').notNull(),

    categoryId: text('category_id').notNull(),
    userId: text('user_id').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
