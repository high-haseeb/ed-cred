"use client";
import { useEffect, useState } from "react";
import { fetchFeedbacks } from "@/api/feedback";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import { RecentFeedback } from "@/components/MainDashboard/RecentFeedbacks";
import { Stats } from "@/components/common/Stats";
import { useRouter } from "next/navigation";

export default function FeedbacksPage() {
    const [feedbacks, setFeedbacks] = useState<any[]>([]);

    useEffect(() => {
        async function loadFeedbacks() {
            const data = await fetchFeedbacks();
            setFeedbacks(data);
        }
        loadFeedbacks();
    }, []);
    const stats = [
        {
            title: "Total feedbacks",
            value: feedbacks.length.toString(),
        }, 
        {
            title: "Active Feedbacks",
            value: feedbacks.filter(s => s.status === "active").length.toString(),
        }
    ];

    const router = useRouter();

    return (
        <div className="w-full bg-background">
            <SiteHeader />
            <div className="flex flex-col items-center">
                <div className="p-10 flex flex-col gap-10 w-4xl">
                    <button onClick={() => router.back()} className="text-blue-500 hover:underline w-full text-left">
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-semibold">Feedbacks</h1>
                    <Stats stats={stats}/>
                    <RecentFeedback />

                </div>
            </div>
        </div>
    );
}
