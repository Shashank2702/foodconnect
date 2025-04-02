"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, Package, ExternalLink } from "lucide-react"
import { dataService, type Donation } from "@/lib/data-service"
import { useEffect, useState } from "react"

interface DonationsListProps {
  userType: "restaurant" | "charity"
  donationsProp?: Donation[]
}

export function DonationsList({ userType, donationsProp }: DonationsListProps) {
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    // If donations are provided as props, use them
    // Otherwise, fetch from the data service
    if (donationsProp && donationsProp.length > 0) {
      setDonations(donationsProp)
    } else {
      // In a real app, this would be filtered based on the user type
      const fetchedDonations =
        userType === "restaurant"
          ? dataService.getDonationsByRestaurant("rest-1")
          : dataService.getDonationsByCharity("char-1")
      setDonations(fetchedDonations)
    }
  }, [donationsProp, userType])

  if (donations.length === 0) {
    return (
      <Card>
        <CardContent className="py-10">
          <p className="text-center">No donations found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {donations.map((donation) => (
        <Card key={donation.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>
                  {userType === "restaurant"
                    ? `Donation to ${donation.charityName || "Open"}`
                    : `Donation from ${donation.restaurantName}`}
                </CardTitle>
                <CardDescription>Created on {new Date(donation.createdAt).toLocaleDateString()}</CardDescription>
              </div>
              <Badge
                variant={
                  donation.status === "pending" ? "outline" : donation.status === "confirmed" ? "secondary" : "default"
                }
              >
                {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={
                      userType === "restaurant"
                        ? donation.charityImage || "/images/charity-1.png"
                        : donation.restaurantImage
                    }
                    alt={userType === "restaurant" ? donation.charityName || "Open Donation" : donation.restaurantName}
                  />
                  <AvatarFallback>
                    {userType === "restaurant"
                      ? (donation.charityName && donation.charityName.charAt(0)) || "O"
                      : donation.restaurantName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {userType === "restaurant" ? donation.charityName || "Open Donation" : donation.restaurantName}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {donation.location}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Items:</p>
                <ul className="grid gap-1">
                  {donation.items.map((item, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Package className="mr-2 h-3 w-3 text-muted-foreground" />
                      {item.name} - {item.quantity} {item.unit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Pickup time: {new Date(donation.pickupTime).toLocaleString()}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/donations/${donation.id}`}>
                View Details
                <ExternalLink className="ml-2 h-3 w-3" />
              </Link>
            </Button>
            {donation.status === "pending" &&
              (userType === "restaurant" ? (
                <Button size="sm" variant="destructive">
                  Cancel Donation
                </Button>
              ) : (
                <Button size="sm">Accept Donation</Button>
              ))}
            {donation.status === "confirmed" && (
              <Button size="sm">{userType === "restaurant" ? "Mark as Picked Up" : "Mark as Received"}</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

