import { create } from "zustand";

type Permission = "post" | "feedback" | "review";

export interface Category {
    id?: number;
    name: string;
    status: "active" | "draft";
    createdAt: Date;
    permissions?: Permission[];
}

interface CategoryStore {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    addCategory: (category: Omit<Category, "createdAt">) => Promise<void>;
    removeCategory: (id: number) => Promise<void>;
}

const API_URL = "http://localhost:6969/categories";

function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");
    
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],

    fetchCategories: async () => {
        try {
            const response = await fetch(API_URL, { headers: getAuthHeaders() });
            if (!response.ok) throw new Error("Failed to fetch categories");
            const data: Category[] = await response.json();
            set({ categories: data });
        } catch (error) {
            console.error(error);
        }
    },

    addCategory: async (category) => {
        try {
            const newCategory = { ...category, createdAt: new Date() };
            const response = await fetch(API_URL, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(newCategory),
            });
            if (!response.ok) throw new Error("Failed to add category");
            const data: Category = await response.json();
            set((state) => ({ categories: [...state.categories, data] }));
        } catch (error) {
            console.error(error);
        }
    },

    removeCategory: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error("Failed to remove category");
            set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }));
        } catch (error) {
            console.error(error);
        }
    },
}));
