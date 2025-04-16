"use client"

import { useState, useEffect } from "react"
import { getProfile } from "@/api/auth"
import { Category } from "@/store/categoryStore"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface User {
    username: string
    email: string
    category: Category
}

const UserVerifyPage = () => {
    const [user, setUser] = useState<User | null>(null)

    const setup = async () => {
        const user = await getProfile()
        console.log(user)
        setUser(user)
    }

    useEffect(() => {
        setup()
    }, [])

    async function sendVerificationCode() {
        console.log("send the verification email from here")
    }

    async function uploadVerificationDocument() {
        console.log("upload the verification documents to the backend")
    }

    if (!user) {
        return <div className="flex h-screen items-center justify-center text-lg">Loading...</div>
    }

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-sky-50 to-white text-foreground py-12 px-4 flex items-center justify-center">
            <div className="max-w-xl mx-auto space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold capitalize">Welcome, {user.username}!</h1>
                    <p className="text-muted-foreground">
                        You selected the <strong>{user.category.name}</strong> category. This category requires verification. Please choose one of the following options:
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Verify via Email</CardTitle>
                        <CardDescription>Send a verification code to your email: <strong>{user.email}</strong></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={sendVerificationCode}>Send Verification Code</Button>
                    </CardContent>
                </Card>

                <div className="flex items-center gap-3 px-2">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">OR</span>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Verify with Document</CardTitle>
                        <CardDescription>
                            Upload a valid government-issued ID or official document to verify your identity.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" onClick={uploadVerificationDocument}>
                            Upload Document
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default UserVerifyPage
