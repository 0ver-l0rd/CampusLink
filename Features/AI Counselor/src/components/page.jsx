import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, MessageSquare, Calendar as CalendarIcon, Plus } from "lucide-react"

export default function Groups() {
  const [groups, setGroups] = React.useState([
    { id: 1, name: "Computer Science Study Group", description: "A group for CS students to collaborate and study together.", members: 15 },
    { id: 2, name: "Photography Club", description: "For students interested in photography, from beginners to experts.", members: 28 },
    { id: 3, name: "Debate Team", description: "Hone your public speaking and argumentation skills.", members: 12 },
  ])

  const [selectedGroup, setSelectedGroup] = React.useState(null)
  const [messages, setMessages] = React.useState([])
  const [newMessage, setNewMessage] = React.useState("")
  const [newGroupName, setNewGroupName] = React.useState("")
  const [newGroupDescription, setNewGroupDescription] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "You" }])
      setNewMessage("")
    }
  }

  const handleCreateGroup = () => {
    if (newGroupName.trim() && newGroupDescription.trim()) {
      setGroups([...groups, { id: groups.length + 1, name: newGroupName, description: newGroupDescription, members: 1 }])
      setNewGroupName("")
      setNewGroupDescription("")
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Groups</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Group</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input
                  placeholder="Group Name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                <Textarea
                  placeholder="Group Description"
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                />
                <Button onClick={handleCreateGroup}>Create Group</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.members} members</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedGroup ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedGroup.name}</CardTitle>
                <CardDescription>{selectedGroup.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-2">
                      <strong>{message.sender}:</strong> {message.text}
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Schedule Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Group Event</DialogTitle>
                      <DialogDescription>
                        Choose a date for your group event. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    <DialogFooter>
                      <Button type="submit">Save Event</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-[400px]">
                <p className="text-gray-500">Select a group to view chat and details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}