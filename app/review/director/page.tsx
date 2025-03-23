import { cn } from "@/lib/utils";
import { ReviewHeader } from "@/components/Review/ReviewHeader";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import { FeedbackForm } from "@/components/Review/FeedbackForm";
import questions from "./questions";

const DirectorReview = () => {
    return(
        <div className={cn("bg-background text-foreground overflow-x-hidden",
                            "flex w-full flex-col items-center justify-center")}>
            <header className="w-full"><SiteHeader /></header>
            <ReviewHeader 
                title="Director Report Card"
                desc="Your Director Report will be posted anonymously unless you expressly tell us otherwise" 
            />
            <FeedbackForm questions={questions} color="green" /> 
        </div>
    )
}

export default DirectorReview;
