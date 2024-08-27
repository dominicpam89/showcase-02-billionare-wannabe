import Logo from "./Logo";
import NavbarMenu from "./NavbarMenu";

export default function Navbar() {
	return (
		<nav className="flex justify-between items-center p-6 px-8 w-full h-[80px] fixed top-0 left-0 shadow-md">
			<Logo />
			<NavbarMenu />
		</nav>
	);
}
