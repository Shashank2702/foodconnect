"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("restaurant")

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "restaurant" || type === "charity") {
      setActiveTab(type)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <img src="/images/logo.png" alt="FoodConnect Logo" className="h-8 w-8" />
        <span className="text-lg font-bold">FoodConnect</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Join our platform to start making a difference</p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
            <TabsTrigger value="charity">Charity</TabsTrigger>
          </TabsList>
          <TabsContent value="restaurant">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Restaurant Registration</CardTitle>
                  <CardDescription>Register your restaurant to donate surplus food</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Restaurant Name</Label>
                    <Input id="restaurant-name" placeholder="Your Restaurant Name" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-email">Email</Label>
                      <Input id="restaurant-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-phone">Phone Number</Label>
                      <Input id="restaurant-phone" type="tel" placeholder="(123) 456-7890" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-address">Address</Label>
                    <Input id="restaurant-address" placeholder="123 Main St" required />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-city">City</Label>
                      <Input id="restaurant-city" placeholder="City" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-state">State</Label>
                      <Input id="restaurant-state" placeholder="State" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-zip">ZIP Code</Label>
                      <Input id="restaurant-zip" placeholder="ZIP" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-description">Description</Label>
                    <Textarea
                      id="restaurant-description"
                      placeholder="Tell us about your restaurant and the types of food you typically have available for donation"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-password">Password</Label>
                      <Input id="restaurant-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-confirm-password">Confirm Password</Label>
                      <Input id="restaurant-confirm-password" type="password" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="charity">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Charity Registration</CardTitle>
                  <CardDescription>Register your charity to receive food donations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="charity-name">Charity Name</Label>
                    <Input id="charity-name" placeholder="Your Charity Name" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="charity-email">Email</Label>
                      <Input id="charity-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="charity-phone">Phone Number</Label>
                      <Input id="charity-phone" type="tel" placeholder="(123) 456-7890" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="charity-address">Address</Label>
                    <Input id="charity-address" placeholder="123 Main St" required />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="charity-city">City</Label>
                      <Input id="charity-city" placeholder="City" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="charity-state">State</Label>
                      <Input id="charity-state" placeholder="State" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="charity-zip">ZIP Code</Label>
                      <Input id="charity-zip" placeholder="ZIP" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="charity-description">Description</Label>
                    <Textarea
                      id="charity-description"
                      placeholder="Tell us about your charity, the people you serve, and your food needs"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="charity-tax-id">Tax ID / EIN</Label>
                    <Input id="charity-tax-id" placeholder="XX-XXXXXXX" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="charity-password">Password</Label>
                      <Input id="charity-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="charity-confirm-password">Confirm Password</Label>
                      <Input id="charity-confirm-password" type="password" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

