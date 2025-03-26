"use client";
import { getProfile } from '@/api/auth';
import { API_BASE_URL } from '@/api/config';
import FeedbackForm from '@/components/Dashboard/FeedbackForm';
import QuestionsList from '@/components/Dashboard/QuestionsList';
import { SiteHeader } from '@/components/MainDashboard/SiteHeader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useFeedbackStore } from '@/store/createFeedbackStore';
import { useQuestionStore } from '@/store/questionStore';
import { ArrowUpFromLineIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Dashboard = () => {
    const router = useRouter();
    return (
        <ProtectedRoute>
            <div className="bg-background relative flex flex-col overflow-x-hidden font-inter">
                <SiteHeader />
                {/* <Route route={["feedback", "create feedback"]} /> */}
                <div className='w-2xl max-w-2xl mx-auto bg-red h-auto _bg-purple-50'>
                    <button onClick={() => router.back()} className="text-blue-500 hover:underline w-full text-left mb-2 mt-10">
                        ← Back to Questions
                    </button>
                    <div className="mt-0 text-3xl font-semibold">Create Feedback Form</div>
                    <p className="text-muted-foreground text-base mb-10">You can create a feedback form. The category refers to the added <a className='text-blue-500' href='/categories'>categories</a> and the subcategory refers to the users role.</p>

                    <FeedbackForm />
                    <QuestionsList />
                    <PublishFeedback />
                </div>
            </div>
        </ProtectedRoute>
    )
};

const PublishFeedback = () => {
    const router = useRouter();
    const { questions } = useQuestionStore();
    const { feedback, resetFeedback } = useFeedbackStore();

    const sendFeedback = async() => {
        const user = await getProfile();
        try {
            const user = await getProfile();
            if (!feedback || questions.length < 2) {
                return;
            }
            const response = await fetch(`${API_BASE_URL}/feedback-form`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( {
                    title: feedback.title,
                    isDraft: feedback.status === "inactive",
                    categoryId: feedback.category.valueOf(),
                    subCategory: feedback.subcategory,
                    details: feedback.details,
                    authorId: user.id,
                    questions: questions 
                }),
            });

            if (!response.ok) {
                toast.error("Failed to save the feedback");
                return;
            }

            resetFeedback();
            router.push("/feedbacks");
        } catch (error) {
            toast(`Error saving the feedback: ${error}`);
            console.error("Error sending questions:", error);
        }
    }

    return (
        <Button 
            variant={"default"} 
            className="font-normal w-full mb-10" 
            onClick={sendFeedback}
        >
            <ArrowUpFromLineIcon />
            Publish Feedback
        </Button>
    )
}

export default Dashboard;
