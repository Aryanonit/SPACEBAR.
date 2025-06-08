import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Keyboard className="h-6 w-6" />
          <span className="text-xl">TypeMaster</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/practice" className="text-sm font-medium">
            Practice
          </Link>
          <Link href="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}
