"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/api/categories";
import { fetchFeedbacks } from "@/api/feedback";
import { Category, SubCategory  } from "@/store/categoryStore";
import { Feedback } from "@/components/MainDashboard/RecentFeedbacks";

const CategoryCard = ({ category, subcategory, feedbacks }: { category: Category, subcategory: SubCategory, feedbacks: Feedback[] }) => {
    const router = useRouter();
    
    return (
        <div className="flex flex-col items-start">
            <div 
                className={cn("outline-foreground/20 bg-foreground/2 rounded-2xl px-10 py-12 outline",
                    "w-xs flex flex-col items-center justify-center gap-4",
                    "hover:bg-foreground/5 shadow-sm transition-colors")}
                onClick={() => router.push(`review/${category.id}/${subcategory.id}`)}
            >
                <Image src={"/icons/teacher.png"} width={100} height={200} alt={subcategory.name} className="h-auto w-24" />
                <div className="text-center text-lg font-semibold capitalize">{subcategory.name}</div>
            </div>

            {/* Show feedbacks under each subcategory */}
            <div className="mt-4 space-y-2">
                {feedbacks.length > 0 ? (
                    feedbacks.map(feedback => (
                        <div key={feedback.id} className="p-4 bg-muted rounded-lg shadow-sm">
                            <p className="text-sm font-medium">{feedback.title}</p>
                            <p className="text-xs text-muted-foreground">{feedback.author.username}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-muted-foreground">No feedback yet</p>
                )}
            </div>
        </div>
    );
};

const ReviewPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [feedbacksBySubcategory, setFeedbacksBySubcategory] = useState<{ [key: string]: Feedback[] }>({});

    useEffect(() => {
        const setup = async () => {
            const categoryData = await getAllCategories();
            setCategories(categoryData);

            const feedbackData = await fetchFeedbacks();

            // Group feedbacks by subcategory ID
            const groupedFeedbacks: { [key: string]: Feedback[] } = {};
            feedbackData.forEach((feedback: Feedback) => {
                const subcategoryId = feedback.subcategory.id ?? 0;
                if (!groupedFeedbacks[subcategoryId]) {
                    groupedFeedbacks[subcategoryId] = [];
                }
                groupedFeedbacks[subcategoryId].push(feedback);
            });

            setFeedbacksBySubcategory(groupedFeedbacks);
        };

        setup();
    }, []);

    return (
        <div className={cn("bg-background text-foreground font-inter",
            "flex h-screen w-screen flex-col gap-20", 
            "items-center justify-center overflow-hidden")}
        >
            <ThemeToggle className="absolute right-4 top-4" />
            <div className="flex max-w-3xl flex-col items-center justify-center gap-4 text-center">
                <span 
                    className={cn("bg-[#A1AF001A] font-normal text-[#439E5E] dark:bg-green-800/50",
                        "w-max rounded-2xl px-4 py-2 text-xs uppercase")}
                >
                    ALL REVIEWS POSTED ANONYMOUSLY, GUARANTEED!
                </span>
                <span className="text-4xl font-semibold capitalize">Select the type of review you will submit</span>
            </div>

            <div className="flex max-w-5xl flex-row flex-wrap items-center justify-center gap-8">
                {categories.map(category => (
                    <div key={category.id} className="flex flex-col gap-4">
                        <div className="font-semibold text-3xl">{category.name}</div>
                        <div className="flex gap-4">
                            {category.subCategories.map(subcategory => (
                                <CategoryCard 
                                    key={subcategory.id} 
                                    category={category} 
                                    subcategory={subcategory} 
                                    feedbacks={feedbacksBySubcategory[subcategory.id ?? 0] || []} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;
