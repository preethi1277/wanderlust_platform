"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Wanderlust!",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Try admin1@gmail.com / 123",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col notebook-bg">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="h-8 w-8 text-pastel-blue" />
              <span className="text-2xl font-bold text-foreground">
                Wander<span className="font-cursive text-pastel-pink">lust</span>
              </span>
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 notebook-paper p-6 rounded-lg" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium leading-6">
                Email address
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-pastel-blue focus:ring-2 focus:ring-inset focus:ring-pastel-blue"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="block text-sm font-medium leading-6">
                  Password
                </Label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-pastel-blue hover:text-pastel-purple">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-pastel-blue focus:ring-2 focus:ring-inset focus:ring-pastel-blue"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-pastel-blue to-pastel-purple px-3 py-1.5 text-sm font-semibold leading-6 text-foreground shadow-sm hover:from-pastel-purple hover:to-pastel-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pastel-blue"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-foreground/70">Demo credentials: admin1@gmail.com / 123</p>
        </div>
      </div>
    </div>
  )
}
