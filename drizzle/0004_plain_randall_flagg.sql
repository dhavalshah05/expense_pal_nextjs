CREATE TABLE "shared_expenses" (
	"id" text PRIMARY KEY NOT NULL,
	"is_added_to_split" boolean DEFAULT false,
	"expense_id" text NOT NULL
);
