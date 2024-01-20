"use client"

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const Page = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter()
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(isAuthenticated);
    if (isAuthenticated) {
      window.location.href = "/";
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === process.env.NEXT_PUBLIC_USERNAME && password === process.env.NEXT_PUBLIC_PASSWORD) {
      localStorage.setItem('isAuthenticated', true)
      router.push('/')
    }
  }

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 items-center justify-center'>
      <Card className="mx-auto max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Please enter your username and password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  required value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </MaxWidthWrapper>
  )
}

export default Page