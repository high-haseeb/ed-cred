import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationLink } from "../ui/pagination";
import { FilterXIcon } from "lucide-react";

const feedbacks = [
    { title: "UI Feedback", category: "Design", subcategory: "UI", status: "active", questions: 5, date: "2024-03-10" },
    { title: "Feature Request", category: "Functionality", subcategory: "Features", status: "inactive", questions: 3, date: "2024-02-25" },
    { title: "Performance Issue", category: "Performance", subcategory: "Speed", status: "active", questions: 8, date: "2024-01-15" },
    { title: "Bug Report", category: "Development", subcategory: "Bugs", status: "inactive", questions: 6, date: "2024-03-05" },
    { title: "Accessibility Feedback", category: "Design", subcategory: "Accessibility", status: "active", questions: 4, date: "2024-03-12" },
    { title: "API Issues", category: "Development", subcategory: "API", status: "inactive", questions: 7, date: "2024-02-18" },
];

export const RecentFeedback = () => {
    const [filteredStatus, setFilteredStatus] = useState("");
    const [filteredCategory, setFilteredCategory] = useState("");
    const [filteredSubcategory, setFilteredSubcategory] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredFeedbacks = feedbacks.filter(fb => 
        (filteredStatus ? fb.status === filteredStatus : true) &&
            (filteredCategory ? fb.category === filteredCategory : true) &&
            (filteredSubcategory ? fb.subcategory === filteredSubcategory : true) &&
            (search ? fb.title.toLowerCase().includes(search.toLowerCase()) : true)
    );

    const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

    const paginatedFeedbacks = filteredFeedbacks.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );
    const clearFilters = () => {
        setFilteredStatus("");
        setFilteredCategory("");
        setFilteredSubcategory("");
        setSearch("");
        setCurrentPage(1);
    };

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Filtering Bar */}
                <div className="flex gap-2 mb-4">
                    <Input placeholder="Search title..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Select onValueChange={setFilteredCategory}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Functionality">Functionality</SelectItem>
                            <SelectItem value="Performance">Performance</SelectItem>
                            <SelectItem value="Development">Development</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setFilteredSubcategory}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="UI">UI</SelectItem>
                            <SelectItem value="Features">Features</SelectItem>
                            <SelectItem value="Speed">Speed</SelectItem>
                            <SelectItem value="Bugs">Bugs</SelectItem>
                            <SelectItem value="Accessibility">Accessibility</SelectItem>
                            <SelectItem value="API">API</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setFilteredStatus}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={clearFilters} size={"icon"} variant={"outline"}>
                        <FilterXIcon />
                    </Button>
                </div>

                {/* Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Subcategory</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Questions</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedFeedbacks.map((fb, index) => (
                            <TableRow key={index}>
                                <TableCell>{fb.title}</TableCell>
                                <TableCell>{fb.category}</TableCell>
                                <TableCell>{fb.subcategory}</TableCell>
                                <TableCell className={fb.status === "active" ? "text-green-500" : "text-red-500"}>
                                    {fb.status}
                                </TableCell>
                                <TableCell>{fb.questions}</TableCell>
                                <TableCell>{fb.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                                    disabled={currentPage === 1}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink 
                                        isActive={currentPage === i + 1} 
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {totalPages > 5 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                                    disabled={currentPage === totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>
    );
};
