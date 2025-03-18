import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		clerkId: text("clerk_id").unique().notNull(),
		name: text("name").notNull(),
		// TODO: add banner fields
		imageUrl: text("image_url").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [uniqueIndex("users_clerk_id_idx").on(t.clerkId)]
);

export const userRelations = relations(users, ({ many }) => ({
	videos: many(videos),
}));

export const categories = pgTable(
	"categories",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull().unique(),
		description: text("description"),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [uniqueIndex("name_idx").on(t.name)]
);

export const categoryRelations = relations(users, ({ many }) => ({
	videos: many(videos),
}));

export const videos = pgTable(
	"videos",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		title: text("title").notNull(),
		description: text("description"),
		thumbnailUrl: text("thumbnail_url"),

		userId: uuid("user_id")
			.references(() => users.id, {
				onDelete: "cascade",
			})
			.notNull(),
		categoryId: uuid("category_id").references(() => categories.id, {
			onDelete: "set null",
		}),

		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [
		uniqueIndex("title_idx").on(t.title),
		uniqueIndex("user_id_title_idx").on(t.userId, t.title),
	]
);

export const videosRelations = relations(videos, ({ one }) => ({
	user: one(users, {
		fields: [videos.userId],
		references: [users.id],
	}),
	category: one(categories, {
		fields: [videos.categoryId],
		references: [categories.id],
	}),
}));
