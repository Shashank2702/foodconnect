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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const donation = donations.find((d) => d.id === params.id)

  if (!donation) {
    return NextResponse.json({ error: "Donation not found" }, { status: 404 })
  }

  return NextResponse.json(donation)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const donationIndex = donations.findIndex((d) => d.id === params.id)

    if (donationIndex === -1) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    // Update donation
    const updatedDonation = {
      ...donations[donationIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
    }

    // In a real app, this would update a database record
    donations[donationIndex] = updatedDonation

    return NextResponse.json(updatedDonation)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update donation" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const donationIndex = donations.findIndex((d) => d.id === params.id)

  if (donationIndex === -1) {
    return NextResponse.json({ error: "Donation not found" }, { status: 404 })
  }

  // In a real app, this would delete from a database
  donations.splice(donationIndex, 1)

  return NextResponse.json({ success: true })
}

