"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MapPin, Clock, Package, MessageSquare, ArrowLeft, Check, X } from "lucide-react"
import { dataService } from "@/lib/data-service"

export default function DonationDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [userType] = useState<"restaurant" | "charity">("restaurant")
  const [message, setMessage] = useState("")
  const [donation, setDonation] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const donationData = dataService.getDonationById(params.id)
    if (donationData) {
      setDonation(donationData)
      setMessages(dataService.getMessagesByDonation(params.id))
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!donation) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Donation Not Found">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </DashboardHeader>
        <Card>
          <CardContent className="py-10">
            <p className="text-center">The donation you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the API
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleStatusChange = (newStatus: string) => {
    // In a real app, this would update the donation status via API
    console.log("Changing status to:", newStatus)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Donation Details">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </DashboardHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>
                    {userType === "restaurant"
                      ? `Donation to ${donation.charityName}`
                      : `Donation from ${donation.restaurantName}`}
                  </CardTitle>
                  <CardDescription>Created on {new Date(donation.createdAt).toLocaleDateString()}</CardDescription>
                </div>
                <Badge
                  variant={
                    donation.status === "pending"
                      ? "outline"
                      : donation.status === "confirmed"
                        ? "secondary"
                        : "default"
                  }
                >
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={userType === "restaurant" ? donation.charityImage : donation.restaurantImage}
                    alt={userType === "restaurant" ? donation.charityName : donation.restaurantName}
                  />
                  <AvatarFallback>
                    {userType === "restaurant" ? donation.charityName.charAt(0) : donation.restaurantName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {userType === "restaurant" ? donation.charityName : donation.restaurantName}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {donation.location}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Donation Items:</h3>
                <ul className="space-y-2">
                  {donation.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {item.name} - {item.quantity} {item.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium mb-1">Pickup Time</h3>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    {new Date(donation.pickupTime).toLocaleString()}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Expiration</h3>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    {new Date(donation.expirationTime).toLocaleString()}
                  </div>
                </div>
              </div>

              {donation.notes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Notes:</h3>
                    <p className="text-sm text-muted-foreground">{donation.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {donation.status === "pending" &&
                (userType === "restaurant" ? (
                  <Button variant="destructive" onClick={() => handleStatusChange("cancelled")}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel Donation
                  </Button>
                ) : (
                  <Button onClick={() => handleStatusChange("confirmed")}>
                    <Check className="mr-2 h-4 w-4" />
                    Accept Donation
                  </Button>
                ))}
              {donation.status === "confirmed" && (
                <Button onClick={() => handleStatusChange("completed")}>
                  <Check className="mr-2 h-4 w-4" />
                  {userType === "restaurant" ? "Mark as Picked Up" : "Mark as Received"}
                </Button>
              )}
              {donation.status === "completed" && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Donation completed on {new Date().toLocaleDateString()}
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="messages">
            <TabsList className="w-full">
              <TabsTrigger value="messages" className="flex-1">
                Messages
              </TabsTrigger>
              <TabsTrigger value="map" className="flex-1">
                Map
              </TabsTrigger>
            </TabsList>
            <TabsContent value="messages" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Messages</CardTitle>
                  <CardDescription>
                    Communicate with {userType === "restaurant" ? "the charity" : "the restaurant"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === userType ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`
                            max-w-[80%] rounded-lg p-3 
                            ${msg.sender === userType ? "bg-primary text-primary-foreground" : "bg-muted"}
                          `}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="map" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                  <CardDescription>
                    {userType === "restaurant"
                      ? `${donation.charityName}'s location`
                      : `${donation.restaurantName}'s location`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden rounded-lg border">
                    <div className="h-full w-full bg-[url('/placeholder.svg?height=300&width=500')] bg-cover bg-center"></div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-1">Address</h3>
                    <p className="text-sm text-muted-foreground">{donation.location}</p>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full" variant="outline">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  )
}

