import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <img src="/TestLogo.jpg" alt="Tech.Care logo" className="h-8 w-40" />
        {/* <h1 className="text-2xl font-bold">Tech.Care</h1> */}
      </div>
      <nav className="flex space-x-4">
        <Button variant="ghost">Overview</Button>
        <Button variant="ghost">Patients</Button>
        <Button variant="ghost">Schedule</Button>
        <Button variant="ghost">Message</Button>
        <Button variant="ghost">Transactions</Button>
      </nav>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Jose Simmons" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Dr. Jose Simmons</p>
          <p className="text-sm text-gray-500">General Practitioner</p>
        </div>
      </div>
    </header>
  )
}

