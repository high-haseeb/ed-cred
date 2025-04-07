"use client";
import { useState, useEffect } from "react";
import { BaseUser } from "./../../../../shared/types/user"
import { getProfile } from "@/api/auth";
import { BadgeCheckIcon, BadgeMinusIcon } from "lucide-react";

const ProfilePage = () => {

    const [profile, setProfile] = useState<BaseUser | null>(null);

    useEffect(() => {
        const fetchProfile = async() => {
            const response = await getProfile();
            setProfile(response);
        }
        fetchProfile();
    }, []);

    return (
        <div className="w-full h-screen content-center space-y-8">

            <div className="border-2 border-muted rounded-md p-4 w-lg mx-auto">
                <div className="font-semibold text-4xl flex items-center gap-4">
                    <div className="w-18 h-18 min-w-18 min-h-18 rounded-full bg-foreground flex items-center justify-center text-background">
                        {profile?.name.slice(0, 2)}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-4 items-center">
                            <div className="capitalize">{profile?.name}</div>
                            {profile?.isVerified ? <BadgeCheckIcon stroke="green" /> : <BadgeMinusIcon stroke="red" />}
                        </div>
                        <p className="text-base text-muted-foreground">{profile?.email}</p>
                    </div>
                </div>
            </div>


            <div className="border-2 border-muted rounded-md p-4 w-lg mx-auto">
                <div className="text-3xl flex gap-4">
                    Subscription Plan
                    <div>{profile?.subscription.status}</div>
                </div>
                <div className="text-3xl flex gap-4">
                    Role
                    <div>{profile?.role}</div>
                </div>
                <div className="text-3xl flex gap-4">
                    Category
                    <div>{profile?.category}</div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
