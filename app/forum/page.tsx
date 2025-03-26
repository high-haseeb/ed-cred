import { AskQuestionCard } from "@/components/Forum/AskQuestionCard";
import { RecentQuestions } from "@/components/Forum/RecentQuestions";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";

const ForumPage = () => {
    return(
        <div className="w-full bg-background text-foreground">
            <SiteHeader />
            <AskQuestionCard />
            <RecentQuestions />
        </div>
    )
};

export default ForumPage;
