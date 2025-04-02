import { Utensils, Search, Calendar, Truck, CheckCircle } from "lucide-react"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Process, Big Impact</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy for restaurants to donate surplus food and for charities to receive it.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 pt-12">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Utensils className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">1. Register</h3>
            <p className="text-muted-foreground">
              Restaurants and charities create accounts and complete their profiles with location details.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">2. List Donations</h3>
            <p className="text-muted-foreground">
              Restaurants list available food items, quantities, and pickup times.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">3. Match</h3>
            <p className="text-muted-foreground">
              Charities browse available donations and request items that match their needs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">4. Pickup</h3>
            <p className="text-muted-foreground">
              Charities use real-time location tracking to pick up donations from restaurants.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">5. Confirm</h3>
            <p className="text-muted-foreground">Both parties confirm the donation was completed successfully.</p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Utensils className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">6. Repeat</h3>
            <p className="text-muted-foreground">
              Build ongoing relationships between restaurants and charities for regular donations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

