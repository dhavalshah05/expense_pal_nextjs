import {integer, pgTable, text, timestamp, varchar, boolean} from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2';

export const categoriesTable = pgTable('categories', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(),

    userId: text('user_id').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const expenseAccountsTable = pgTable('expense_accounts', {
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
    isShared: boolean('isShared').default(false),

    categoryId: text('category_id').notNull(),
    accountId: text('account_id'),
    bucketId: text('bucket_id'),
    userId: text('user_id').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bucketsTable = pgTable('buckets', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(),
    isActive: boolean('isActive').default(true),

    userId: text('user_id').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
