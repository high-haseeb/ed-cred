"use client"
import { getFeedbackByCategory } from "@/api/feedback";
import { Feedback } from "@/components/MainDashboard/RecentFeedbacks";
import FeedbackForm from "@/components/Review/FeedbackForm";
import { LoaderIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function ReivewPage({ params }: { params: Promise<{ category: string; subcategory: string; }> }) {
    const { category, subcategory } = use(params);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function loadFeedbacks() {
            const data = await getFeedbackByCategory(category, subcategory);
            console.log(data);
            if (data.error || data.length == 0) {
                setNotFound(true);
                return;
            }
            setFeedbacks(data);
        }
        loadFeedbacks();
    }, []);

    return(
        <div className="bg-background text-foreground h-auto">
            <div className="flex h-screen w-full items-center justify-center">
                {
                    notFound ? 
                        <div className="text-center text-4xl font-semibold">
                            <div className="text-8xl">404</div>
                            <p className="text-lg">The review you are looking for is not found</p>
                        </div> 
                        :
                        feedbacks.length <= 0 ? 
                            <LoaderIcon className="animate-spin" />
                            :
                            <div className="w-2xl flex h-full flex-col items-start py-10">
                                {
                                    feedbacks.map((feedback) => (
                                        <div key={feedback.id} className="w-full">
                                            <div>
                                                <div className="text-3xl font-semibold">{feedback.title}</div>
                                                <p className="text-muted-foreground text-base font-normal">
                                                    published by <span className="font-semibold">{feedback.author.username}</span>
                                                </p>
                                                <p className="text-muted-foreground text-base font-normal lowercase">
                                                    on {new Intl.DateTimeFormat("en-US", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    }).format(new Date(feedback.createdAt ?? ""))}
                                                </p>
                                            </div>

                                            <FeedbackForm feedback={feedback} />
                                        </div>
                                    )
                                    )}
                            </div>
                }
            </div>
        </div>
    )
}
