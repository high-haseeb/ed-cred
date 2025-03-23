"use client";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/categoryStore";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/MainDashboard/Sidebar";
import { CategoryTable } from "@/components/Category/CategoryTable";
import { AddCategory } from "@/components/Category/AddCategory";
import { Stats } from "@/components/common/Stats";
import { useRouter } from "next/navigation";

const CategoryPage = () => {
    const { categories, fetchCategories, addCategory } = useCategoryStore();
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"active" | "draft">("active");

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!name) return alert("Category name is required!");
        await addCategory({ name, status, permissions: ["post"] });
        setName(""); // Clear input after adding
    };

    const stats = [
        {
            title: "Total Categories",
            value: categories.length.toString(),
        },
        {
            title: "Active Categories",
            value: categories.filter(c => c.status === "active").length.toString(),
        },
        {
            title: "Draft Categories",
            value: categories.filter(c => c.status !== "active").length.toString(),
        },
    ];

    const router = useRouter();
    return (
        <ProtectedRoute>
            <div className="bg-background text-foreground relative flex flex-col overflow-x-hidden font-inter">
                <SiteHeader />
                <div className="flex flex-col gap-4 p-10 items-center">
                    <div className="flex flex-col gap-8 w-4xl">
                        <button onClick={() => router.back()} className="text-blue-500 hover:underline w-full text-left">
                            ← Back to Dashboard
                        </button>
                        <h1 className="font-semibold text-3xl w-full text-left">Categories</h1>
                        <Stats stats={stats} />
                        <AddCategory />
                        <CategoryTable />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default CategoryPage;
