"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProfile, logout } from "@/api/auth";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import { PanelRightIcon } from "lucide-react";

export const Navbar = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <div className="bg-background sticky top-0 z-50 border-b">
            <div className="flex h-16 items-center px-4">
                <Button size={"icon"} variant={"outline"} onClick={toggleSidebar} >
                    <PanelRightIcon />
                </Button>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <Search />
                    <UserNav />
                </div>
            </div>
        </div>
    )
}

// TODO: factor this out to common
export interface UserProfile {
    username: string;
    email: string;
}

function UserNav() {

    const [profile, setProfile] = useState<UserProfile | null>();
    const router = useRouter();

    const logoutAndRedirect = () => {
        logout();
        router.push("/");
    }

    useEffect(() => {
        const setup = async() => {
            let profile = await getProfile();
            if (profile) {
                setProfile(profile);
            } else {
                router.push("/");
            }
        }
        setup();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                        <AvatarFallback>{profile?.username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profile?.username}</p>
                        <p className="text-muted-foreground text-xs leading-none">
                            {profile?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutAndRedirect}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {[
                { href: "/dashboard", label: "Overview" },
                { href: "/feedback", label: "Feedback" },
                { href: "/forum", label: "Forum" },
                { href: "/review/", label: "Review" },
                { href: "/posts", label: "Posts" },
                { href: "/category", label: "Categories" },
                { href: "/settings", label: "Settings" },
            ].map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        "hover:text-primary text-sm font-medium transition-colors",
                        pathname === href ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}

export default MainNav;

function Search() {
    return (
        <div>
            <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
            />
        </div>
    )
}
