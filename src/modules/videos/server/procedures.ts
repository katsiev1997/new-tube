import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
	create: protectedProcedure.mutation(async ({ ctx }) => {
		try {
			const { id: userId } = ctx.user;

			if (!userId) {
				throw new Error("User ID is missing.");
			}

			const [video] = await db
				.insert(videos)
				.values({ userId, title: "Untitled" })
				.returning();

			return { video };
		} catch (error) {
			console.error("Error creating video:", error);
			throw new Error("Failed to create video.");
		}
	}),
});
