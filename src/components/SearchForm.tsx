import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { parseLocation } from "parse-address";
import type React from "react";
import { useState } from "react";

export function SearchForm() {
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { state, city } = parseLocation(address);
      location.href = `/${state}:${city}`;
    } catch (error) {
      console.error(error);
    }
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
          <div className="flex gap-2">
            <Button type="submit" data-umami-event="Search">
              <Search />
              Search
            </Button>
            {/* <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() =>
                navigator.geolocation.getCurrentPosition(console.log)
              }
              data-umami-event="Find me"
              disabled={
                typeof navigator === "undefined" || !navigator.geolocation
              }
            >
              <Locate />
              Find me
            </Button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
