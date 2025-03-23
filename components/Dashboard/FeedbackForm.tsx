"use client";

import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
    CategoryInput,
    QuestionInput,
    StatusInput,
    SubCategoryInput,
    SwitchInput,
    TitleInput,
    QuestionSelectInput,
    QuestionTypeInput,
    AddQuestion
} from "./FeedbackElements";
import { Button } from "../ui/button";
import { Feedback, useFeedbackStore } from "@/store/createFeedbackStore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export const GeneralFormSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(50, "Title must be under 50 characters"),
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    status: z.enum(["active", "inactive"]),
    details: z.object({
        name: z.boolean(),
        country: z.boolean(),
        dates: z.boolean(),
        salary: z.boolean(),
        web: z.boolean(),
    })
});

export const QuestionFormSchema = z.object({
    question: z.string().min(4, "The question needs to be atleast 4 characters!"),
    questionType: z.enum(["rating", "multiple_choice", "true_false", "open_ended"], {
        required_error: "Question type is required",
    }),
    questionOptions: z.array(z.object({value: z.string().min(2, "The option must be altest 2 characters!")})).optional(),
    questionCorrectAnswer: z.string().optional(),
});

const FeedbackForm = () => {

    const questionForm = useForm<z.infer<typeof QuestionFormSchema>>({
        resolver: zodResolver(QuestionFormSchema),
        defaultValues: {
            question: "",
            questionType: "rating",
        }
    });

    const form = useForm<z.infer<typeof GeneralFormSchema>>({
        resolver: zodResolver(GeneralFormSchema),
        defaultValues: {
            title: "",
            category: "",
            subcategory: "",
            details: {
                name:    false,
                country: false,
                dates:   false,
                salary:  false,
                web:     false,
            },
            status: "inactive",
        },
    });

    const onSubmit = (data: z.infer<typeof GeneralFormSchema>) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="flex items-center justify-between bg-background px-10 my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col items-start justify-between gap-10">
                    <div className="flex w-full items-start justify-between">
                        <div className="flex w-1/2 flex-col gap-6 border-r-2 border-r-stone-200 pr-10 outline-stone-300">
                            <TitleInput form={form} />
                            <div className="flex gap-2">
                                <CategoryInput form={form} />
                                <SubCategoryInput form={form} />
                            </div>
                            <StatusInput form={form} />
                            <SwitchInput form={form} />
                            <SubmitButton form={form} />
                        </div>
                        <div className="flex w-1/2 flex-col gap-6 pl-10 outline-stone-300">
                            <QuestionSelectInput form={questionForm} />
                            <QuestionTypeInput form={questionForm} />
                            <QuestionInput form={questionForm} />
                            <AddQuestion form={questionForm} />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

const SubmitButton = ({ form }: {form: UseFormReturn<z.infer<typeof GeneralFormSchema>>}) => {
    const { setFeedback } = useFeedbackStore();
    const handleFeedbackSave = () => {
        const data = form.getValues();
        const feedback: Feedback = {
            id: uuidv4(),
            ...data,
        };
        setFeedback(feedback);
        toast("Feedback Saved successfully!");
    }
    return (
        <Button disabled={!form.formState.isValid} onClick={handleFeedbackSave}>
            Save Feedback
        </Button>
    )
}

export default FeedbackForm;
