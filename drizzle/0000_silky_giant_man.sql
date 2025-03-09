CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"category" varchar NOT NULL,
	"description" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
