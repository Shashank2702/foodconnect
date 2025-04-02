"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DateTimePicker } from "@/components/date-time-picker"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash } from "lucide-react"
import { dataService } from "@/lib/data-service"

export default function NewDonationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState([{ name: "", quantity: "", unit: "kg" }])
  const [pickupTime, setPickupTime] = useState<Date | undefined>(undefined)

  const addItem = () => {
    setItems([...items, { name: "", quantity: "", unit: "kg" }])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems.length ? newItems : [{ name: "", quantity: "", unit: "kg" }])
  }

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Gather form data
    const formData = new FormData(e.target as HTMLFormElement)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const pickupTimeStr = pickupTime?.toISOString() || new Date().toISOString()

    // Create expiration time (24 hours after pickup)
    const expirationTime = new Date(pickupTimeStr)
    expirationTime.setHours(expirationTime.getHours() + 24)

    // Create donation object
    const newDonation = {
      restaurantId: "rest-1", // In a real app, this would be the authenticated user's ID
      restaurantName: "Fresh Bistro", // In a real app, this would be the authenticated user's name
      restaurantImage: "/images/restaurant-1.png", // In a real app, this would be the authenticated user's image
      charityId: null,
      charityName: null,
      charityImage: null,
      title,
      description,
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
      })),
      status: "pending" as const,
      pickupTime: pickupTimeStr,
      expirationTime: expirationTime.toISOString(),
      location: "123 Main St, San Francisco, CA 94105", // In a real app, this would be the authenticated user's address
      latitude: 37.7749, // In a real app, this would be the authenticated user's latitude
      longitude: -122.4194, // In a real app, this would be the authenticated user's longitude
      notes: (formData.get("notes") as string) || "",
    }

    try {
      // In a real app, this would be an API call
      const donation = dataService.createDonation(newDonation)
      console.log("Created donation:", donation)

      // Redirect to the donations page
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard/donations")
      }, 1000)
    } catch (error) {
      console.error("Error creating donation:", error)
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Donation" text="List food items available for donation" />

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Details</CardTitle>
              <CardDescription>Provide information about the food items you want to donate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Donation Title</Label>
                  <Input id="title" placeholder="e.g., Leftover catering food" required name="title" />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide any additional details about the donation"
                    rows={3}
                    name="description"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Food Items</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={index} className="flex items-end gap-4">
                        <div className="flex-1">
                          <Label htmlFor={`item-name-${index}`} className="text-xs">
                            Item Name
                          </Label>
                          <Input
                            id={`item-name-${index}`}
                            value={item.name}
                            onChange={(e) => updateItem(index, "name", e.target.value)}
                            placeholder="e.g., Pasta"
                            required
                          />
                        </div>
                        <div className="w-20">
                          <Label htmlFor={`item-quantity-${index}`} className="text-xs">
                            Quantity
                          </Label>
                          <Input
                            id={`item-quantity-${index}`}
                            value={item.quantity}
                            onChange={(e) => updateItem(index, "quantity", e.target.value)}
                            placeholder="5"
                            required
                          />
                        </div>
                        <div className="w-24">
                          <Label htmlFor={`item-unit-${index}`} className="text-xs">
                            Unit
                          </Label>
                          <Select value={item.unit} onValueChange={(value) => updateItem(index, "unit", value)}>
                            <SelectTrigger id={`item-unit-${index}`}>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="lbs">lbs</SelectItem>
                              <SelectItem value="oz">oz</SelectItem>
                              <SelectItem value="liters">liters</SelectItem>
                              <SelectItem value="servings">servings</SelectItem>
                              <SelectItem value="pieces">pieces</SelectItem>
                              <SelectItem value="boxes">boxes</SelectItem>
                              <SelectItem value="trays">trays</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          disabled={items.length === 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="pickup-time">Pickup Time</Label>
                  <div className="mt-1">
                    <DateTimePicker date={pickupTime} setDate={setPickupTime} granularity="minute" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="expiration">Expiration</Label>
                  <Select defaultValue="24hours">
                    <SelectTrigger id="expiration">
                      <SelectValue placeholder="Select expiration time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6hours">6 hours</SelectItem>
                      <SelectItem value="12hours">12 hours</SelectItem>
                      <SelectItem value="24hours">24 hours</SelectItem>
                      <SelectItem value="48hours">48 hours</SelectItem>
                      <SelectItem value="72hours">72 hours</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="charity">Preferred Charity (Optional)</Label>
                  <Select>
                    <SelectTrigger id="charity">
                      <SelectValue placeholder="Select a charity or leave open to all" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Open to All Charities</SelectItem>
                      <SelectItem value="charity1">Community Food Bank</SelectItem>
                      <SelectItem value="charity2">Homeless Shelter</SelectItem>
                      <SelectItem value="charity3">Youth Center</SelectItem>
                      <SelectItem value="charity4">Senior Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special instructions for pickup or handling"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Donation"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </DashboardShell>
  )
}

