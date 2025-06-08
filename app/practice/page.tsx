"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState("common")

  const practiceCategories = {
    common: ["Common English Words", "Top 200 Words", "Top 1000 Words"],
    code: ["JavaScript", "Python", "TypeScript", "HTML/CSS", "SQL"],
    quotes: ["Famous Quotes", "Movie Quotes", "Book Excerpts"],
    custom: ["My Custom Texts", "Import Text", "Create New"],
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Practice Library</h1>

      <Tabs defaultValue="common" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="common">Common</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        {Object.entries(practiceCategories).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {items.map((item) => (
                <Card key={item} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">{item}</h3>
                    <Button>Practice</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}
