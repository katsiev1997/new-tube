"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ClapperboardIcon, UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
	// TODO: add diferent auth states
	return (
		<>
			<SignedIn>
				<UserButton>
					<UserButton.MenuItems>
						{/* TODO: Add user profile menu  */}
						<UserButton.Link
							label="Studio"
							href="/studio"
							labelIcon={<ClapperboardIcon className="size-4" />}
						/>
						<UserButton.Action label="manageAccount" />
					</UserButton.MenuItems>
				</UserButton>
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
