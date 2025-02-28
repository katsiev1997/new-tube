"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

interface CategoriesSectionProps {
	categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
	return (
		<Suspense fallback={<FilterCarousel isLoading data={[]} onSelect={() => {}} />}>
			<CategoriesSectionSuspense categoryId={categoryId} />
		</Suspense>
	);
};

export const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
	const [categories] = trpc.categories.getMany.useSuspenseQuery();

	const data = categories.map(({ name, id }) => ({
		value: id,
		label: name,
	}));

	const router = useRouter();
	const onSelect = (value: string | null) => {
		const url = new URL(window.location.href);

		if (value) {
			url.searchParams.set("categoryId", value);
		} else {
			url.searchParams.delete("categoryId");
		}

		router.push(url.toString());
	};

	return <FilterCarousel onSelect={onSelect} value={categoryId} data={data} />;
};
