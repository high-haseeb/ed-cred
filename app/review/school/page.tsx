"use client";
import { cn } from "@/lib/utils";
import { ReviewHeader } from "@/components/Review/ReviewHeader";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import { FeedbackForm } from "@/components/Review/FeedbackForm";
import SchoolInformationForm from "@/components/Review/SchoolInformationForm";
import { useFeedbacksStore } from "@/store/feedbackStore";
import { useEffect, useState } from "react";
import { Feedback } from "@/components/MainDashboard/RecentFeedbacks";
import { getFeedbackByCategory } from "@/api/feedback";

const SchoolReview = () => {
    const [feedbacks, setFeedback] = useState<Feedback[]>([]);

    useEffect(() => {
        async function loadFeedbacks() {
            const data = await getFeedbackByCategory();
            setFeedbacks(data);
        }
        loadFeedbacks();
    }, []);

    return(
        <div className={cn("bg-background text-foreground overflow-x-hidden",
                            "flex w-full flex-col items-center justify-center")}>
            <header className="w-full"><SiteHeader /></header>
            <ReviewHeader 
                title="review your school"
                desc="Please Rate Each Item on a Scale of 1 - 5 Apples. Top Rating = 5 Apples
Your review will be posted anonymously unless you expressly tell us otherwise" 
            />
            <SchoolInformationForm />
            {feedbacks.length > 0 && <FeedbackForm questions={feedbacks[0].questions} /> } 
        </div>
    )
}

export default SchoolReview;
