"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import MultipleChoiceInput, { CategoryInput, QuestionInput, StatusInput, SubCategoryInput, SwitchInput, TitleInput } from "./FeedbackElements";
import { Button } from "../ui/button";

export const FormSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(50, "Title must be under 50 characters"),
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    details: z.object({
        name: z.boolean(),
        country: z.boolean(),
        dates: z.boolean(),
        salary: z.boolean(),
        web: z.boolean(),
    }),
    questionType: z.enum(["rating", "multiple_choice", "true_false", "open_ended"], {
        required_error: "Question type is required",
    }),
    question: z.string(),
    status: z.enum(["active", "inactive"]),
});

const FeedbackForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
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
            question: "",
            status: "inactive",
            questionType: "rating",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="flex flex-grow items-center justify-between bg-white px-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start justify-between w-full gap-10">
                    <div className="flex items-start justify-between w-full gap-10">
                        <div className="flex flex-col gap-6 p-8 outline-stone-300 rounded-md w-1/2">
                            <TitleInput form={form} />
                            <div className="flex gap-2">
                                <CategoryInput form={form} />
                                <SubCategoryInput form={form} />
                            </div>
                            <StatusInput form={form} />
                            <SwitchInput form={form} />
                        </div>
                        <div className="w-0.5 h-[400px] bg-stone-200"></div>
                        <div className="flex flex-col gap-6 p-8 outline-stone-300 rounded-md w-1/2">
                            <QuestionInput form={form} />
                            <MultipleChoiceInput form={form} />
                        </div>
                    </div>
                    <Button type="submit" className="self-end mr-10">submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default FeedbackForm;
