CREATE TABLE "buckets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"isShared" boolean DEFAULT true,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "bucket_id" text;