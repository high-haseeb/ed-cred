"use client";
import { getProfile, setUserCategory } from "@/api/auth";
import { Category, useCategoryStore } from "@/store/categoryStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignupCategorySelectPage = () => {

    const { categories, fetchCategories } = useCategoryStore();

    useEffect(() => {
        // Check if the user has already selected a category.
        // If they are already assigned to a category, they 
        // should not be able to change it.

        fetchCategories();
    }, []);

    return (
        <main className="w-full h-screen font-inter flex flex-col gap-10 items-center justify-center">
            <div className="w-lg text-center">
                <div className="font-semibold text-3xl">Select Category</div>
            </div>
            <div className="flex flex-wrap gap-6">
            {
                categories.map((category) => <CategoryCard category={category} key={category.id} />)
            }
            </div>
        </main>
    )
}

const CategoryCard = ({ category } : { category: Category }) => {
    const router = useRouter();
    const selectCategory = async () => {

        if (!category.id) {
            console.error("Category ID is not defined");
            return;
        }

        const response = await setUserCategory(category.id);

        if (response.error) {
            toast.error(response.message);
            return;
        }

        console.log(response.requiresVerification);

        if (response.requiresVerification) {
            router.push("/user/verify/");
        } else {
            router.push("/user/welcome");
        }
    };

    return (
        <div
            className="p-4 border-2 border-muted rounded-md hover:border-primary transition-colors cursor-pointer"
            onClick={selectCategory}
        >
            {category.name}
        </div>
    )
}

export default SignupCategorySelectPage;
