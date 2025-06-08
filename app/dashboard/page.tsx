"use client"

import { Button } from "@/components/ui/button"

import { LineChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  // Mock data - in a real app, this would come from your database
  const wpmData = [
    { name: "Mon", wpm: 45 },
    { name: "Tue", wpm: 52 },
    { name: "Wed", wpm: 49 },
    { name: "Thu", wpm: 55 },
    { name: "Fri", wpm: 58 },
    { name: "Sat", wpm: 61 },
    { name: "Sun", wpm: 65 },
  ]

  const accuracyData = [
    { name: "Mon", accuracy: 92 },
    { name: "Tue", accuracy: 94 },
    { name: "Wed", accuracy: 91 },
    { name: "Thu", accuracy: 95 },
    { name: "Fri", accuracy: 93 },
    { name: "Sat", accuracy: 96 },
    { name: "Sun", accuracy: 97 },
  ]

  const recentTests = [
    { id: 1, mode: "Normal", wpm: 65, accuracy: 97, date: "Today, 2:30 PM" },
    { id: 2, mode: "Code", wpm: 58, accuracy: 94, date: "Today, 11:15 AM" },
    { id: 3, mode: "Email", wpm: 62, accuracy: 96, date: "Yesterday, 7:45 PM" },
    { id: 4, mode: "Normal", wpm: 59, accuracy: 95, date: "Yesterday, 3:20 PM" },
  ]

  const weaknesses = [
    { key: "th", count: 12 },
    { key: "er", count: 9 },
    { key: "comma", count: 7 },
    { key: "p", count: 5 },
  ]

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Typing Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average WPM</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">58</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Accuracy</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">94%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Tests Completed</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">23</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>WPM Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={wpmData}
              index="name"
              categories={["wpm"]}
              colors={["#10b981"]}
              valueFormatter={(value) => `${value} WPM`}
              className="h-72"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accuracy Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={accuracyData}
              index="name"
              categories={["accuracy"]}
              colors={["#6366f1"]}
              valueFormatter={(value) => `${value}%`}
              className="h-72"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{test.mode}</div>
                    <div className="text-sm text-muted-foreground">{test.date}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <div className="font-medium">{test.wpm} WPM</div>
                      <div className="text-sm text-muted-foreground">Speed</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{test.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Areas to Improve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Common Mistakes</h4>
                <div className="flex flex-wrap gap-2">
                  {weaknesses.map((item) => (
                    <Badge key={item.key} variant="outline">
                      {item.key} ({item.count})
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Suggested Practice</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Common Digraphs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Punctuation Practice
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
