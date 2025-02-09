"use client";

import { Button } from "@/components/ui/button";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
	// TODO: add diferent auth states
	return (
		<>
			<SignedIn>
				<UserButton />
				{/* TODO: add menu items for Studio and User profile */}
			</SignedIn>
			<SignedOut>
				<SignInButton mode="modal">
					<Button
						variant="outline"
						className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20"
					>
						<UserCircleIcon />
						Sign in
					</Button>
				</SignInButton>
			</SignedOut>
		</>
	);
};
