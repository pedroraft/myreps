import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { OfficialWithOffice } from "@/lib/google-civic";
import {
  Building,
  ChevronRight,
  Facebook,
  Globe,
  Instagram,
  Link,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { ContactDialog } from "./ContactDialog";

export function RepresentativeResults({
  data,
}: {
  data?: OfficialWithOffice[];
}) {
  const [selectedRepresentative, setSelectedRepresentative] =
    useState<OfficialWithOffice | null>(null);

  if (!data) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="overflow-x-auto">
      {selectedRepresentative && (
        <ContactDialog
          representative={selectedRepresentative}
          open={!!selectedRepresentative}
          onOpenChange={(open) => {
            if (!open) setSelectedRepresentative(null);
          }}
        />
      )}
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-1 sm:px-4 font-medium">
              Representative
            </th>
            <th className="text-left py-2 px-1 sm:px-4 font-medium">
              <div className="flex items-center gap-2">
                <Building size={22} />
                Office
              </div>
            </th>
            <th className="text-left py-2 px-1 sm:px-4 font-medium hidden lg:table-cell">
              <div className="flex items-center gap-2">
                <MapPin size={22} />
                Address
              </div>
            </th>
            <th className="text-left py-2 px-1 sm:px-4 font-medium hidden lg:table-cell">
              <div className="flex items-center gap-2">
                <Link size={22} />
                Links
              </div>
            </th>
            <th className="text-right py-2 px-1 sm:px-4"></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((official, index) => {
              return (
                <tr key={index} className="border-b">
                  <td className="py-4 px-1 sm:px-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 bg-gray-200 hidden md:table-cell">
                        <AvatarImage
                          src={official?.photoUrl}
                          className="h-full w-full object-cover"
                        />
                        <AvatarFallback className="text-gray-500">
                          {official.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {official.name}{" "}
                          <span className="text-gray-500">
                            ({official.party})
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-1 sm:px-4">
                    {official?.office?.name}
                  </td>
                  <td className="py-4 px-1 sm:px-4 hidden lg:table-cell">
                    {official.address?.map((addr, i) => (
                      <div key={i}>
                        {addr.line1}, {addr.city}, {addr.state} {addr.zip}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-1 md:px-4 hidden lg:table-cell">
                    <div className="flex gap-2">
                      {official.urls
                        ?.filter((url) => !url.includes("wikipedia.org"))
                        .map((url, i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe size={18} />
                          </a>
                        ))}
                      {official.channels?.map((channel, i) => {
                        switch (channel.type) {
                          case "Facebook":
                            return (
                              <a
                                key={i}
                                href={`https://facebook.com/${channel.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Facebook size={18} />
                              </a>
                            );
                          case "Twitter":
                            return (
                              <a
                                key={i}
                                href={`https://twitter.com/${channel.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Twitter size={18} />
                              </a>
                            );
                          case "YouTube":
                            return (
                              <a
                                key={i}
                                href={`https://youtube.com/${channel.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Youtube size={18} />
                              </a>
                            );
                          case "Instagram":
                            return (
                              <a
                                key={i}
                                href={`https://instagram.com/${channel.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Instagram size={18} />
                              </a>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-1 sm:px-4 text-right">
                    <Button onClick={() => setSelectedRepresentative(official)}>
                      Contact
                      <ChevronRight size={18} className="hidden md:block" />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-4 px-1 sm:px-4 text-center text-gray-500"
              >
                No representatives found for this level of government.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
