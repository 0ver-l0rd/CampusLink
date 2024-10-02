"use client";
import React from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { BookOpen, Users, Calendar, MessageCircle } from "lucide-react"

const LearnMore = () => {
  return (
    <>
    <body className="">
      <header className="px-4 lg:px-6 h-14 flex items-center ">
        <Link className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Campus Link</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
    <div className="container px-4 py-8 w-full h-full">
    
    <h1 className="text-3xl font-bold text-center mb-8">Learn More About campusLink</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Student Management</h2>
        <p>Centralized Profile Management:
        Maintain accurate and up-to-date student profiles, including personal information,
         contact details, academic records, and enrollment status.</p>
            <br />
         <p>Streamlined Grading: Efficiently record and track student grades 
            for all courses, assignments, and exams.</p>
            <br />
        <p>Personalized Progress Reports: Generate detailed progress reports that highlight student 
            achievements, areas for improvement, and overall academic performance.</p>
            <br />
            <p>Comprehensive Analytics: Gain valuable insights into student performance trends,
                 identify at-risk students, and make data-driven decisions to improve learning outcomes.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Interactive Groups</h2>
        <p>Form Study Groups: Easily create and join study groups based on shared interests,
             courses, or academic goals..</p>
             <br />
             <p>Virtual Collaboration: Collaborate seamlessly with group members using built-in 
                tools for file sharing, video conferencing, 
                and online discussions.</p>
                <br />
                <p>Group Calendars: Coordinate study sessions, assignments, and 
                    deadlines using shared group calendars.</p>
                    <br />
                    <p>Peer Support and Mentoring: Benefit from peer support and mentorship 
                        opportunities within study groups.</p>
                        <br />
                        <p>Enhanced Learning Outcomes: Improve academic performance through collaborative learning and knowledge sharing.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">AI Course Generator</h2>
        <p>Tailored Course Recommendations: Receive personalized course recommendations based 
            on your academic history, interests, and career goals..</p>
            <br />
            <p>Intelligent Algorithm: Our advanced algorithm analyzes your performance data, learning style, 
                and preferences to suggest courses that align with your individual needs.</p>
                <br />
                <p>Continuous Optimization: The course generator continuously adapts its recommendations as you progress through 
                    your academic journey, ensuring that you stay on track.</p>
                    <br />
                    <p>Career Guidance: Explore potential career paths and discover relevant
                         courses that can help you achieve your professional aspirations.</p>
                         <br />
                         <p>Enhanced Learning Experience: Discover new courses and subjects that 
                            pique your interest and expand your knowledge.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Virtual Classrooms</h2>
        <p>Real-time Interaction: Participate in live lectures, discussions,
             and presentations with your instructors and classmates..</p>
             <br />
             <p>Interactive Tools: Utilize a variety of interactive tools, including whiteboards, shared screens, and virtual labs, 
                to enhance your learning experience.</p>
                <br />
                <p>Recorded Lectures: Access recordings of lectures and presentations for review and reference.</p>
                <br />
                <p>Virtual Breakout Rooms: Collaborate with small groups in virtual breakout rooms
                     for focused discussions and problem-solving.</p>
                     <br />
                     <p>    Immersive Learning: Experience immersive learning experiences through virtual field trips, simulations, and 3D models.
</p>

      </div>
    </div>
  </div>
  <footer className="mx-auto">© 2024 campusLink</footer>
  </body>
    </>
  );
};

export default LearnMore;