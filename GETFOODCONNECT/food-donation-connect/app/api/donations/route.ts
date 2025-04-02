import { NextResponse } from "next/server"

// This would be replaced with a database connection in a real app
const donations = [
  {
    id: "1",
    restaurantId: "rest-1",
    restaurantName: "Fresh Bistro",
    charityId: "char-1",
    charityName: "Community Food Bank",
    items: [
      { name: "Pasta", quantity: "5", unit: "kg" },
      { name: "Bread", quantity: "10", unit: "loaves" },
      { name: "Vegetables", quantity: "3", unit: "kg" },
    ],
    status: "pending",
    createdAt: "2023-04-15T10:30:00Z",
    pickupTime: "2023-04-15T17:00:00Z",
    expirationTime: "2023-04-16T10:30:00Z",
    location: "123 Main St, Anytown, USA",
    notes: "Please use the back entrance for pickup. Call when you arrive.",
  },
]

export async function GET() {
  // In a real app, this would filter based on authentication and query parameters
  return NextResponse.json(donations)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.restaurantId || !body.items || !body.pickupTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new donation
    const newDonation = {
      id: `donation-${Date.now()}`,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // In a real app, this would save to a database
    donations.push(newDonation)

    return NextResponse.json(newDonation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create donation" }, { status: 500 })
  }
}

