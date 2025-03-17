"use client";
import { RecentPosts } from "@/components/MainDashboard/RecentPosts";
import { DashboardSidebar } from "@/components/MainDashboard/Sidebar";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePostStore } from "@/store/usePostStore";
import { Separator } from "@/components/ui/separator";
import { title } from "process";
import { PostsListing } from "@/components/Posts/Listing";

const PostListingPage = () => {
    return(
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <div className="font-inter flex flex-col">
                    <SiteHeader />
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
                        </div>
                        <Stats />
                        <Separator />
                        <PostsListing />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
};

const Stats = () => {
    const { posts } = usePostStore();
    
    const StatCard = ({title, value, description}: {title: string, value: string, description?: string}) => {
        return(
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                </CardContent>
            </Card>
        )
    }

    const stats = [
        {
            title: "Total Posts",
            value: posts.length.toString(),
        },
        {
            title: "Active Posts",
            value: posts.filter(post => post.status === "active").length.toString(),
        },
        {
            title: "Draft Posts",
            value: posts.filter(post => post.status === "draft").length.toString(),
        },
        {
            title: "Featured Posts",
            value: posts.filter(post => post.featured).length.toString(),
        },
    ];

    return(
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {
                stats.map((stat, index) => <StatCard {...stat} key={`stat-card-${index}`} />)
            }
        </div>
    )
}

export default PostListingPage;
