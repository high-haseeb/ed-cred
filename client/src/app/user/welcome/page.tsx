"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { getProfile } from "@/api/auth"

export default function WelcomePage() {
    const router = useRouter()

    const [user, setUser] = useState<any>();
    useEffect(() => {
        const setup = async() => {
            const user = await getProfile();
            setUser(user);
        }
        setup();
    }, []);

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-16 h-16">
                            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className="text-2xl font-semibold">
                        Welcome, {user.username}! 🎉
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <p className="text-gray-600 text-sm">
                        You’ve successfully joined Ed Cred. Start by exploring schools or leaving your first review!
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button onClick={() => router.push("/schools")}>Explore Schools</Button>
                        <Button variant="outline" onClick={() => router.push("/review")}>
                            Leave a Review
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
