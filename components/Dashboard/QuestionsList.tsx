"use client";
import { useQuestionStore, Question } from "@/store/questionStore";
import { ChevronDown, PencilIcon, Trash2Icon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const QuestionsList = () => {
    const { questions } = useQuestionStore();
    return(
        <div className="flex flex-col gap-10 px-10 my-10">
            <Separator />
            <div className="font-semibold text-3xl">Added Questions</div>
            <div className="flex flex-col gap-4">
                {
                    questions.map((question, index) => <QuestionListItem question={question} key={question.id} />)
                }

            </div>
        </div>
    )
}

const QuestionListItem = ({ question } : { question: Question}) => {
    const { removeQuestion } = useQuestionStore();
    return(
        <div className="flex flex-col bg-background outline-neutral-200 shadow-sm outline-1 px-8 py-4 rounded-md">
            <div className="flex gap-2 items-center justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Question Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Preview</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="px-2 py-1 rounded-md text-sm rounded border border-primary capitalize">{question.type.replace("_", " ")}</div>
                <div className="self-end ml-auto flex gap-2">
                    <Button variant={"secondary"} onClick={() => console.log("edit this question!")}>
                        <PencilIcon />
                        Edit
                    </Button>
                    <Button variant={"destructive"} className="cursor-pointer" onClick={() => removeQuestion(question.id)}>
                        <Trash2Icon />
                        Delete
                    </Button>
                </div>
            </div>
            <Separator className="my-4" />
            {question.text} 
        </div>
    )
}

export default QuestionsList;
