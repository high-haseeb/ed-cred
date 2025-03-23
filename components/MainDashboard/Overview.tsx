import { TabsContent } from "@/components/ui/tabs"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "../ui/card"
import { RecentFeedback } from "./RecentFeedbacks"
import { RecentUsers } from "./RecentUsers"
import { RecentPosts } from "./RecentPosts"
import { usePostStore } from "@/store/usePostStore"
import { Stats } from "../common/Stats"
import { useCategoryStore } from "@/store/categoryStore"
import { useEffect, useState } from "react"
import { fetchFeedbacks } from "@/api/feedback"
import { useFeedbacksStore } from "@/store/feedbackStore"

export const OverviewTab = () => {
    const { posts } = usePostStore();
    const { categories, fetchCategories } = useCategoryStore();
    const { feedbacks } = useFeedbacksStore();

    useEffect(() => {
        fetchCategories();
    }, []);

    const stats = [
        {
            title: "Total Feedbacks",
            value: feedbacks.length.toString(),
        },
        {
            title: "Active Feedbacks",
            value: feedbacks.filter(f => f.status === "active").length.toString(),
        },
        {
            title: "Total Posts",
            value: posts.length.toString(),
        },
        {
            title: "Total Categries",
            value: categories.length.toString(),
        },

    ]
    return(
        <TabsContent value="overview" className="space-y-4">
            <Stats stats={stats}/>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <RecentFeedback />
                <Card className="col-span-3 h-max">
                    <CardHeader>
                        <CardTitle>Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentPosts />
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
    )
}
