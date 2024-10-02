"use client";

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Book, Notebook, FileText, ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Course = {
  id: number
  code: string
  name: string
  tuition: number
  prerequisites: string[]
}

type Resource = {
  id: number
  name: string
  type: string
  price: number
}

const initialCourses: Course[] = [
  { id: 1, code: "CS101", name: "Introduction to Computer Science", tuition: 1000, prerequisites: [] },
  { id: 2, code: "CS201", name: "Data Structures", tuition: 1200, prerequisites: ["CS101"] },
  { id: 3, code: "CS301", name: "Algorithms", tuition: 1300, prerequisites: ["CS201"] },
  { id: 4, code: "MATH101", name: "Calculus I", tuition: 800, prerequisites: [] },
  { id: 5, code: "MATH201", name: "Calculus II", tuition: 900, prerequisites: ["MATH101"] },
]

const initialResources: Resource[] = [
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
  const [courses, setCourses] = React.useState<Course[]>(initialCourses)
  const [resources, setResources] = React.useState<Resource[]>(initialResources)
  const [cart, setCart] = React.useState<(Course | Resource & { type: string, quantity: number })[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: ""
  })

  const addToCart = (item: Course | Resource, type: 'course' | 'resource') => {
    if (type === 'course') {
      const course = item as Course
      const courseInCart = cart.find(cartItem => cartItem.id === course.id && cartItem.type === 'course')
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
      
      // Check prerequisites
      const missingPrerequisites = course.prerequisites.filter(prereq => !studentCourseHistory.includes(prereq))
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
      
      setCart([...cart, { ...course, type, quantity: 1 }])
    } else {
      const resource = item as Resource
      const existingItem = cart.find(cartItem => cartItem.id === resource.id && cartItem.type === type)
      if (existingItem) {
        setCart(cart.map(cartItem => 
          cartItem.id === resource.id && cartItem.type === type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ))
      } else {
        setCart([...cart, { ...resource, type, quantity: 1 }])
      }
    }
  }

  const removeFromCart = (item: Course | Resource & { type: string, quantity: number }) => {
    if (item.type === 'course') {
      setCart(cart.filter(cartItem => cartItem.id !== item.id || cartItem.type !== item.type))
    } else {
      const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.type === item.type)
      if (existingItem && existingItem.quantity === 1) {
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
    return total + ('tuition' in item ? item.tuition : item.price) * item.quantity
  }, 0)

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    // For this example, we'll just show a success message
    toast.success("Payment processed successfully!")
    setCart([])
    setIsCheckoutOpen(false)
  }

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
                    ${'tuition' in item ? item.tuition : item.price} x {item.quantity}
                  </span>
                  {item.type !== 'course' && (
                    <>
                      <Button onClick={() => removeFromCart(item)} size="sm" variant="outline">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => addToCart(item, item.type as 'resource')} size="sm" variant="outline">
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
          <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
            <DialogTrigger asChild>
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Checkout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Checkout</DialogTitle>
                <DialogDescription>
                  Enter your payment details to complete your purchase.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePaymentSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={paymentInfo.name}
                      onChange={(e) => setPaymentInfo({...paymentInfo, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="cardNumber" className="text-right">
                      Card Number
                    </label>
                    <Input
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="expiryDate" className="text-right">
                      Expiry Date
                    </label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="cvv" className="text-right">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay ${totalCost}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}