import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

export default function UserAvatar() {
	const { currentUser } = useContextGlobal();
	const initial = currentUser!.displayName!.at(0)?.toUpperCase();
	return (
		<Avatar
			aria-label="user-avatar"
			className="mx-auto mb-6 h-[60px] w-[60px]"
		>
			<AvatarImage
				src={currentUser!.photoURL || ""}
				alt="user-photo"
				className="w-full h-full"
			/>
			<AvatarFallback className="text-xl font-bold bg-primary/10">
				{initial}
			</AvatarFallback>
		</Avatar>
	);
}
