// Types for our data models
export interface Restaurant {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  description: string
  image: string
  latitude: number
  longitude: number
  cuisineType: string
}

export interface Charity {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  description: string
  image: string
  latitude: number
  longitude: number
  peopleServed: string
  taxId: string
}

export interface FoodItem {
  name: string
  quantity: string
  unit: string
}

export interface Donation {
  id: string
  restaurantId: string
  restaurantName: string
  restaurantImage: string
  charityId: string | null
  charityName: string | null
  charityImage: string | null
  title: string
  description: string
  items: FoodItem[]
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
  pickupTime: string
  expirationTime: string
  location: string
  latitude: number
  longitude: number
  notes: string
}

export interface Message {
  id: string
  donationId: string
  sender: "restaurant" | "charity"
  senderId: string
  senderName: string
  senderImage: string
  content: string
  timestamp: string
}

export interface Activity {
  id: string
  type: "donation_created" | "donation_accepted" | "donation_completed" | "donation_rejected" | "message_received"
  actor: string
  actorId: string
  actorImage: string
  target: string
  targetId: string
  targetImage: string
  timestamp: string
  details: string
  donationId?: string
}

// Mock data
const restaurants: Restaurant[] = [
  {
    id: "rest-1",
    name: "Fresh Bistro",
    email: "manager@freshbistro.com",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    description: "A farm-to-table restaurant specializing in fresh, seasonal ingredients.",
    image: "/images/restaurant-1.png",
    latitude: 37.7749,
    longitude: -122.4194,
    cuisineType: "Italian",
  },
  {
    id: "rest-2",
    name: "Tasty Treats",
    email: "info@tastytreats.com",
    phone: "(555) 234-5678",
    address: "456 Oak St",
    city: "San Francisco",
    state: "CA",
    zip: "94108",
    description: "Bakery and cafe offering fresh pastries, sandwiches, and soups daily.",
    image: "/images/restaurant-2.png",
    latitude: 37.7833,
    longitude: -122.4167,
    cuisineType: "Bakery & Cafe",
  },
  {
    id: "rest-3",
    name: "Pizza Palace",
    email: "orders@pizzapalace.com",
    phone: "(555) 345-6789",
    address: "789 Pine St",
    city: "San Francisco",
    state: "CA",
    zip: "94111",
    description: "Family-owned pizzeria serving authentic Italian pizza and pasta.",
    image: "/images/restaurant-3.png",
    latitude: 37.79,
    longitude: -122.41,
    cuisineType: "Pizza & Italian",
  },
]

const charities: Charity[] = [
  {
    id: "char-1",
    name: "Community Food Bank",
    email: "info@communityfoodbank.org",
    phone: "(555) 987-6543",
    address: "101 Mission St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    description: "Providing food assistance to families in need throughout the Bay Area.",
    image: "/images/charity-1.png",
    latitude: 37.7929,
    longitude: -122.3971,
    peopleServed: "200+ weekly",
    taxId: "12-3456789",
  },
  {
    id: "char-2",
    name: "Homeless Shelter",
    email: "contact@homelessshelter.org",
    phone: "(555) 876-5432",
    address: "202 Howard St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    description: "Emergency housing and meals for individuals experiencing homelessness.",
    image: "/images/charity-2.png",
    latitude: 37.7897,
    longitude: -122.3942,
    peopleServed: "150+ daily",
    taxId: "23-4567890",
  },
  {
    id: "char-3",
    name: "Youth Center",
    email: "programs@youthcenter.org",
    phone: "(555) 765-4321",
    address: "303 Folsom St",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    description: "After-school programs and meals for at-risk youth in the community.",
    image: "/images/charity-3.png",
    latitude: 37.787,
    longitude: -122.3891,
    peopleServed: "100+ children daily",
    taxId: "34-5678901",
  },
]

const donations: Donation[] = [
  {
    id: "1",
    restaurantId: "rest-1",
    restaurantName: "Fresh Bistro",
    restaurantImage: "/images/restaurant-1.png",
    charityId: "char-1",
    charityName: "Community Food Bank",
    charityImage: "/images/charity-1.png",
    title: "Catering Surplus",
    description: "Leftover food from a corporate catering event",
    items: [
      { name: "Pasta", quantity: "5", unit: "kg" },
      { name: "Bread", quantity: "10", unit: "loaves" },
      { name: "Vegetables", quantity: "3", unit: "kg" },
    ],
    status: "pending",
    createdAt: "2023-04-15T10:30:00Z",
    pickupTime: "2023-04-15T17:00:00Z",
    expirationTime: "2023-04-16T10:30:00Z",
    location: "123 Main St, San Francisco, CA 94105",
    latitude: 37.7749,
    longitude: -122.4194,
    notes: "Please use the back entrance for pickup. Call when you arrive.",
  },
  {
    id: "2",
    restaurantId: "rest-2",
    restaurantName: "Tasty Treats",
    restaurantImage: "/images/restaurant-2.png",
    charityId: "char-2",
    charityName: "Homeless Shelter",
    charityImage: "/images/charity-2.png",
    title: "Daily Bakery Items",
    description: "Fresh sandwiches and soup from today",
    items: [
      { name: "Sandwiches", quantity: "15", unit: "pieces" },
      { name: "Soup", quantity: "5", unit: "liters" },
    ],
    status: "confirmed",
    createdAt: "2023-04-14T14:45:00Z",
    pickupTime: "2023-04-15T12:00:00Z",
    expirationTime: "2023-04-15T20:00:00Z",
    location: "456 Oak St, San Francisco, CA 94108",
    latitude: 37.7833,
    longitude: -122.4167,
    notes: "Items will be packaged and ready at the front counter.",
  },
  {
    id: "3",
    restaurantId: "rest-3",
    restaurantName: "Pizza Palace",
    restaurantImage: "/images/restaurant-3.png",
    charityId: "char-3",
    charityName: "Youth Center",
    charityImage: "/images/charity-3.png",
    title: "Pizza Night Leftovers",
    description: "Extra pizzas and salad from our Friday night service",
    items: [
      { name: "Pizza", quantity: "8", unit: "large" },
      { name: "Salad", quantity: "4", unit: "kg" },
    ],
    status: "completed",
    createdAt: "2023-04-13T18:20:00Z",
    pickupTime: "2023-04-14T19:00:00Z",
    expirationTime: "2023-04-15T18:00:00Z",
    location: "789 Pine St, San Francisco, CA 94111",
    latitude: 37.79,
    longitude: -122.41,
    notes: "Ask for Marco at the delivery entrance.",
  },
  {
    id: "4",
    restaurantId: "rest-1",
    restaurantName: "Fresh Bistro",
    restaurantImage: "/images/restaurant-1.png",
    charityId: null,
    charityName: null,
    charityImage: null,
    title: "Weekend Special Extras",
    description: "Extra prepared meals from our weekend special menu",
    items: [
      { name: "Lasagna", quantity: "6", unit: "trays" },
      { name: "Garlic Bread", quantity: "12", unit: "loaves" },
      { name: "Tiramisu", quantity: "8", unit: "portions" },
    ],
    status: "pending",
    createdAt: "2023-04-16T09:15:00Z",
    pickupTime: "2023-04-16T15:00:00Z",
    expirationTime: "2023-04-17T09:00:00Z",
    location: "123 Main St, San Francisco, CA 94105",
    latitude: 37.7749,
    longitude: -122.4194,
    notes: "These items are refrigerated and ready for pickup.",
  },
]

const messages: Message[] = [
  {
    id: "msg1",
    donationId: "1",
    sender: "restaurant",
    senderId: "rest-1",
    senderName: "Fresh Bistro",
    senderImage: "/images/restaurant-1.png",
    content: "Hi, we have some extra food from a catering event. Would you be able to pick it up today?",
    timestamp: "2023-04-15T10:35:00Z",
  },
  {
    id: "msg2",
    donationId: "1",
    sender: "charity",
    senderId: "char-1",
    senderName: "Community Food Bank",
    senderImage: "/images/charity-1.png",
    content: "Yes, we can send someone at 5 PM. Is that okay?",
    timestamp: "2023-04-15T11:15:00Z",
  },
  {
    id: "msg3",
    donationId: "1",
    sender: "restaurant",
    senderId: "rest-1",
    senderName: "Fresh Bistro",
    senderImage: "/images/restaurant-1.png",
    content: "Perfect! We'll have everything packaged and ready by then.",
    timestamp: "2023-04-15T11:20:00Z",
  },
  {
    id: "msg4",
    donationId: "2",
    sender: "restaurant",
    senderId: "rest-2",
    senderName: "Tasty Treats",
    senderImage: "/images/restaurant-2.png",
    content: "We have fresh sandwiches and soup available for pickup today.",
    timestamp: "2023-04-14T14:50:00Z",
  },
  {
    id: "msg5",
    donationId: "2",
    sender: "charity",
    senderId: "char-2",
    senderName: "Homeless Shelter",
    senderImage: "/images/charity-2.png",
    content: "That's great! We'll send our driver at noon.",
    timestamp: "2023-04-14T15:05:00Z",
  },
]

const activities: Activity[] = [
  {
    id: "act1",
    type: "donation_created",
    actor: "Fresh Bistro",
    actorId: "rest-1",
    actorImage: "/images/restaurant-1.png",
    target: "Community Food Bank",
    targetId: "char-1",
    targetImage: "/images/charity-1.png",
    timestamp: "2023-04-15T10:30:00Z",
    details: "5 kg pasta, 10 loaves bread, 3 kg vegetables",
    donationId: "1",
  },
  {
    id: "act2",
    type: "donation_accepted",
    actor: "Homeless Shelter",
    actorId: "char-2",
    actorImage: "/images/charity-2.png",
    target: "Tasty Treats",
    targetId: "rest-2",
    targetImage: "/images/restaurant-2.png",
    timestamp: "2023-04-14T15:45:00Z",
    details: "15 sandwiches, 5 liters soup",
    donationId: "2",
  },
  {
    id: "act3",
    type: "donation_completed",
    actor: "Youth Center",
    actorId: "char-3",
    actorImage: "/images/charity-3.png",
    target: "Pizza Palace",
    targetId: "rest-3",
    targetImage: "/images/restaurant-3.png",
    timestamp: "2023-04-14T19:30:00Z",
    details: "8 large pizzas, 4 kg salad",
    donationId: "3",
  },
  {
    id: "act4",
    type: "message_received",
    actor: "Community Food Bank",
    actorId: "char-1",
    actorImage: "/images/charity-1.png",
    target: "Fresh Bistro",
    targetId: "rest-1",
    targetImage: "/images/restaurant-1.png",
    timestamp: "2023-04-15T11:15:00Z",
    details: "Yes, we can send someone at 5 PM. Is that okay?",
    donationId: "1",
  },
  {
    id: "act5",
    type: "donation_created",
    actor: "Fresh Bistro",
    actorId: "rest-1",
    actorImage: "/images/restaurant-1.png",
    target: "Open",
    targetId: "",
    targetImage: "",
    timestamp: "2023-04-16T09:15:00Z",
    details: "6 trays lasagna, 12 loaves garlic bread, 8 portions tiramisu",
    donationId: "4",
  },
]

// Data service functions
export const dataService = {
  // Restaurant functions
  getRestaurants: () => restaurants,
  getRestaurantById: (id: string) => restaurants.find((r) => r.id === id),

  // Charity functions
  getCharities: () => charities,
  getCharityById: (id: string) => charities.find((c) => c.id === id),

  // Donation functions
  getDonations: () => donations,
  getDonationById: (id: string) => donations.find((d) => d.id === id),
  getDonationsByRestaurant: (restaurantId: string) => donations.filter((d) => d.restaurantId === restaurantId),
  getDonationsByCharity: (charityId: string) => donations.filter((d) => d.charityId === charityId),
  getAvailableDonations: () => donations.filter((d) => d.status === "pending" && d.charityId === null),

  // Message functions
  getMessagesByDonation: (donationId: string) => messages.filter((m) => m.donationId === donationId),

  // Activity functions
  getActivities: () => activities,
  getActivitiesByRestaurant: (restaurantId: string) =>
    activities.filter((a) => a.actorId === restaurantId || a.targetId === restaurantId),
  getActivitiesByCharity: (charityId: string) =>
    activities.filter((a) => a.actorId === charityId || a.targetId === charityId),

  // Create functions (in a real app, these would make API calls)
  createDonation: (donation: Omit<Donation, "id" | "createdAt">) => {
    const newDonation = {
      ...donation,
      id: `donation-${Date.now()}`,
      createdAt: new Date().toISOString(),
    } as Donation

    // In a real app, this would be an API call
    // For now, we'll just return the new donation
    return newDonation
  },

  updateDonationStatus: (donationId: string, status: Donation["status"], charityId?: string) => {
    const donation = donations.find((d) => d.id === donationId)
    if (!donation) return null

    // In a real app, this would be an API call
    // For now, we'll just return the updated donation
    return {
      ...donation,
      status,
      charityId: charityId || donation.charityId,
    }
  },

  sendMessage: (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    } as Message

    // In a real app, this would be an API call
    // For now, we'll just return the new message
    return newMessage
  },
}

