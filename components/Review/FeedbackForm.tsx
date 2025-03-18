"use client";
import { cn } from "@/lib/utils";
import { AppleIcon, OctagonAlertIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

type QuestionType = "rating" | "multiple_choice" | "true_false" | "open_ended";

export interface FeedbackQuestion {
    question: string;
    type?: QuestionType;
}

export const FeedbackForm = ({ questions, color = "red" }: { questions: FeedbackQuestion[], color?: string }) => {
    return (
        <div className="w-4xl mb-20 flex max-w-4xl flex-col gap-4 py-10">
            {
                questions.map((question, index) => (
                    <div
                        className={cn("bg-muted flex w-full items-center justify-between",
                                      "rounded-md p-4")} 
                        key={`feedback-question-${index}`}
                    >
                        {question.question}
                        {question.type !== "rating" ? <RatingInput color={color} key={`rating-input-${index}`} /> : null}
                    </div>
                ))
            }
            <div className="my-8 space-y-2">
                <Label className="flex flex-col items-start gap-1">
                    <div>Please add your comments below</div>
                    <div className="text-muted-foreground text-sm">Feedback with comments take top priority!</div>
                </Label>
                <Textarea />
            </div>

            <div className={cn("bg-destructive/10 dark:bg-destructive/20 border-destructive-foreground",
                                "text-destructive-foreground flex gap-2 rounded-md p-4 text-sm")}>
                <OctagonAlertIcon size={18}/>
                <div>Please avoid submitting AI generated reviews. The human experience is what Ed Cred is all about!</div>
            </div>
            <div className="text-sm text-muted-foreground">
                Conditions of Submission: Before you Submit your Review to ISR, please be certain the contents of your Review are exactly what you intend to share with the International teaching community. Your School Review is anonymous, even to us at ISR. For this reason we are not able to respond to requests to delete, change, or edit Reviews. Submission of a Review is an irreversible action. By clicking the Submit button you Confirm that you AGREE to abide by our Terms of Use. (Your Review will remain intact if you wish to reread the Terms of Use.)
            </div>
            <Button 
                size={"lg"}
                onClick={() => {
                    toast("feedback submitted!");
                    // take somewhere else from here!
                }}
            >
                Submit Feedback
            </Button>
        </div>
    )
}

const colorVariants: Record<string, string> = {
    red: "text-red-400 fill-red-400 hover:fill-red-300",
    blue: "text-blue-400 fill-blue-400 hover:fill-blue-300",
    green: "text-green-400 fill-green-400 hover:fill-green-300",
    yellow: "text-yellow-400 fill-yellow-400 hover:fill-yellow-300",
};

const RatingInput = ({ color }: { color: string }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 10 }).map((_, i) => {
                const isActive = rating >= 10 - i;
                const isHovered = hoverRating >= 10 - i;

                return (
                    <AppleIcon
                        key={`apple-${i}`}
                        className={cn(
                            colorVariants[color] || "text-gray-400 fill-gray-400 hover:fill-gray-300",
                            isActive ? "fill-current" : isHovered ? "fill-opacity-70" : "fill-opacity-30"
                        )}
                        onMouseOver={() => setHoverRating(10 - i)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(10 - i)}
                    />
                );
            })}
        </div>
    );
};

export default RatingInput;
