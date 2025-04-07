"use client";
import { useEffect } from "react";
import { OverviewTab } from "@/components/MainDashboard/Overview";
import { SideMenu } from "@/components/Common/SideMenu";
import { Navbar } from "@/components/Common/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getProfile } from "@/api/auth";
import { redirect } from "next/navigation";

const Dashboard = () => {

    const checkStatus = async() => {
        const user = await getProfile();
        console.log(user.role);
        if (user.role !== "admin") {
            redirect("/");
        }
    }

    useEffect(() => {
        checkStatus();
    }, []);

    return(
        <SidebarProvider>
            <SideMenu />
            <SidebarInset>
                <div className="font-inter flex flex-col">
                    <Navbar />
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        </div>
                        <OverviewTab />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
};
export default Dashboard;
