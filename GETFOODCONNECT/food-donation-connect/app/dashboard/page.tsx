"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DonationsList } from "@/components/donations-list"
import { DonationMap } from "@/components/donation-map"
import { RecentActivity } from "@/components/recent-activity"
import { Plus } from "lucide-react"
import { dataService } from "@/lib/data-service"

export default function DashboardPage() {
  const [userType, setUserType] = useState<"restaurant" | "charity">("restaurant")
  const [donations, setDonations] = useState(dataService.getDonations())
  const [activities, setActivities] = useState(dataService.getActivities())

  // In a real app, this would fetch data based on the authenticated user
  useEffect(() => {
    if (userType === "restaurant") {
      setDonations(dataService.getDonationsByRestaurant("rest-1"))
      setActivities(dataService.getActivitiesByRestaurant("rest-1"))
    } else {
      setDonations(dataService.getDonationsByCharity("char-1"))
      setActivities(dataService.getActivitiesByCharity("char-1"))
    }
  }, [userType])

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text={userType === "restaurant" ? "Manage your food donations" : "Find and request food donations"}
      >
        {userType === "restaurant" ? (
          <Link href="/dashboard/donations/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Donation
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard/donations/available">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Find Donations
            </Button>
          </Link>
        )}
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userType === "restaurant" ? "Total Donations" : "Received Donations"}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userType === "restaurant" ? "Active Donations" : "Pending Pickups"}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              {userType === "restaurant" ? "Waiting for pickup" : "Ready for pickup"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userType === "restaurant" ? "Partner Charities" : "Partner Restaurants"}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 in the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userType === "restaurant" ? "120 kg" : "350 meals"}</div>
            <p className="text-xs text-muted-foreground">
              {userType === "restaurant" ? "Food saved from waste" : "Provided to those in need"}
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="space-y-4">
          <DonationMap userType={userType} />
        </TabsContent>
        <TabsContent value="list" className="space-y-4">
          <DonationsList userType={userType} />
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <RecentActivity userType={userType} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

