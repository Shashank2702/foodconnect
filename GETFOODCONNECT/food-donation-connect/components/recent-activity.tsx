"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Check, X, Clock, MessageSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { dataService, type Activity } from "@/lib/data-service"

interface RecentActivityProps {
  userType: "restaurant" | "charity"
  activities?: Activity[]
}

export function RecentActivity({ userType, activities: activitiesProp }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // If activities are provided as props, use them
    // Otherwise, fetch from the data service
    if (activitiesProp && activitiesProp.length > 0) {
      setActivities(activitiesProp)
    } else {
      // In a real app, this would be filtered based on the user type
      const fetchedActivities =
        userType === "restaurant"
          ? dataService.getActivitiesByRestaurant("rest-1")
          : dataService.getActivitiesByCharity("char-1")
      setActivities(fetchedActivities)
    }
  }, [activitiesProp, userType])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "donation_created":
        return <Package className="h-5 w-5 text-blue-500" />
      case "donation_accepted":
        return <Check className="h-5 w-5 text-green-500" />
      case "donation_completed":
        return <Check className="h-5 w-5 text-green-500" />
      case "donation_rejected":
        return <X className="h-5 w-5 text-red-500" />
      case "message_received":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getActivityTitle = (activity: Activity) => {
    switch (activity.type) {
      case "donation_created":
        return `${activity.actor} created a donation for ${activity.target}`
      case "donation_accepted":
        return `${activity.actor} accepted a donation from ${activity.target}`
      case "donation_completed":
        return `Donation between ${activity.actor} and ${activity.target} completed`
      case "donation_rejected":
        return `${activity.actor} couldn't accept a donation from ${activity.target}`
      case "message_received":
        return `${activity.actor} sent you a message`
      default:
        return `Activity between ${activity.actor} and ${activity.target}`
    }
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent className="py-10">
          <p className="text-center">No recent activity.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest interactions and donation updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                {getActivityIcon(activity.type)}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{getActivityTitle(activity)}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
                <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

