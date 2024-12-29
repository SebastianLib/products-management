import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";

interface NavbarLink {
    name: string;
    path: string;
    icon: IconType | null;
}

export const signOutNavbarLinks: NavbarLink[] = [
    {
        name: "Sign In",
        path: "/signin",
        icon: null,
    },
    {
        name: "Sign up",
        path: "/signup",
        icon: null,
    },
];

export const signinNavbarLinks: NavbarLink[] = [
    {
        name: "Home",
        path: "/",
        icon: FaHome,
    },
];