"use client";

import { useForm } from "react-hook-form";
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
    QuestionTypeInput
} from "./FeedbackElements";
import { Button } from "../ui/button";

export const FormSchema = z.object({
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
    }),

    question: z.string().min(4, "The question needs to be atleast 4 characters!"),
    questionType: z.enum(["rating", "multiple_choice", "true_false", "open_ended"], {
        required_error: "Question type is required",
    }),
    questionOptions: z.array(z.object({value: z.string().min(2, "The option must be altest 2 characters!")})).min(2, "atlest two options are required").optional(),
    questionCorrectAnswer: z.string().optional(),
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
            questionOptions: [{ value: "default value"}]
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="flex flex-grow items-center justify-between bg-white px-10">
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
                        </div>
                        <div className="flex w-1/2 flex-col gap-6 pl-10 outline-stone-300">
                            <QuestionSelectInput form={form} />
                            <QuestionTypeInput form={form} />
                            <QuestionInput form={form} />
                        </div>
                    </div>
                    <Button type="submit" className="mr-10 self-end">submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default FeedbackForm;
