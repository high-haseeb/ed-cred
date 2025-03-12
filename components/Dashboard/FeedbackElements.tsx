"use client";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormSchema } from "./FeedbackForm";
import { useState } from "react";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useQuestionStore } from "@/sotre/questionStore";
import { v4 as uuidv4 } from "uuid";

export const TitleInput = ({ form }: {form: UseFormReturn<z.infer<typeof FormSchema>>}) => {
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Feedback Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter feedback title" {...field} maxLength={100} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const QuestionSelectInput = ({ form }: {form: UseFormReturn<z.infer<typeof FormSchema>>}) => {
    return (
        <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Ask a question" {...field} maxLength={100} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const CategoryInput = ({ form }: {form: UseFormReturn<z.infer<typeof FormSchema>>}) => {
    return (
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
    )
}

export const SubCategoryInput = ({ form }: {form: UseFormReturn<z.infer<typeof FormSchema>>}) => {
    return (
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
    )
}

export const StatusInput = ({ form }: {form: UseFormReturn<z.infer<typeof FormSchema>>}) => {
    return (
        <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>Form Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subcategory" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const SwitchInput = ({ form }: {form: UseFormReturn<z.infer<typeof FormSchema>>}) => {
    return (
        <div className="flex flex-col gap-2">
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
        </div>
    )
}

export const TrueFalseInput = ({ form }: { form: UseFormReturn<any> }) => {
    return (
        <div className="flex flex-col gap-2">
            <Label>True or False</Label>
            <Select
                onValueChange={(value) => form.setValue("trueFalse", value === "true")}
                defaultValue={form.getValues("trueFalse")?.toString()}
            >
                <SelectTrigger className="border p-2 rounded w-full">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="true">True ✅</SelectItem>
                    <SelectItem value="false">False ❌</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export const RatingInput = ({ form }: { form: UseFormReturn<z.infer<any>> }) => {
    return (
        <div className="flex flex-col gap-2">
            <Label>Rating</Label>
            <Select
                onValueChange={(value) => form.setValue("rating", Number(value))}
                defaultValue={form.getValues("rating")?.toString()}
            >
                <SelectTrigger className="border p-2 rounded w-full">
                    <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                            {num} ⭐
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

const MultipleChoiceInput = ({ form }: { form: UseFormReturn<z.infer<any>> }) => {
    const [numberOptions, setNumberOptions] = useState(2);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="font-[500]">Options</span>
                <div className="self-end flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            setNumberOptions((options) => (options > 2 ? options - 1 : options));
                        }}
                    >
                        <MinusIcon />
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            setNumberOptions((options) => options + 1);
                        }}
                    >
                        <PlusIcon />
                    </Button>
                </div>
            </div>

            {[...Array(numberOptions)].map((_, i) => (
                <Input
                    key={i}
                    {...form.register(`options.${i}`)}
                    className="border p-2 rounded w-full mt-1"
                    placeholder={`Option ${i + 1}`}
                    maxLength={50}
                    required={i < 2}
                />
            ))}

            <Label className="block mt-2">Correct Answer</Label>
            <Select
                onValueChange={(value) => form.setValue("correctAnswer", value)}
                defaultValue={form.getValues("correctAnswer")}
            >
                <SelectTrigger className="border p-2 rounded w-full">
                    <SelectValue placeholder="Select the correct answer" />
                </SelectTrigger>
                <SelectContent>
                    {[...Array(numberOptions)].map((_, i) => (
                        <SelectItem key={i} value={form.getValues(`options.${i}`) || `Option ${i + 1}`}>
                            {form.getValues(`options.${i}`) || `Option ${i + 1}`}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export const QuestionInput = ({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) => {
  const { addQuestion } = useQuestionStore();
  const questionType = form.watch("questionType");

  const handleSubmit = () => {
    const data = form.getValues();

    const newQuestion = {
      id: uuidv4(),
      type: data.questionType,
      text: data.question,
      options: data.questionType === "multiple_choice" ? data.options || [] : undefined,
      correctAnswer: data.questionType !== "open_ended" ? data.correctAnswer : undefined,
    };

    addQuestion(newQuestion);
    form.reset(); // Reset form after adding
  };

  return (
    <div className="p-4 border rounded">
      <label className="block mb-2">Question:</label>
      <input
        {...form.register("question")}
        className="border p-2 rounded w-full"
        placeholder="Enter your question..."
      />

      {questionType === "multiple_choice" && (
        <div>
          <label className="block mt-2">Options:</label>
          {[...Array(4)].map((_, i) => (
            <input
              key={i}
              {...form.register(`options.${i}`)}
              className="border p-2 rounded w-full mt-1"
              placeholder={`Option ${i + 1}`}
            />
          ))}

          <label className="block mt-2">Correct Answer:</label>
          <input
            {...form.register("correctAnswer")}
            className="border p-2 rounded w-full"
            placeholder="Enter the correct answer"
          />
        </div>
      )}

      {questionType === "true_false" && (
        <div>
          <label className="block mt-2">Correct Answer:</label>
          <select {...form.register("correctAnswer")} className="border p-2 rounded w-full">
            <option value="">Select Correct Answer</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      )}

      {questionType === "rating" && <div>⭐ Rating Scale (e.g., 1-5)</div>}
      {questionType === "open_ended" && <div>📝 Open-ended Text Response</div>}

      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mt-4">
        Add Question
      </button>
    </div>
  );
};

export default MultipleChoiceInput;
