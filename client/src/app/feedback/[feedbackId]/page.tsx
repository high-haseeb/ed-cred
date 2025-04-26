"use client";

import { create } from 'zustand';
import { fetchFeedbackById, fetchFeedbacks } from "@/api/feedback";
import { FeedbackResponse } from "@/api/feedback-response";
import { UserProfile, Category } from "@/types/user";
import { Stats } from "@/components/Common/Stats";
import { Title } from "@/components/Common/Title";
import {  SubCategory } from "@/store/categoryStore";
import { use, useEffect } from "react";
import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/api/config";


// useFeedbackStore.ts
export const useFeedbackStore = create((set, get) => ({
    feedback: {},
    id: 0,

    setId: (id) => set({ id }),

    fetchFeedbacks: async () => {
        const { id } = get();
        const response = await fetchFeedbackById(id);
        set({ feedback: response });
    },

    setFeedback: (feedback) => set({ feedback }), // directly update the feedback
}));

// PostPage component
export default function PostPage({ params }: { params: Promise<{ feedbackId: string }> }) {

    const { feedbackId } = use(params);
    const { feedback, fetchFeedbacks, setId, setFeedback } = useFeedbackStore();

    useEffect(() => {
        setId(feedbackId);
        fetchFeedbacks();
    }, [feedbackId]);

    const stats = [
        {
            title: "Total responses",
            value: feedback.responses ? feedback?.responses.length.toString() : "0",
        }
    ];

    return (
        <div className="w-full mx-auto my-10 flex flex-col px-40">
            <Title 
                title={feedback?.title ?? ""}
                desc={`created by ${feedback.author ? feedback?.author.name : ""} on ${feedback.createdAt ? new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" }).format(new Date(feedback?.createdAt ?? new Date)) : ""}`}
            />
            <Stats stats={stats} />
            <FeedbackResponsesTable responses={feedback?.responses || []} />
        </div>
    );
}

// Accept or delete feedback function
export async function deleteFeedback(responseId: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const res = await fetch(`${API_BASE_URL}/feedback-responses/${responseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete: ${res.statusText}`);
    }
}

export async function acceptFeedback(responseId: string): Promise<any> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const res = await fetch(`${API_BASE_URL}/feedback-responses/${responseId}/accept`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to accept: ${res.statusText}`);
    }

    return res.json();
}

// Feedback Responses Table
const FeedbackResponsesTable = ({ responses }: { responses: FeedbackResponse[] }) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const { fetchFeedbacks, setFeedback } = useFeedbackStore();

    const detailKeys = useMemo(() => {
        if (responses.length === 0) return [];
        return Object.keys(responses[0].details || {});
    }, [responses]);

    const formatValue = (key: string, value: any) => {
        if (key === "reportingPeriod" && value) {
            const formatter = new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            return `${formatter.format(new Date(value.from))} to ${formatter.format(new Date(value.to))}`;
        }
        return String(value);
    };

    const filteredResponses = useMemo(() => {
        return responses.filter((response) => {
            const submittedBy = response.author?.username || "Anonymous";
            if (
                filters["Submitted by"] &&
                    !submittedBy.toLowerCase().includes(filters["Submitted by"].toLowerCase())
            ) {
                return false;
            }

            for (const key of detailKeys) {
                const val = formatValue(key, response.details[key]);
                if (
                    filters[key] &&
                        !val.toLowerCase().includes(filters[key].toLowerCase())
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [responses, filters, detailKeys]);

    if (!responses || responses.length === 0) {
        return <p className="text-muted-foreground">No responses available.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Submitted by</TableHead>
                    {detailKeys.map((key) => (
                        <TableHead key={key} className="capitalize">{key}</TableHead>
                    ))}
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>

                {/* Filters Row */}
                <TableRow>
                    <TableCell>
                        <Input
                            placeholder="Filter..."
                            value={filters["Submitted by"] || ""}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    ["Submitted by"]: e.target.value,
                                }))
                            }
                        />
                    </TableCell>
                    {detailKeys.map((key) => (
                        <TableCell key={key}>
                            <Input
                                placeholder="Filter..."
                                value={filters[key] || ""}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        [key]: e.target.value,
                                    }))
                                }
                            />
                        </TableCell>
                    ))}
                    <TableCell />
                </TableRow>
            </TableHeader>

            <TableBody>
                {filteredResponses.map((response) => (
                    <TableRow key={response.id}>
                        <TableCell>{response.author ? response.author.username : "Anonymous"}</TableCell>
                        {detailKeys.map((key) => (
                            <TableCell key={key}>{formatValue(key, response.details[key])}</TableCell>
                        ))}
                        <TableCell className="text-right space-x-2">
                            {
                                response.accepted ? <div className="flex gap-2 items-center ml-auto"><div className="text-green-800 text-semibold text-lg">Accepted</div> 
                                    <Button size="sm" variant="destructive" onClick={async () => {
                                        await deleteFeedback(response.id);
                                        fetchFeedbacks();
                                    }}>
                                        Delete
                                    </Button>
                                </div> :
                                    <>
                                        <Button size="sm" onClick={async () => {
                                            await acceptFeedback(response.id);
                                            fetchFeedbacks();
                                        }}>Accept</Button>
                                        <Button size="sm" variant="secondary" className="text-black">
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={async () => {
                                            await deleteFeedback(response.id);
                                            fetchFeedbacks();
                                        }}>
                                            Delete
                                        </Button>
                                    </>
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
