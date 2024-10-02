import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { BookOpen, Users, Calendar, MessageCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Campus Link</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/learn_more">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Welcome to Campus Link: Empowering Student Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Revolutionize your educational experience with AI-driven insights, seamless communication, and personalized learning.
                </p>
              </div>

              <div className="space-x-4">
                <Link href="/student">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">Get Started</Button>
                </Link>
                <Link href="/learn_more">
                  <Button variant="outline" className="text-white border-white hover:bg-white/10">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl  text-gray-700 text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                  <Users className="h-12 w-12 text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-700">Student Management</h3>
                  <p className="text-gray-500">Effortlessly manage student profiles, grades, and attendance.</p>

                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                  <MessageCircle className="h-12 w-12 text-green-500" />
                  <h3 className="text-xl font-bold text-gray-700">Interactive Groups</h3>
                  <p className="text-gray-500">Create and join study groups for collaborative learning.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                  <Calendar className="h-12 w-12 text-purple-500" />
                  <h3 className="text-xl font-bold text-gray-700">AI Course Generator</h3>
                  <p className="text-gray-500">Personalized course recommendations based on student performance.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                  <BookOpen className="h-12 w-12 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-700">Virtual Classrooms</h3>
                  <p className="text-gray-500">Engage in immersive online learning experiences.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Student",
                  content: "Campus Link has revolutionized my study habits. The AI course recommendations are spot-on!",
                },
                {
                  name: "Sarah Lee",
                  role: "Administrator",
                  content: "Managing student data has never been easier. Campus Link saves us hours every week.",
                },
                {
                  name: "Dr. Michael Brown",
                  role: "Professor",
                  content: "The virtual classrooms are a game-changer for remote learning. Highly recommended!",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage alt={testimonial.name} src={`/placeholder-avatar-${index + 1}.jpg`} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                    <p className="text-gray-600">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Education?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of students and educators already benefiting from Campus Link's innovative platform.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 Campus Link. All rights reserved. Developed by Campus Link</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}