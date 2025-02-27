import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
      <h2 className="text-2xl font-medium text-center mb-4">
        Levels of government
      </h2>

      <Accordion type="single" collapsible defaultValue="Bellevue city">
        {Object.entries(representatives).map(([level, reps]) => (
          <AccordionItem key={level} value={level}>
            <AccordionTrigger className="text-xl font-bold text-red-600">
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
                        <div className="flex items-center">
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
                            className="lucide lucide-building mr-2"
                          >
                            <rect
                              width="16"
                              height="20"
                              x="4"
                              y="2"
                              rx="2"
                              ry="2"
                            />
                            <path d="M9 22v-4h6v4" />
                            <path d="M8 6h.01" />
                            <path d="M16 6h.01" />
                            <path d="M12 6h.01" />
                            <path d="M12 10h.01" />
                            <path d="M12 14h.01" />
                            <path d="M16 10h.01" />
                            <path d="M16 14h.01" />
                            <path d="M8 10h.01" />
                            <path d="M8 14h.01" />
                          </svg>
                          Office
                        </div>
                      </th>
                      <th className="text-left py-2 px-4 font-medium">
                        <div className="flex items-center">
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
                            className="lucide lucide-map-pin mr-2"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Address
                        </div>
                      </th>
                      <th className="text-left py-2 px-4 font-medium">
                        <div className="flex items-center">
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
                            className="lucide lucide-link mr-2"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
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
                              className="lucide lucide-globe text-red-600"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              <path d="M2 12h20" />
                            </svg>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              {rep.hasWebsite && (
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
                                  className="lucide lucide-globe text-red-600"
                                >
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                  <path d="M2 12h20" />
                                </svg>
                              )}
                              {rep.hasSocialMedia && (
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
                                  className="lucide lucide-facebook text-red-600"
                                >
                                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button
                              variant="default"
                              className="bg-gray-700 hover:bg-gray-800"
                            >
                              Contact
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
                                className="lucide lucide-chevron-right ml-1"
                              >
                                <path d="m9 18 6-6-6-6" />
                              </svg>
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
