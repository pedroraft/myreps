import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Locate, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";

export function SearchForm() {
  const [address, setAddress] = useState("");
  const [filters, setFilters] = useState({
    local: true,
    county: true,
    state: true,
    federal: true,
  });

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would trigger an API call
    console.log("Searching for:", address, "with filters:", filters);
  };

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
          {typeof navigator !== "undefined" && navigator.geolocation && (
            <div className="flex gap-2">
              <Button type="submit">
                <Search />
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() =>
                  navigator.geolocation.getCurrentPosition(console.log)
                }
              >
                <Locate />
                Find me
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
