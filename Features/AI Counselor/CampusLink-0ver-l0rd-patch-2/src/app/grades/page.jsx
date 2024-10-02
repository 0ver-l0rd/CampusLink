"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, SortAsc, SortDesc } from "lucide-react"

// type Grade = {
//   id: number
//   course: string
//   code: string
//   semester: string
//   grade: string
//   credits: number
// }

export default function Grades() {
    const [grades, setGrades] = React.useState([
        { id: 1, course: "Introduction to Computer Science", code: "CS101", semester: "Fall 2022", grade: "A", credits: 3 },
        { id: 2, course: "Calculus I", code: "MATH101", semester: "Fall 2022", grade: "B+", credits: 4 },
        { id: 3, course: "English Composition", code: "ENG101", semester: "Fall 2022", grade: "A-", credits: 3 },
        { id: 4, course: "Data Structures", code: "CS201", semester: "Spring 2023", grade: "A", credits: 3 },
        { id: 5, course: "Linear Algebra", code: "MATH201", semester: "Spring 2023", grade: "B", credits: 3 },
        { id: 6, course: "Physics I", code: "PHYS101", semester: "Spring 2023", grade: "B+", credits: 4 },
    ])

    const [sortConfig, setSortConfig] = React.useState({ key: "course", direction: "ascending" })
    const [filterSemester, setFilterSemester] = React.useState("All")
    const [searchTerm, setSearchTerm] = React.useState("")

    const sortedGrades = React.useMemo(() => {
        let sortableGrades = [...grades]
        if (sortConfig.key) {
            sortableGrades.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1
                }
                return 0
            })
        }
        return sortableGrades
    }, [grades, sortConfig])

    const filteredGrades = sortedGrades.filter(
        (grade) =>
            (filterSemester === "All" || grade.semester === filterSemester) &&
            (grade.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                grade.code.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const requestSort = (key) => {
        let direction = "ascending"
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending"
        }
        setSortConfig({ key, direction })
    }

    const calculateGPA = (grades) => {
        const gradePoints = { "A": 4, "A-": 3.7, "B+": 3.3, "B": 3, "B-": 2.7, "C+": 2.3, "C": 2, "C-": 1.7, "D": 1, "F": 0 }
        let totalPoints = 0
        let totalCredits = 0
        grades.forEach(grade => {
            totalPoints += gradePoints[grade.grade] * grade.credits
            totalCredits += grade.credits
        })
        return (totalPoints / totalCredits).toFixed(2)
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">Grades</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Grade Summary</CardTitle>
                    <CardDescription>Your current GPA: {calculateGPA(grades)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search courses..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={filterSemester} onValueChange={setFilterSemester}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Semesters</SelectItem>
                                <SelectItem value="Fall 2022">Fall 2022</SelectItem>
                                <SelectItem value="Spring 2023">Spring 2023</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="cursor-pointer" onClick={() => requestSort("course")}>
                                    Course
                                    {sortConfig.key === "course" && (
                                        sortConfig.direction === "ascending" ? <SortAsc className="inline ml-1" /> : <SortDesc className="inline ml-1" />
                                    )}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => requestSort("code")}>
                                    Code
                                    {sortConfig.key === "code" && (
                                        sortConfig.direction === "ascending" ? <SortAsc className="inline ml-1" /> : <SortDesc className="inline ml-1" />
                                    )}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => requestSort("semester")}>
                                    Semester
                                    {sortConfig.key === "semester" && (
                                        sortConfig.direction === "ascending" ? <SortAsc className="inline ml-1" /> : <SortDesc className="inline ml-1" />
                                    )}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => requestSort("grade")}>
                                    Grade
                                    {sortConfig.key === "grade" && (
                                        sortConfig.direction === "ascending" ? <SortAsc className="inline ml-1" /> : <SortDesc className="inline ml-1" />
                                    )}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => requestSort("credits")}>
                                    Credits
                                    {sortConfig.key === "credits" && (
                                        sortConfig.direction === "ascending" ? <SortAsc className="inline ml-1" /> : <SortDesc className="inline ml-1" />
                                    )}
                                </TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGrades.map((grade) => (
                                <TableRow key={grade.id}>
                                    <TableCell>{grade.course}</TableCell>
                                    <TableCell>{grade.code}</TableCell>
                                    <TableCell>{grade.semester}</TableCell>
                                    <TableCell>{grade.grade}</TableCell>
                                    <TableCell>{grade.credits}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">View Details</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>{grade.course} ({grade.code})</DialogTitle>
                                                    <DialogDescription>
                                                        Semester: {grade.semester}<br />
                                                        Grade: {grade.grade}<br />
                                                        Credits: {grade.credits}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div>
                                                    <h4 className="font-semibold mb-2">Grade Breakdown:</h4>
                                                    <ul className="list-disc list-inside">
                                                        <li>Midterm Exam: 85%</li>
                                                        <li>Final Project: 92%</li>
                                                        <li>Homework Assignments: 88%</li>
                                                        <li>Class Participation: 90%</li>
                                                    </ul>
                                                    <p className="mt-4">
                                                        Instructor Feedback: Excellent work throughout the semester. Your final project was particularly impressive.
                                                    </p>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}