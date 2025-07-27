"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { PageTransition } from "@/components/page-transition"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center notebook-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-pastel-blue border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col notebook-bg">
      <Navbar />
      <div className="flex flex-1">
        <div className="fade-in hidden md:block" style={{ animationDuration: "0.5s" }}>
          <Sidebar />
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <PageTransition>
            <div className="stagger-children">{children}</div>
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
