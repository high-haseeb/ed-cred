"use client";

import { useEffect } from "react";
import { usePostStore } from "@/store/usePostStore";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import { Separator } from "@/components/ui/separator";

export default function PostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const { selectedPost, fetchPost, loading } = usePostStore();
    const router = useRouter();

    useEffect(() => {
        fetchPost(slug);
    }, [slug, fetchPost]);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (!selectedPost) return <div className="text-center p-4">Post not found.</div>;

    return (
        <div>
            <SiteHeader />
            <div className="max-w-2xl mx-auto p-6">
                <button onClick={() => router.back()} className="mb-6 text-blue-500 hover:underline">
                    ← Back to Posts
                </button>
                <h1 className="text-3xl font-bold">{selectedPost.title}</h1>
                <p className="mt-4">{selectedPost.description}</p>
                <p className="text-gray-500 mt-2">
                    {new Intl.DateTimeFormat("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }).format(new Date(selectedPost.createdAt ?? ""))}
                </p>
                <Separator className="my-4" />
                <div dangerouslySetInnerHTML={{__html: selectedPost.body}}></div>
            </div>
        </div>
    );
}
