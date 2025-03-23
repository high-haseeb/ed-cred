"use client";
import { Post } from "@/api/posts";
import { SiteHeader } from "@/components/MainDashboard/SiteHeader";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePostStore } from "@/store/usePostStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const SettingsPage = () => {
    const { posts, fetchPosts } = usePostStore();
    useEffect(() => {
        fetchPosts();
    }, []);

    return(
        <div className="bg-background text-foreground h-screen w-full flex flex-col">
            <div className="w-full"><SiteHeader /></div>
            <div className="w-full py-10 px-20 flex flex-col gap-10 items-start justify-center w-full">
                <div>
                    <h1 className="font-semibold text-3xl">Blog</h1>
                    <p className="text-sm text-muted-foreground">this is our blog page</p>
                </div>
                <div className="grid grid-cols-4 gap-10 w-full">
                    {
                        posts.map((post, i) => <PostPreview post={post} key={post.id} />)
                    }
                </div>
            </div>
        </div>
    )
}

const PostPreview = ({ post }: { post: Omit<Post, "body"> }) => {
    return(
        <Link href={`posts/${post.id}`}>
            <Card className="w-full max-w-2xl hover:bg-muted relative">
                <CardHeader>
                    <CardTitle>
                        <div>
                            {
                                post.featured ? <div className="bg-green-200 rounded-full border-green-400 border w-max absolute top-8 right-8 font-normal text-sm px-4">featured</div> : null
                            }
                            <Image src={"/image1.png"} width={1024} height={720} alt={post.title} className="object-cover w-full aspect-[4/3] bg-white rounded-md mb-4" />
                            <h2 className="font-semibold text-lg">{post.title}</h2>
                            <p className="text-sm text-muted-foreground truncate text-wrap line-clamp-1">{post.description}</p>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex flex-col items-start">
                    <div className="text-sm text-muted-foreground">high-haseeb</div>
                    <p className="text-sm text-muted-foreground">
                        {new Intl.DateTimeFormat("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }).format(new Date(post.createdAt ?? ""))}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default SettingsPage;
