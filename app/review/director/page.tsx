import { cn } from "@/lib/utils";
import { ReviewHeader } from "@/components/Review/ReviewHeader";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import { FeedbackForm } from "@/components/Review/FeedbackForm";
import questions from "./questions";
import SchoolInformationForm from "@/components/Review/SchoolInformationForm";

const DirectorReview = () => {
    return(
        <div className={cn("bg-background text-foreground overflow-x-hidden",
                            "flex w-full flex-col items-center justify-center")}>
            <header className="w-full"><SiteHeader /></header>
            <ReviewHeader 
                title="review your school"
                desc="Please Rate Each Item on a Scale of 1 - 5 Apples. Top Rating = 5 Apples
Your review will be posted anonymously unless you expressly tell us otherwise" 
            />
            <FeedbackForm questions={questions} color="green" /> 
        </div>
    )
}

export default DirectorReview;
