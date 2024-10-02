import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Video, Calendar as CalendarIcon, Clock, Users, Plus } from "lucide-react"

// type Meeting = {
//     id: number
//     name: string
//     date: string
//     time: string
//     participants: number
//     status: "scheduled" | "in-progress" | "completed"
// }

export default function VirtualMeetingRoom() {
    const [meetings, setMeetings] = React.useState([
        { id: 1, name: "CS101 Lecture", date: "2023-06-15", time: "10:00 AM", participants: 30, status: "scheduled" },
        { id: 2, name: "Project Team Meeting", date: "2023-06-16", time: "2:00 PM", participants: 5, status: "scheduled" },
        { id: 3, name: "Office Hours", date: "2023-06-17", time: "3:30 PM", participants: 1, status: "scheduled" },
    ])

    const [selectedDate, setSelectedDate] = React.useState < Date | undefined > (new Date())
    const [newMeetingName, setNewMeetingName] = React.useState("")
    const [newMeetingTime, setNewMeetingTime] = React.useState("")

    const handleCreateMeeting = () => {
        if (newMeetingName && selectedDate && newMeetingTime) {
            const newMeeting = {
                id: meetings.length + 1,
                name: newMeetingName,
                date: selectedDate.toISOString().split('T')[0],
                time: newMeetingTime,
                participants: 0,
                status: "scheduled"
            }
            setMeetings([...meetings, newMeeting])
            setNewMeetingName("")
            setNewMeetingTime("")
        }
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">Virtual Meeting Room</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Meetings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Meeting Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Participants</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {meetings.map((meeting) => (
                                    <TableRow key={meeting.id}>
                                        <TableCell>{meeting.name}</TableCell>
                                        <TableCell>{meeting.date}</TableCell>
                                        <TableCell>{meeting.time}</TableCell>
                                        <TableCell>{meeting.participants}</TableCell>
                                        <TableCell>
                                            <Badge variant={meeting.status === "in-progress" ? "default" : "secondary"}>
                                                {meeting.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">
                                                {meeting.status === "scheduled" ? "Join" : "View Recording"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Schedule New Meeting</CardTitle>
                        <CardDescription>Set up a new virtual meeting</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <Input
                                placeholder="Meeting Name"
                                value={newMeetingName}
                                onChange={(e) => setNewMeetingName(e.target.value)}
                            />
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="meeting-date">Date</label>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md border"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="meeting-time">Time</label>
                                <Input
                                    id="meeting-time"
                                    type="time"
                                    value={newMeetingTime}
                                    onChange={(e) => setNewMeetingTime(e.target.value)}
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleCreateMeeting}>Schedule Meeting</Button>
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Join</CardTitle>
                    <CardDescription>Enter a meeting code to join instantly</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2">
                        <Input placeholder="Enter meeting code" />
                        <Button>
                            <Video className="mr-2 h-4 w-4" />
                            Join
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Meeting History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Meeting Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Participants</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { name: "Team Standup", date: "2023-06-10", duration: "30 min", participants: 8 },
                                { name: "Project Review", date: "2023-06-08", duration: "1 hour", participants: 12 },
                                { name: "Client Presentation", date: "2023-06-05", duration: "45 min", participants: 5 },
                            ].map((meeting, index) => (
                                <TableRow key={index}>
                                    <TableCell>{meeting.name}</TableCell>
                                    <TableCell>{meeting.date}</TableCell>
                                    <TableCell>{meeting.duration}</TableCell>
                                    <TableCell>{meeting.participants}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">View Recording</Button>
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