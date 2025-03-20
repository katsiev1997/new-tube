"use client";

import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ResponsiveModal } from "@/components/responsive-modal";
import { StudioUploader } from "./studio-uploader";

export const StudioUploadModal = () => {
	const utils = trpc.useUtils();
	const create = trpc.videos.create.useMutation({
		onSuccess: () => {
			toast({
				description: "Video created",
			});
			utils.studio.getMany.invalidate();
		},
		onError: (error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});

	return (
		<>
			<ResponsiveModal
				title="Upload a video"
				open={!!create.data?.url}
				onOpenChange={() => create.reset()}
			>
				{create.data?.url ? (
					<StudioUploader endpoint={create.data.url} onSuccess={() => {}} />
				) : (
					<Loader2Icon className="animate-spin" />
				)}
			</ResponsiveModal>
			<Button variant="secondary" onClick={() => create.mutate()} disabled={create.isPending}>
				{create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
				Create
			</Button>
		</>
	);
};
