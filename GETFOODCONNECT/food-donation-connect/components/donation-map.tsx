"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Utensils, Heart } from "lucide-react"
import { dataService } from "@/lib/data-service"

interface DonationMapProps {
  userType: "restaurant" | "charity"
}

export function DonationMap({ userType }: DonationMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [locations, setLocations] = useState<any[]>([])

  // Load locations based on user type
  useEffect(() => {
    if (userType === "restaurant") {
      setLocations(dataService.getCharities())
    } else {
      setLocations(dataService.getRestaurants())
    }
  }, [userType])

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{userType === "restaurant" ? "Nearby Charities" : "Available Donations"}</CardTitle>
          <CardDescription>
            {userType === "restaurant"
              ? "Charities in your area that can receive donations"
              : "Restaurants with available food donations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            {!isMapLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-sm text-muted-foreground">Loading map...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-muted">
                  {/* This would be replaced with an actual map component in a real app */}
                  <div className="h-full w-full bg-[url('/images/map-bg.png')] bg-cover bg-center"></div>
                </div>

                {/* Map pins */}
                {locations.slice(0, 3).map((location, index) => (
                  <div
                    key={location.id}
                    className="absolute"
                    style={{
                      left: `${25 + index * 25}%`,
                      top: `${30 + index * 10}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <MapMarker
                      type={userType === "restaurant" ? "charity" : "restaurant"}
                      name={location.name}
                      status="active"
                    />
                  </div>
                ))}

                {/* Current location */}
                <div className="absolute right-4 bottom-4">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Navigation className="h-4 w-4" />
                    Current Location
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.slice(0, 3).map((location) => (
          <Card key={location.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{location.name}</CardTitle>
                <Badge variant="outline">0.8 miles</Badge>
              </div>
              <CardDescription>
                {userType === "restaurant" ? location.peopleServed : location.cuisineType}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <MapPin className="mr-1 h-3 w-3" />
                {`${location.address}, ${location.city}, ${location.state} ${location.zip}`}
              </div>
              {userType === "restaurant" ? (
                <Button size="sm" className="w-full">
                  Donate Now
                </Button>
              ) : (
                <div className="grid gap-2">
                  <div className="text-sm">Available: Various food items</div>
                  <Button size="sm" className="w-full">
                    Request Pickup
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface MapMarkerProps {
  type: "restaurant" | "charity"
  name: string
  status: "active" | "inactive"
}

function MapMarker({ type, name, status }: MapMarkerProps) {
  return (
    <div className="group relative">
      <div
        className={`
        flex h-10 w-10 items-center justify-center rounded-full 
        ${type === "restaurant" ? "bg-primary" : "bg-secondary"}
        ${status === "inactive" ? "opacity-60" : ""}
        shadow-lg transition-all duration-200 hover:scale-110
      `}
      >
        {type === "restaurant" ? (
          <Utensils className="h-5 w-5 text-primary-foreground" />
        ) : (
          <Heart className="h-5 w-5 text-secondary-foreground" />
        )}
      </div>
      <div className="absolute left-1/2 top-0 z-10 mt-12 w-40 -translate-x-1/2 transform rounded-md bg-background p-2 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">
          {type === "restaurant" ? "Restaurant" : "Charity"}
          {status === "inactive" ? " (inactive)" : ""}
        </p>
      </div>
    </div>
  )
}

