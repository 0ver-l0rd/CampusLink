import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, BookOpen, ThumbsUp, ThumbsDown } from "lucide-react"



export default function CourseGenerator() {
    const [students, setStudents] = React.useState([
        { id: 1, name: "Alice Johnson", major: "Computer Science", gpa: 3.8 },
        { id: 2, name: "Bob Smith", major: "Mathematics", gpa: 3.5 },
        { id: 3, name: "Charlie Brown", major: "Physics", gpa: 3.2 },
    ])

    const [selectedStudent, setSelectedStudent] = React.useState < Student | null > (null)
    const [recommendedCourses, setRecommendedCourses] = React.useState([])
    const [isGenerating, setIsGenerating] = React.useState(false)

    const generateRecommendations = () => {
        setIsGenerating(true)
        // Simulating API call or AI processing
        setTimeout(() => {
            setRecommendedCourses([
                { id: 1, code: "CS301", name: "Advanced Algorithms", description: "Study of complex algorithms and their applications.", credits: 3, prerequisite: "CS201", recommendation: "Based on your strong performance in Data Structures" },
                { id: 2, code: "MATH301", name: "Abstract Algebra", description: "Introduction to abstract algebraic structures.", credits: 3, prerequisite: "MATH201", recommendation: "Recommended to strengthen your mathematical foundation" },
                { id: 3, code: "PHYS201", name: "Quantum Mechanics", description: "Fundamental principles of quantum physics.", credits: 4, recommendation: "Suggested to broaden your STEM knowledge" },
            ])
            setIsGenerating(false)
        }, 2000)
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">AI Course Generator</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Generate Course Recommendations</CardTitle>
                    <CardDescription>Select a student to generate personalized course recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <Select onValueChange={(value) => setSelectedStudent(students.find(s => s.id === parseInt(value)))}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select a student" />
                            </SelectTrigger>
                            <SelectContent>
                                {students.map((student) => (
                                    <SelectItem key={student.id} value={student.id.toString()}>{student.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={generateRecommendations} disabled={!selectedStudent || isGenerating}>
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Generate Recommendations
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {selectedStudent && (
                <Card>
                    <CardHeader>
                        <CardTitle>Student Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {selectedStudent.name}</p>
                            <p><strong>Major:</strong> {selectedStudent.major}</p>
                            <p><strong>GPA:</strong> {selectedStudent.gpa}</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {recommendedCourses.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Recommended Courses</CardTitle>
                        <CardDescription>Based on the student's academic performance and interests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Course Name</TableHead>
                                    <TableHead>Credits</TableHead>
                                    <TableHead>Recommendation</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recommendedCourses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell>{course.code}</TableCell>
                                        <TableCell>{course.name}</TableCell>
                                        <TableCell>{course.credits}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{course.recommendation}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm">Details</Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{course.name} ({course.code})</DialogTitle>
                                                            <DialogDescription>{course.description}</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-2">
                                                            <p><strong>Credits:</strong> {course.credits}</p>
                                                            {course.prerequisite && (
                                                                <p><strong>Prerequisite:</strong> {course.prerequisite}</p>
                                                            )}
                                                            <p><strong>Recommendation:</strong> {course.recommendation}</p>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                                                    <ThumbsUp className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                                                    <ThumbsDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>Approve All Recommendations</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}