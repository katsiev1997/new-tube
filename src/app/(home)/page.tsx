import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { PageClient } from "./client";

const Home = async () => {
	void trpc.hello.prefetch({ text: "world" });
	return (
		<HydrateClient>
			<Suspense fallback={<div>Loading...</div>}>
				<PageClient />
			</Suspense>
		</HydrateClient>
	);
};

export default Home;
