"use client"

import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { PowerCircle } from "lucide-react";

const Home = () => {

  const [device, setDevice] = useState("device1");
  const [speed, setSpeed] = useState("");
  const [acc, setAcc] = useState("");
  const [pause, setPause] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  })

  const handleStart = async (e) => {
    e.preventDefault()
    if (device === "device1") {
      setIsLive(true)
      const response = await fetch(`https://65ab5edefcd1c9dcffc64e52.mockapi.io/api/v1/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
  }

  return (
    isAuthenticated ? (
      <div className="flex h-screen" >
        <div className="w-64 border-r relative">
          <nav className="flex flex-col gap-2 p-4">
            <Button
              className="flex items-center gap-2 p-2 rounded-m text-sm font-medium transition-colors hover:bg-gray-200 hover:text-black dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => setDevice("device1")}
            >
              Device1
            </Button>
            <Button
              className="flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setDevice("device2")}
            >
              Device2
            </Button>
            <Button
              className="flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setDevice("device3")}
            >
              Device3
            </Button>
            <Button
              className="flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setDevice("device4")}
            >
              Device4
            </Button>
          </nav>

          <div className="flex justify-center absolute bottom-2 left-4">
            <Button
              className="w-56 flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors bg-red-300 hover:bg-red-500 dark:hover:bg-gray-700"
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          </div>
        </div>


        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold mb-4">{device}</h2>
            <PowerCircle className={`${isLive ? "text-green-500 h-7 w-7 mb-4" : "text-red-500 h-7 w-7 mb-4"}`} />
          </div>
          <Card className="mx-auto max-w-md">
            <form onSubmit={handleStart}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Setting</CardTitle>
                <CardDescription>Please enter value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="speed">Speed</Label>
                    <Input
                      id="speed"
                      placeholder="Enter speed"
                      required value={speed}
                      onChange={(e) => setSpeed(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accelerometer">Accelerometer</Label>
                    <Input
                      id="accelerometer"
                      placeholder="Enter accelerometer"
                      required
                      value={acc}
                      onChange={(e) => setAcc(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pause">Pause</Label>
                    <Input
                      id="pause"
                      placeholder="Enter pause"
                      required
                      value={pause}
                      onChange={(e) => setPause(e.target.value)} />
                  </div>
                  <Button className="w-full" type="submit">
                    Start
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div >
    ) : (
      <></>
    )
  )
}

export default Home;
