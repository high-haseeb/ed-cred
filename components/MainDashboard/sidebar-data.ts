import { url } from "inspector"
import {
    BookOpen,
    Bot,
    icons,
    Layers,
    Settings2,
    SquareTerminal,
    StickyNote,
    UserRoundPenIcon,
} from "lucide-react"
import { title } from "process"

export const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: SquareTerminal,
        },
        {
            title: "Categories",
            url: "#",
            icon: Layers,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Posts",
            url: "/posts",
            icon: StickyNote,
            items: [
                {
                    title: "Create Post",
                    url: "/create"
                },
                {
                    title: "Recent Posts",
                    url: "/"
                }
            ]
        },
        {
            title: "Role Management",
            url: "/role-management",
            icon: UserRoundPenIcon,
            items: [
                {
                    title: "Admin User",
                    url: "#",
                },
                {
                    title: "General User",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
}
