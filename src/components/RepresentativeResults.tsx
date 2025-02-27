import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Building,
  ChevronRight,
  Facebook,
  Globe,
  Link,
  MapPin,
} from "lucide-react";
import { useState } from "react";

type Representative = {
  id: string;
  name: string;
  party: string;
  office: string;
  hasWebsite: boolean;
  hasSocialMedia: boolean;
};

export function RepresentativeResults() {
  // This would normally come from an API call
  const [representatives] = useState<Record<string, Representative[]>>({
    "Bellevue city": [
      {
        id: "1",
        name: "Conrad Lee",
        party: "N",
        office: "Bellevue City Council Member",
        hasWebsite: true,
        hasSocialMedia: false,
      },
      {
        id: "2",
        name: "Dave Hamilton",
        party: "N",
        office: "Bellevue City Council Member",
        hasWebsite: true,
        hasSocialMedia: true,
      },
      {
        id: "3",
        name: "Janice Zahn",
        party: "N",
        office: "Bellevue City Council Member",
        hasWebsite: true,
        hasSocialMedia: false,
      },
    ],
    "bellevue school district": [],
    Washington: [],
    Federal: [],
  });

  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible defaultValue="Bellevue city">
        {Object.entries(representatives).map(([level, reps]) => (
          <AccordionItem key={level} value={level}>
            <AccordionTrigger className="text-xl font-bold text-gray-800 capitalize">
              {level}
            </AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-medium">
                        Representative
                      </th>
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
                    {reps.length > 0 ? (
                      reps.map((rep) => (
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
                                  <span className="text-gray-500">
                                    ({rep.party})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">{rep.office}</td>
                          <td className="py-4 px-4">
                            <Globe size={22} />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              {rep.hasWebsite && <Globe size={22} />}
                              {rep.hasSocialMedia && <Facebook size={22} />}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button>
                              Contact
                              <ChevronRight size={22} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-4 px-4 text-center text-gray-500"
                        >
                          No representatives found for this level of government.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
