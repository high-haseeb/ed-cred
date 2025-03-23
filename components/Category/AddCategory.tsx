"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategoryStore } from "@/store/categoryStore";
import { Button } from "../ui/button";

const FormSchema = z.object({
    name: z.string().min(2, "The category must be at least 2 characters"),
    status: z.enum(["active", "draft"]),
});

export const AddCategory = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            status: "active",
        },
    });

    const { addCategory } = useCategoryStore();
    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        addCategory(data);
    };

    return (
        <div className="ring-2 ring-muted p-4 rounded-md">
            <div className="font-semibold text-xl mb-4">Add Category</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center justify-end gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category name" {...field} maxLength={100} className="w-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="self-end">Submit</Button>
                </form>
            </Form>
        </div>
    );
};
