"use client";
import FeedbackForm from '@/components/Dashboard/FeedbackForm';
import SideBar from '@/components/Dashboard/SideBar';
import TopBar from '@/components/Dashboard/TopBar';
import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <div className='w-screen h-screen overflow-hidden flex bg-secondary'>
                <SideBar />
                <div className='flex flex-col flex-grow w-full h-full'>
                    <TopBar />
                    <div className='flex-grow p-10 gap-10 flex flex-col'>
                        <Route />
                        <FeedbackForm />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
};

const Route = () => {
    return (
        <div className='font-semibold text-4xl'>
            Create Feedback
            <br/>
            <div className='text-xl font-[500]'>{ "Feedbacks > Create Feedback" }</div>
        </div>
    )
}

export default Dashboard;
