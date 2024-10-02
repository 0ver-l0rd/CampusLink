"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Users, GraduationCap, BookOpen, Video, Menu, Search, Edit, Trash2, Plus } from "lucide-react"

export default function AdminDashboard() {
    const [selectedDate, setSelectedDate] = React.useState(new Date())

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Navigation */}
            <aside className="hidden md:flex w-64 flex-col bg-white shadow-md">
                <div className="p-4">
                    <Link href="#" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
                        <GraduationCap />
                        <span>Campus Link Admin</span>
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="#student-list" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                        <Users className="h-5 w-5" />
                        <span>Student List</span>
                    </Link>
                    <Link href="#grade-management" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                        <GraduationCap className="h-5 w-5" />
                        <span>Grade Management</span>
                    </Link>
                    <Link href="#course-generator" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                        <BookOpen className="h-5 w-5" />
                        <span>Course Generator</span>
                    </Link>
                    <Link href="#virtual-meeting" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                        <Video className="h-5 w-5" />
                        <span>Virtual Meeting Room</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Navigation for Mobile */}
                <nav className="md:hidden bg-white p-4 flex justify-between items-center shadow-md">
                    <Link href="#" className="text-xl font-bold text-blue-600">Campus Link Admin</Link>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </nav>

                <div className="p-6 space-y-6">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>

                    {/* Student List */}
                    <section id="student-list">
                        <Card>
                            <CardHeader>
                                <CardTitle>Student List</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                        <Input placeholder="Search students..." className="pl-8" />
                                    </div>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" /> Add Student
                                    </Button>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { id: "ST001", name: "Alice Johnson", email: "alice@example.com" },
                                            { id: "ST002", name: "Bob Smith", email: "bob@example.com" },
                                            { id: "ST003", name: "Charlie Brown", email: "charlie@example.com" },
                                        ].map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell>{student.id}</TableCell>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>{student.email}</TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Grade Management */}
                    <section id="grade-management">
                        <Card>
                            <CardHeader>
                                <CardTitle>Grade Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cs101">CS101: Intro to Programming</SelectItem>
                                            <SelectItem value="math201">MATH201: Calculus II</SelectItem>
                                            <SelectItem value="eng102">ENG102: Composition</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button>Save Changes</Button>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Current Grade</TableHead>
                                            <TableHead>New Grade</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { id: "ST001", name: "Alice Johnson", currentGrade: "A-" },
                                            { id: "ST002", name: "Bob Smith", currentGrade: "B+" },
                                            { id: "ST003", name: "Charlie Brown", currentGrade: "B" },
                                        ].map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell>{student.id}</TableCell>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>{student.currentGrade}</TableCell>
                                                <TableCell>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={student.currentGrade} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"].map((grade) => (
                                                                <SelectItem key={grade} value={grade}>
                                                                    {grade}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Course Generator */}
                    <section id="course-generator">
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Course Generator</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Student" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="st001">Alice Johnson</SelectItem>
                                                <SelectItem value="st002">Bob Smith</SelectItem>
                                                <SelectItem value="st003">Charlie Brown</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button>Generate Recommendations</Button>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Course Code</TableHead>
                                                <TableHead>Course Name</TableHead>
                                                <TableHead>Recommendation Reason</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                { code: "CS201", name: "Data Structures", reason: "Strong performance in CS101" },
                                                { code: "MATH301", name: "Linear Algebra", reason: "Excellent grades in previous math courses" },
                                                { code: "PHYS101", name: "Intro to Physics", reason: "Diversify STEM knowledge" },
                                            ].map((course) => (
                                                <TableRow key={course.code}>
                                                    <TableCell>{course.code}</TableCell>
                                                    <TableCell>{course.name}</TableCell>
                                                    <TableCell>{course.reason}</TableCell>
                                                    <TableCell>
                                                        <Button variant="outline" size="sm">Approve</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Virtual Meeting Room Management */}
                    <section id="virtual-meeting">
                        <Card>
                            <CardHeader>
                                <CardTitle>Virtual Meeting Room Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-2">Scheduled Meetings</h3>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Meeting Name</TableHead>
                                                    <TableHead>Date & Time</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    { name: "CS101 Lecture", datetime: "2023-06-15 10:00 AM", status: "Scheduled" },
                                                    { name: "Student Council", datetime: "2023-06-16 2:00 PM", status: "In Progress" },
                                                    { name: "Faculty Meeting", datetime: "2023-06-17 3:30 PM", status: "Scheduled" },
                                                ].map((meeting, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{meeting.name}</TableCell>
                                                        <TableCell>{meeting.datetime}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={meeting.status === "In Progress" ? "default" : "secondary"}>
                                                                {meeting.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant="outline" size="sm">Manage</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-2">Schedule New Meeting</h3>
                                        <div className="space-y-4">
                                            <Input placeholder="Meeting Name" />
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                className="rounded-md border"
                                            />
                                            <Button className="w-full">Schedule Meeting</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    )
}