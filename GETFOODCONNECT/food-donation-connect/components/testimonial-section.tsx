import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function TestimonialSection() {
  return (
    <section id="testimonials" className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from the restaurants and charities making a difference in their communities.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 pt-12">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/images/restaurant-1.png" alt="Restaurant owner" />
                  <AvatarFallback>RO</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Owner, Fresh Bistro</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex">
                <Quote className="h-8 w-8 text-primary opacity-50 mr-2" />
                <p className="text-muted-foreground">
                  "FoodConnect has transformed how we handle surplus food. Instead of throwing away perfectly good
                  meals, we're now able to donate them to those in need. The platform is intuitive and the real-time
                  tracking makes coordination seamless."
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/images/charity-1.png" alt="Charity director" />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">Michael Rodriguez</h3>
                  <p className="text-sm text-muted-foreground">Director, Community Food Bank</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex">
                <Quote className="h-8 w-8 text-primary opacity-50 mr-2" />
                <p className="text-muted-foreground">
                  "Since joining FoodConnect, we've been able to serve 40% more meals to our community. The platform
                  connects us with restaurants we never knew were willing to donate, and the quality of food has
                  improved dramatically."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

