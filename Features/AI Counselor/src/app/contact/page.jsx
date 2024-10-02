"use client";
import React from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { BookOpen, Users, Calendar, MessageCircle } from "lucide-react"

const Contacts = () => {
return(
<>

<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Our Address</h2>
          <p>
            123 Main Street<br />
            City, State 12345<br />
            Country
          </p>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <ul>
            <li>Phone: +123 456 7890</li>
            <li>Email: info@campuslink.com</li>
            <li>Website: www.campuslink.com</li>
          </ul>
        </div>
      </div>
    </div>

</>
);
};

export default Contacts;