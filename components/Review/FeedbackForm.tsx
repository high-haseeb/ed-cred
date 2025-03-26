"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AppleIcon, OctagonAlertIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Question } from "@/store/questionStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export const FeedbackForm = ({ questions, color = "red" }: { questions: Question[], color?: string }) => {
    const [responses, setResponses] = useState<{ [key: string]: any }>({});

    const handleResponseChange = (id: string, value: any) => {
        setResponses((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        console.log("Submitted Feedback:", responses);
        toast("Feedback submitted!");
    };

    return (
        <div className="w-full mb-20 flex max-w-4xl flex-col gap-4 py-10">
            {questions.map((question, index) => (
                <div className={`outline-2 outline-muted flex ${question.type != "rating" ? "flex-col" : ""} w-full justify-between rounded-md p-4`} key={`feedback-question-${index}`}>
                    <p className="mb-2 font-medium">{question.text}</p>
                    <QuestionInput
                        question={question}
                        color={color}
                        onChange={(value) => handleResponseChange(question.id, value)}
                    />
                </div>
            ))}

            {/* Additional Comments */}
            <div className="my-8 space-y-2">
                <Label className="flex flex-col items-start gap-1">
                    <div>Please add your comments below</div>
                    <div className="text-muted-foreground text-sm">Feedback with comments takes top priority!</div>
                </Label>
                <Textarea onChange={(e) => handleResponseChange("comments", e.target.value)} />
            </div>

            {/* AI Review Warning */}
            <div className={cn("bg-destructive/10 dark:bg-destructive/20 border-destructive-foreground",
                "text-destructive-foreground flex gap-2 rounded-md p-4 text-sm")}>
                <OctagonAlertIcon size={18} />
                <div>Please avoid submitting AI-generated reviews. The human experience is what Ed Cred is all about!</div>
            </div>

            {/* Submission Terms */}
            <div className="text-sm text-muted-foreground">
                Conditions of Submission: Your School Review is anonymous, even to us at ISR. We cannot delete, change, or edit Reviews. Submission is irreversible. By clicking the Submit button, you confirm that you AGREE to abide by our Terms of Use.
            </div>

            {/* Submit Button */}
            <Button size={"lg"} onClick={handleSubmit}>
                Submit Feedback
            </Button>
        </div>
    );
};

// Dynamically renders the correct input type based on the question type
const QuestionInput = ({ question, color, onChange }: { question: Question, color: string, onChange: (value: any) => void }) => {
    switch (question.type) {
        case "rating":
            return <RatingInput color={color} onChange={onChange} />;
        case "multiple_choice":
            return (
                <RadioGroup onValueChange={(value) => onChange(value)} className="ml-auto">
                    {question.options?.map((option, i) => (
                        <Label key={i} className="flex items-center gap-2">
                            <RadioGroupItem value={option.value} />
                            {option.value}
                        </Label>
                    ))}
                </RadioGroup>
            );
        case "true_false":
            return (
                <RadioGroup onValueChange={(value) => onChange(value === "true")}>
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="true" /> True
                    </Label>
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="false" /> False
                    </Label>
                </RadioGroup>
            );
        case "open_ended":
            return <Textarea onChange={(e) => onChange(e.target.value)} />;
        default:
            return null;
    }
};

// Rating Input Component
const RatingInput = ({ color, onChange }: { color: string, onChange: (value: number) => void }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRating = (value: number) => {
        setRating(value);
        onChange(value);
    };

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
                        onClick={() => handleRating(10 - i)}
                    />
                );
            })}
        </div>
    );
};

// Color Variants for Rating Icons
const colorVariants: Record<string, string> = {
    red: "text-red-400 fill-red-400 hover:fill-red-300",
    blue: "text-blue-400 fill-blue-400 hover:fill-blue-300",
    green: "text-green-400 fill-green-400 hover:fill-green-300",
    yellow: "text-yellow-400 fill-yellow-400 hover:fill-yellow-300",
};

export default FeedbackForm;
