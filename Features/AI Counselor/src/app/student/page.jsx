"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Bell, Users, GraduationCap, Video, Menu } from "lucide-react"
import { ShoppingCart } from "lucide-react";
import { Languages } from "lucide-react";

export default function StudentDashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Navigation */}
            <aside className="hidden md:flex w-64 flex-col bg-white shadow-md">
                <div className="p-4">
                    <Link href="#" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
                        <GraduationCap />
                        <span>Campus Link</span>
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/noticeboard" className="flex items-center space-x-2 p-2 text-black hover:bg-black hover:text-white rounded-md">
                        <Bell className="h-5 w-5" />
                        <span>Notice Board</span>
                    </Link>
                    <Link href="/group" className="flex items-center space-x-2 p-2 text-black hover:bg-black hover:text-white  rounded-md">
                        <Users className="h-5 w-5" />
                        <span>Groups</span>
                    </Link>
                    <Link href="/grades" className="flex items-center space-x-2 p-2 text-black hover:bg-black hover:text-white  rounded-md">
                        <GraduationCap className="h-5 w-5" />
                        <span>Grades</span>
                    </Link>
                    <Link href="/virtualmeeting" className="flex items-center space-x-2 p-2 text-black hover:bg-black hover:text-white rounded-md">
                        <Video className="h-5 w-5" />
                        <span>Virtual Meeting Room</span>
                    </Link>
                    <Link href="/translate" className="flex items-center space-x-2 p-2 text-black hover:bg-black hover:text-white  rounded-md">
                        <Languages className="h-5 w-5" />
                        <span>Translator </span>
                    </Link>

                    <Link href="/marketplace" className="flex items-center space-x-2 p-2 text-black hover:bg-black hover:text-white  rounded-md">
                        <ShoppingCart className="h-5 w-5" />
                        <span>Market Place </span>
                    </Link>
                    <Link href="/sc" className="flex items-center space-x-2 p-2 text-black hover:bg-black hover:text-white  rounded-md">
                        <ShoppingCart className="h-5 w-5" />
                        <span>AI Counselor </span>
                    </Link>

                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Navigation for Mobile */}
                <nav className="md:hidden bg-white p-4 flex justify-between items-center shadow-md">
                    <Link href="#" className="text-xl font-bold text-blue-600">Campus Link</Link>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </nav>

                <div className="p-6 space-y-6">
                    {/* Welcome Message */}
                    <Card>
                        <CardContent className="flex items-center space-x-4 p-6">
                            <Avatar className="h-16 w-16">
                                <AvatarImage alt="Student" src="/placeholder-avatar.jpg" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold">Welcome back, John Doe!</h1>
                                <p className="text-gray-500">It's great to see you again. Here's what's new today.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notice Board */}
                    <section id="notice-board">
                        <h2 className="text-xl font-bold mb-4">Notice Board</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: "Exam Schedule Update", description: "The final exam schedule has been updated. Please check your student portal for details." },
                                { title: "Campus Event", description: "Join us for the annual Spring Festival next week! Food, music, and fun activities await." },
                                { title: "Library Hours Extended", description: "The library will now be open until midnight during exam week to support your study needs." },
                            ].map((notice, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>{notice.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{notice.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Groups */}
                    <section id="groups">
                        <h2 className="text-xl font-bold mb-4">Your Groups</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { name: "Computer Science Study Group", members: 15 },
                                { name: "Campus Photography Club", members: 28 },
                                { name: "Debate Team", members: 12 },
                            ].map((group, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>{group.name}</CardTitle>
                                        <CardDescription>{group.members} members</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button>Open Chat</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Grades */}
                    <section id="grades">
                        <h2 className="text-xl font-bold mb-4">Your Grades</h2>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Course</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead>Credits</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { course: "Introduction to Computer Science", grade: "A", credits: 3 },
                                            { course: "Calculus I", grade: "B+", credits: 4 },
                                            { course: "English Composition", grade: "A-", credits: 3 },
                                        ].map((course, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{course.course}</TableCell>
                                                <TableCell>{course.grade}</TableCell>
                                                <TableCell>{course.credits}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Virtual Meeting Room */}
                    <section id="virtual-meeting">
                        <h2 className="text-xl font-bold mb-4">Virtual Meeting Room</h2>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-2">Upcoming Meetings</h3>
                                        <ul className="space-y-2">
                                            {[
                                                { name: "Group Project Discussion", time: "Today, 3:00 PM" },
                                                { name: "CS101 Office Hours", time: "Tomorrow, 10:00 AM" },
                                                { name: "Student Council Meeting", time: "Friday, 5:00 PM" },
                                            ].map((meeting, index) => (
                                                <li key={index} className="flex justify-between items-center">
                                                    <span>{meeting.name}</span>
                                                    <span className="text-sm text-gray-500">{meeting.time}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="mt-4">Join Next Meeting</Button>
                                    </div>
                                    <div className="flex-1">
                                        <Calendar />
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