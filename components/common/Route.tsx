import { ChevronRightIcon, EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Route = ({ route }: { route: string[] }) => {
    return(
        <div className="flex items-start justify-between bg-neutral-300 px-10 py-10 capitalize text-gray-800">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-semibold">{route[route.length - 1]}</div>
                <div className="flex w-max items-center justify-center gap-1 rounded-full bg-white px-4 py-0.5 text-sm font-normal outline outline-gray-400">
                    {
                        route.map((path, index) => (
                            <div className="flex items-center justify-center" key={`breadcrumbs-${index}`}>
                                <Link href={path} className={`${index == route.length - 1 ? "text-black" : "text-gray-600"}`}>
                                    {path}
                                </Link>
                                {index == route.length - 1 ? null : <span className="ml-1"><ChevronRightIcon size={16} stroke="#4a5565" /></span>}
                            </div>
                        )
                        )
                    }
                </div>
            </div>
            <div className="flex w-max items-center justify-center gap-2">
                <Button variant={"secondary"} className="font-normal">
                    <PencilIcon />
                    Edit Feedback
                </Button>
                <Button variant={"secondary"} className="font-normal">
                    <EyeIcon />
                    Preview
                </Button>
            </div>
        </div>
    )
};

export default Route;
