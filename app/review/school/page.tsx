"use client";
import { cn } from "@/lib/utils";
import { ReviewHeader } from "@/components/Review/ReviewHeader";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import { FeedbackForm } from "@/components/Review/FeedbackForm";
import SchoolInformationForm from "@/components/Review/SchoolInformationForm";
import { useFeedbacksStore } from "@/store/feedbackStore";
import { useEffect } from "react";

const SchoolReview = () => {
    const { feedbacks, fetchFeedbacks } = useFeedbacksStore();

    console.log(feedbacks[0]);
    useEffect(() => {
        fetchFeedbacks();
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
