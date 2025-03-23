"use client";
import Route from '@/components/common/Route';
import FeedbackForm from '@/components/Dashboard/FeedbackForm';
import QuestionsList from '@/components/Dashboard/QuestionsList';
import SideBar from '@/components/Dashboard/SideBar';
import { DashboardSidebar } from '@/components/MainDashboard/Sidebar';
import { SiteHeader } from '@/components/MainDashboard/SiteHeader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <SidebarProvider>
                <DashboardSidebar />
                <SidebarInset>
                    <div className="bg-background relative flex flex-col overflow-x-hidden font-inter">
                        <SiteHeader />
                        <Route route={["feedback", "create feedback"]} />
                        <FeedbackForm />
                        <QuestionsList />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    )
};

export default Dashboard;
