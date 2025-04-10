"use client";
import { postRequest, request } from "@/api/config";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface ListingUser {
    username:   string;
    email:      string;
    role:       string;
    isVerified: boolean,
    category:   string,
    createdAt:  Date,
    id:         number,
}

const UsersPage = () => {

    const [users, setUsers] = useState<ListingUser[]>([]);
    const [error, setError] = useState("");

    const setup = async () => {
        const response = await request('auth/users');
        if (response.error) {
            setError(response.message);
            return;
        }
        setError("");
        setUsers(response);
    }

    const updateUserRole = async(userId: number, newRole: string) => {
        const response = await postRequest('auth/users/role',
            JSON.stringify({ userId: userId, userRole: newRole }));
        toast.info(`User ${response.username} role updated to ${response.role}`);
    }

    useEffect(() => {
        setup();
    }, []);

    return (
        <div className="w-full h-full overflow-hidden bg-background text-foreground">
            <div className="w-2xl mx-auto flex flex-col gap-4 my-10">
                <div className="text-4xl font-semibold mb-4">Users Listing</div>
                {
                    error && <div className="text-destructive-foreground">{error}</div>
                }
                {
                    users.map((user, i) => (<div key={i} className="p-4 rounded-md border-2 border-muted">
                        <div className="text-2xl font-semibold capitalize flex gap-2 items-baseline">{user.username}
                            <span className="text-muted-foreground text-xl">({user.category})</span>
                            <div className={`ml-auto px-2 py-0.1 text-sm font-normal rounded-full ${user.isVerified ? "bg-green-800" : "bg-red-800"} text-white lowercase`}>
                                {user.isVerified ? "verfied" : "not verified"}
                            </div>
                        </div>
                        <div className="text-base">{user.email}</div>
                        <div className="text-base flex gap-2 text-muted-foreground">
                            <span>joined on</span>
                            {new Intl.DateTimeFormat("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }).format(new Date(user.createdAt ?? ""))}
                        </div>
                        <Separator className="my-4" />

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="text-base mb-1 font-semibold">Change Role</div>
                                <Select onValueChange={(role) => updateUserRole(user.id, role)}>
                                    <SelectTrigger className="w-md">
                                        <SelectValue placeholder={user.role} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="moderator">Moderator</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end justify-between">
                                <div className="text-base mb-1 font-semibold">Change Category</div>
                                <Select onValueChange={(category) => console.log(category)}>
                                    <SelectTrigger className="w-md">
                                        <SelectValue placeholder={user.category} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                        <SelectItem value="leadership">Leadership</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
};

export default UsersPage;
