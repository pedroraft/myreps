import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { OfficialWithOffice } from "@/lib/google-civic";
import { useState } from "react";
import { CopyButton } from "./CopyButton";

type ContactMethod = {
  type: "website" | "social" | "phone" | "address" | "email";
  value: string;
  label?: string;
};

export type Representative = {
  id: string;
  name: string;
  party: string;
  office: string;
  contactMethods: ContactMethod[];
};

type ContactDialogProps = {
  representative: OfficialWithOffice;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContactDialog({
  representative: _representative,
  open,
  onOpenChange,
}: ContactDialogProps) {
  // this is messy but is also temporary, chill
  const mapToRepresentative = (
    official: OfficialWithOffice,
  ): Representative => ({
    id: official.name,
    name: official.name,
    party: official.party || "Unknown",
    office: official.office.name,
    contactMethods: [
      ...(official.urls?.map((url) => ({
        type: "website",
        value: url,
        label: "Website",
      })) || []),
      ...(official.channels?.map((channel) => ({
        type: "social",
        value: `https://${channel.type.toLowerCase()}.com/${channel.id}`,
        label: channel.type,
      })) || []),
      ...(official.phones?.map((phone) => ({
        type: "phone",
        value: phone,
        label: "Phone",
      })) || []),
      ...(official.address?.map((addr) => ({
        type: "address",
        value: `${addr.line1}, ${addr.city}, ${addr.state} ${addr.zip}`,
        label: "Address",
      })) || []),
      ...(official.emails?.map((email) => ({
        type: "email",
        value: email,
        label: "Email",
      })) || []),
    ] as ContactMethod[],
  });
  const representative = mapToRepresentative(_representative);

  const [activeTab, setActiveTab] = useState<ContactMethod["type"]>("website");

  const contactMethodsGrouped = representative.contactMethods.reduce(
    (acc, method) => {
      if (!acc[method.type]) {
        acc[method.type] = [];
      }
      acc[method.type].push(method);
      return acc;
    },
    {} as Record<ContactMethod["type"], ContactMethod[]>,
  );

  const renderContactMethods = (methods: ContactMethod[]) => {
    return methods.map((method, index) => {
      const isLink = method.type === "website" || method.type === "social";
      return (
        <div key={index} className="mb-2">
          <div className="text-sm bg-gray-100 p-2 rounded-md relative top-2 float-right mr-2">
            {(method.type === "phone" ||
              method.type === "email" ||
              method.type === "address") && <CopyButton value={method.value} />}
          </div>
          {method.label && <div className="font-medium">{method.label}</div>}
          {isLink ? (
            <a
              href={method.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 underline"
            >
              {method.value}
            </a>
          ) : (
            <div className="text-sm text-gray-700">{method.value}</div>
          )}
        </div>
      );
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Contact {representative.name}</AlertDialogTitle>
          <AlertDialogDescription>
            {representative.office} - {representative.party}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4">
          <div className="flex space-x-2 mb-4">
            {Object.keys(contactMethodsGrouped).map((type) => (
              <Button
                key={type}
                variant={activeTab === type ? "default" : "outline"}
                onClick={() => setActiveTab(type as ContactMethod["type"])}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            {renderContactMethods(contactMethodsGrouped[activeTab] || [])}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
