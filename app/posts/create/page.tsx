"use client";
import { OverviewTab } from "@/components/MainDashboard/Overview";
import { DashboardSidebar } from "@/components/MainDashboard/Sidebar";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import CreatePost from "@/components/Posts/CreatePost";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const Dashboard = () => {
    return(
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <div className="font-inter flex flex-col">
                    <SiteHeader />
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Create Post</h2>
                        </div>
                    </div>
                </div>
                <CreatePost />
            </SidebarInset>
        </SidebarProvider>
    )
};
export default Dashboard;
