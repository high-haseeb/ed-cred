"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
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
});

const FeedbackForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "",
            subcategory: "",
            details: {
                name: false,
                country: false,
                dates: false,
                salary: false,
                web: false,
            },
            questionType: "rating",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Form Data:", data);
    };

    return (
        <Card className="w-full flex-grow h-auto shadow-lg rounded-lg">
            <CardContent className="p-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                        {/* Feedback Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Feedback Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter feedback title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category Dropdown */}
                        <div className="flex items-center justify-between w-full gap-10">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="">
                                                <SelectItem value="education">Education</SelectItem>
                                                <SelectItem value="health">Health</SelectItem>
                                                <SelectItem value="technology">Technology</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Subcategory Dropdown */}
                            <FormField
                                control={form.control}
                                name="subcategory"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Subcategory</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a subcategory" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="school">School</SelectItem>
                                                <SelectItem value="hospital">Hospital</SelectItem>
                                                <SelectItem value="software">Software</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Feedback Details (Switches) */}
                        <FormLabel>Feedback Details</FormLabel>
                        <div className="flex gap-10">
                            {["name", "country", "dates", "salary", "web"].map((detail) => (
                                <FormField
                                    key={detail}
                                    control={form.control}
                                    name={`details.${detail}` as any}
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between">
                                            <Label className="capitalize">{detail}</Label>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        {/* Question Type (Radio Group) */}
                        <div className="bg-gray-500/10 p-10 rounded-xl ">
                            <FormField
                                control={form.control}
                                name="questionType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question Type</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <RadioGroupItem value="rating" id="rating" />
                                                    <Label htmlFor="rating">Rating</Label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <RadioGroupItem value="multiple_choice" id="multiple_choice" />
                                                    <Label htmlFor="multiple_choice">Multiple Choice</Label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <RadioGroupItem value="true_false" id="true_false" />
                                                    <Label htmlFor="true_false">True/False</Label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <RadioGroupItem value="open_ended" id="open_ended" />
                                                    <Label htmlFor="open_ended">Open-Ended</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <Button type="submit" className="">
                                Submit Feedback
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default FeedbackForm;
