
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"
import { useState } from "react"

export function SearchForm() {
  const [address, setAddress] = useState("")
  const [filters, setFilters] = useState({
    local: true,
    county: true,
    state: true,
    federal: true,
  })

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would trigger an API call
    console.log("Searching for:", address, "with filters:", filters)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <Input
            type="text"
            placeholder="Enter your address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-grow"
          />
          <div className="flex gap-2">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search mr-2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Search
            </Button>
            <Button type="button" variant="outline" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Find me
            </Button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-4 justify-center">
        <span className="text-gray-600">Show level of government:</span>
        <div className="flex items-center space-x-2">
          <Checkbox id="local" checked={filters.local} onCheckedChange={() => handleFilterChange("local")} />
          <Label htmlFor="local">Local</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="county" checked={filters.county} onCheckedChange={() => handleFilterChange("county")} />
          <Label htmlFor="county">County</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="state" checked={filters.state} onCheckedChange={() => handleFilterChange("state")} />
          <Label htmlFor="state">State</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="federal" checked={filters.federal} onCheckedChange={() => handleFilterChange("federal")} />
          <Label htmlFor="federal">Federal</Label>
        </div>
      </div>
    </div>
  )
}
