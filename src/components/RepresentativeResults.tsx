import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { components } from "@/lib/openstates";
import {
  Building,
  ChevronRight,
  Facebook,
  Globe,
  Link,
  MapPin,
} from "lucide-react";

export function RepresentativeResults({
  data,
}: {
  data?: components["schemas"]["Person"][];
}) {
  if (!data) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4 font-medium">Representative</th>
            <th className="text-left py-2 px-4 font-medium">
              <div className="flex items-center gap-2">
                <Building size={22} />
                Office
              </div>
            </th>
            <th className="text-left py-2 px-4 font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={22} />
                Address
              </div>
            </th>
            <th className="text-left py-2 px-4 font-medium">
              <div className="flex items-center gap-2">
                <Link size={22} />
                Links
              </div>
            </th>
            <th className="text-right py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((rep) => (
              <tr key={rep.id} className="border-b">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 bg-gray-200">
                      <AvatarFallback className="text-gray-500">
                        {rep.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {rep.name}{" "}
                        <span className="text-gray-500">({rep.party})</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">{rep.offices?.[0].name}</td>
                <td className="py-4 px-4">
                  <Globe size={18} />
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <Globe size={18} />
                    <Facebook size={18} />
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <a href={rep.email ? `mailto:${rep.email}` : ""}>
                    <Button disabled={!rep.email}>
                      Contact
                      <ChevronRight size={18} />
                    </Button>
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                No representatives found for this level of government.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
