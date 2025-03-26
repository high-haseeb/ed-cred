"use client"
import { getFeedbackByCategory } from "@/api/feedback";
import { Feedback } from "@/components/MainDashboard/RecentFeedbacks";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import FeedbackForm from "@/components/Review/FeedbackForm";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function ReivewPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function loadFeedbacks() {
            const data = await getFeedbackByCategory(category);
            console.log(data);
            if (data.error) {
                setNotFound(true);
                return;
            }
            setFeedbacks(data);
        }
        loadFeedbacks();
    }, []);

    return(
        <div className="bg-background text-foreground h-auto">
            <SiteHeader />
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

                                            <div className="outline-muted rounded-md p-6 outline-2 flex flex-col w-full mt-10 gap-4">
                                                <Input type="text" placeholder="your name"/>
                                                { feedback.details.name ? <Input type="text" placeholder="your name" /> : null }
                                                { feedback.details.web ? <Input type="text" placeholder="website" /> : null }
                                                { feedback.details.dates ? <Input type="text" placeholder="dates you worked there" /> : null }
                                                { feedback.details.salary ? <Input type="text" placeholder="your estimated salary" /> : null }
                                                { feedback.details.country ? <Input type="text" placeholder="your country" /> : null }
                                            </div>
                                            <FeedbackForm questions={feedback.questions} />
                                        </div>
                                    )
                                )}
                            </div>
                }
            </div>
        </div>
    )
}
