"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, ChevronDown, ChevronUp } from "lucide-react"

export default function NoticeBoard() {
    const [announcements, setAnnouncements] = React.useState([
        {
            id: "1",
            title: "Campus-wide Wi-Fi Upgrade",
            date: "2023-06-15",
            category: "General",
            description: "We're upgrading our campus Wi-Fi network for faster speeds and better coverage.",
            fullDetails: "Starting next week, we will be upgrading the campus-wide Wi-Fi network. This upgrade will significantly improve internet speeds and extend coverage to previously underserved areas. During the upgrade, you may experience brief interruptions in service. We appreciate your patience as we work to enhance your online experience on campus."
        },
        {
            id: "2",
            title: "Fall Semester Registration Deadline",
            date: "2023-07-01",
            category: "Deadlines",
            description: "Don't forget to register for your Fall semester courses by July 15th.",
            fullDetails: "The deadline for Fall semester course registration is July 15th. Please ensure you have met with your academic advisor and have a clear understanding of your degree requirements before registering. Late registration will incur additional fees and may limit your course selection options. If you need assistance, please contact the Registrar's Office."
        },
        {
            id: "3",
            title: "Annual Student Art Exhibition",
            date: "2023-08-10",
            category: "Events",
            description: "Join us for the opening of the Annual Student Art Exhibition on August 10th.",
            fullDetails: "We are excited to announce the opening of our Annual Student Art Exhibition on August 10th at 7 PM in the University Gallery. This event showcases the incredible talent of our student artists across various mediums including painting, sculpture, photography, and digital art. The exhibition will run for two weeks, and many pieces will be available for purchase. Don't miss this opportunity to support your fellow students and celebrate creativity on campus!"
        },
    ])

    const [expandedAnnouncements, setExpandedAnnouncements] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState("")
    const [categoryFilter, setCategoryFilter] = React.useState("All")

    const toggleExpand = (id) => {
        setExpandedAnnouncements(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const filteredAnnouncements = announcements.filter(announcement =>
        (categoryFilter === "All" || announcement.category === categoryFilter) &&
        (announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            announcement.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">Notice Board</h1>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search announcements..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Deadlines">Deadlines</SelectItem>
                        <SelectItem value="Events">Events</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                {filteredAnnouncements.map(announcement => (
                    <Card key={announcement.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{announcement.title}</CardTitle>
                                    <CardDescription>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{announcement.date}</span>
                                        </div>
                                    </CardDescription>
                                </div>
                                <Badge>{announcement.category}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{announcement.description}</p>
                            {expandedAnnouncements.includes(announcement.id) && (
                                <p className="mt-4">{announcement.fullDetails}</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="ghost"
                                onClick={() => toggleExpand(announcement.id)}
                            >
                                {expandedAnnouncements.includes(announcement.id) ? (
                                    <>
                                        <ChevronUp className="mr-2 h-4 w-4" />
                                        Show Less
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="mr-2 h-4 w-4" />
                                        Read More
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}