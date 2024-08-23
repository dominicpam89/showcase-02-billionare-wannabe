import { Button } from "@/components/ui/button";
import {
	getRedirectResult,
	GoogleAuthProvider,
	signInWithRedirect,
	User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase.config";
import { googleAuthPopup, LimitedUserInfo } from "./lib/services/auth";

const provider = new GoogleAuthProvider();

export default function App() {
	const [user, setUser] = useState<User | LimitedUserInfo | undefined>(
		undefined
	);
	const [error, setError] = useState<Error | null>(null);

	const handleSigninPopup = () => {
		googleAuthPopup()
			.then((data) => {
				console.log(data);
				setUser(data.userInfo);
			})
			.catch((err) => {
				setError(err);
				console.error(err);
			});
	};
	const handleSigninRedirect = () => {
		signInWithRedirect(auth, provider);
	};
	useEffect(() => {
		getRedirectResult(auth)
			.then((data) => {
				setUser(data?.user);
				console.log(data);
			})
			.catch((err) => {
				setError(err);
				console.error(err);
			});
	}, []);
	console.log(user);
	return (
		<div className="mx-auto max-w-md p-8">
			<Button onClick={handleSigninRedirect}>Test auth redirect</Button>
			<Button onClick={handleSigninPopup}>Test auth popup</Button>
			{user && (
				<h1 className="font-extrabold text-lg">
					{user?.email}, hi there you fucking handsome!
				</h1>
			)}
			{error && (
				<p className="text-destructive">Fuckin Error! {error.message}</p>
			)}
		</div>
	);
}
