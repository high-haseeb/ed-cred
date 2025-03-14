"use client";
import Route from '@/components/common/Route';
import FeedbackForm from '@/components/Dashboard/FeedbackForm';
import SideBar from '@/components/Dashboard/SideBar';
import TopBar from '@/components/Dashboard/TopBar';
import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <div className="bg-white relative flex flex-col h-screen w-screen overflow-hidden pl-[300px] pt-12 font-inter">
                <SideBar />
                <TopBar />
                <Route route={["feedback", "create feedback"]} />
                <FeedbackForm />
            </div>
        </ProtectedRoute>
    )
};

export default Dashboard;
