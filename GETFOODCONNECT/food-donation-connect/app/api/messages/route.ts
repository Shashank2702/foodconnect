import { NextResponse } from "next/server"

// This would be replaced with a database connection in a real app
const messages = [
  {
    id: "msg1",
    donationId: "1",
    sender: "restaurant",
    senderId: "rest-1",
    senderName: "Fresh Bistro",
    content: "Hi, we have some extra food from a catering event. Would you be able to pick it up today?",
    timestamp: "2023-04-15T10:35:00Z",
  },
  {
    id: "msg2",
    donationId: "1",
    sender: "charity",
    senderId: "char-1",
    senderName: "Community Food Bank",
    content: "Yes, we can send someone at 5 PM. Is that okay?",
    timestamp: "2023-04-15T11:15:00Z",
  },
  {
    id: "msg3",
    donationId: "1",
    sender: "restaurant",
    senderId: "rest-1",
    senderName: "Fresh Bistro",
    content: "Perfect! We'll have everything packaged and ready by then.",
    timestamp: "2023-04-15T11:20:00Z",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const donationId = searchParams.get("donationId")

  if (!donationId) {
    return NextResponse.json({ error: "Missing donationId parameter" }, { status: 400 })
  }

  const donationMessages = messages.filter((m) => m.donationId === donationId)
  return NextResponse.json(donationMessages)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.donationId || !body.sender || !body.senderId || !body.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new message
    const newMessage = {
      id: `msg-${Date.now()}`,
      ...body,
      timestamp: new Date().toISOString(),
    }

    // In a real app, this would save to a database
    messages.push(newMessage)

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 })
  }
}

