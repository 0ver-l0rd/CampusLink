"use client";

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Book, Notebook, FileText, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';


const initialCourses = [
  { id: 1, code: "CS101", name: "Introduction to Computer Science", tuition: 1000, prerequisites: [] },
  { id: 2, code: "CS201", name: "Data Structures", tuition: 1200, prerequisites: ["CS101"] },
  { id: 3, code: "CS301", name: "Algorithms", tuition: 1300, prerequisites: ["CS201"] },
  { id: 4, code: "MATH101", name: "Calculus I", tuition: 800, prerequisites: [] },
  { id: 5, code: "MATH201", name: "Calculus II", tuition: 900, prerequisites: ["MATH101"] },
]

const initialResources = [
  { id: 1, name: "Introduction to Computer Science Textbook", type: "book", price: 120 },
  { id: 2, name: "Data Structures Textbook", type: "book", price: 130 },
  { id: 3, name: "Algorithms Textbook", type: "book", price: 140 },
  { id: 4, name: "Calculus I Textbook", type: "book", price: 100 },
  { id: 5, name: "Calculus II Textbook", type: "book", price: 110 },
  { id: 6, name: "Notebook Pack (5 notebooks)", type: "notebook", price: 20 },
  { id: 7, name: "Scientific Calculator", type: "tool", price: 30 },
  { id: 8, name: "CS101 Course Materials", type: "digital", price: 25 },
  { id: 9, name: "CS201 Problem Set", type: "digital", price: 20 },
  { id: 10, name: "MATH101 Problem Set", type: "digital", price: 15 },
]

// Simulated student course history
const studentCourseHistory = ["CS101", "MATH101"]

export default function StudentMarketplace() {
  const [courses, setCourses] = React.useState(initialCourses)
  const [resources, setResources] = React.useState(initialResources)
  const [cart, setCart] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState("")

  const addToCart = (item, type) => {
    if (type === 'course') {
      const courseInCart = cart.find(cartItem => cartItem.id === item.id && cartItem.type === 'course')
      if (courseInCart) {
        toast.error("You can only purchase this course once.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return
      }
      
      // Check prerequisitesBirr
      const missingPrerequisites = item.prerequisites.filter(prereq => !studentCourseHistory.includes(prereq))
      if (missingPrerequisites.length > 0) {
        toast.error(`You are missing the following prerequisites: ${missingPrerequisites.join(", ")}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return
      }
      
      setCart([...cart, { ...item, type, quantity: 1 }])
    } else {
      const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.type === type)
      if (existingItem) {
        setCart(cart.map(cartItem => 
          cartItem.id === item.id && cartItem.type === type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ))
      } else {
        setCart([...cart, { ...item, type, quantity: 1 }])
      }
    }
  }

  const removeFromCart = (item) => {
    if (item.type === 'course') {
      setCart(cart.filter(cartItem => cartItem.id !== item.id || cartItem.type !== item.type))
    } else {
      const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.type === item.type)
      if (existingItem.quantity === 1) {
        setCart(cart.filter(cartItem => cartItem.id !== item.id || cartItem.type !== item.type))
      } else {
        setCart(cart.map(cartItem => 
          cartItem.id === item.id && cartItem.type === item.type
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ))
      }
    }
  }

  const filteredResources = resources.filter(resource => 
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalCost = cart.reduce((total, item) => {
    return total + (item.type === 'course' ? item.tuition : item.price) * item.quantity
  }, 0)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold">Student Marketplace</h1>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Available Courses</CardTitle>
              <CardDescription>Select courses to enroll and pay tuition (one-time purchase per course)</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                {courses.map(course => (
                  <div key={course.id} className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{course.name}</h3>
                      <p className="text-sm text-gray-500">{course.code}</p>
                      {course.prerequisites.length > 0 && (
                        <p className="text-xs text-gray-400">
                          Prerequisites: {course.prerequisites.join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">${course.tuition}</span>
                      <Button 
                        onClick={() => addToCart(course, 'course')} 
                        size="sm"
                        disabled={cart.some(item => item.id === course.id && item.type === 'course')}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {cart.some(item => item.id === course.id && item.type === 'course') ? 'In Cart' : 'Add'}
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Browse and purchase learning materials</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              <ScrollArea className="h-[400px] w-full pr-4">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{resource.name}</h3>
                      <Badge variant="secondary">
                        {resource.type === 'book' && <Book className="h-3 w-3 mr-1" />}
                        {resource.type === 'notebook' && <Notebook className="h-3 w-3 mr-1" />}
                        {resource.type === 'digital' && <FileText className="h-3 w-3 mr-1" />}
                        {resource.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">${resource.price}</span>
                      <Button onClick={() => addToCart(resource, 'resource')} size="sm">
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>Review your selected courses and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full pr-4">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.type}`} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <Badge variant="secondary">{item.type}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">
                    ${item.type === 'course' ? item.tuition : item.price} x {item.quantity}
                  </span>
                  {item.type !== 'course' && (
                    <>
                      <Button onClick={() => removeFromCart(item)} size="sm" variant="outline">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => addToCart(item, item.type)} size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button onClick={() => setCart(cart.filter(cartItem => cartItem.id !== item.id || cartItem.type !== item.type))} size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <div className="text-lg font-bold">Total: ${totalCost}</div>
          <Button onClick={() => window.location.href = '../../App.js'}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}