"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/Common/ThemeToggle";
import { useEffect, useState } from "react";
import { Category } from "@/store/categoryStore";
import { getAllCategories } from "@/api/categories";

const CategoryCard = ({ category } : { category: Category }) => {
    const router = useRouter();
    return(
        <div className={cn("outline-foreground/20 bg-foreground/2 rounded-2xl px-10 py-12 outline",
            "w-xs flex flex-col items-center justify-center gap-4",
            "hover:bg-foreground/5 shadow-sm transition-colors")}
            onClick={() => router.push(`review/${category.id}`)}
        >
            <Image src={"/icons/teacher.png"} width={100} height={200} alt={category.name} className="h-auto w-24" />
            <div className="text-center text-lg font-semibold capitalize">{category.name}</div>
        </div>
    )
}

const ReviewPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const setup = async() => {
            const data = await getAllCategories();
            setCategories(data);
        }
        setup();
    }, []);

    return(
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
                {
                    categories.map((category, index) => <CategoryCard category={category} key={`category-${index}`} />)
                }
            </div>

        </div>
    )
}

export default ReviewPage;
