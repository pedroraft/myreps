import { GOOGLE_CIVIC_API_KEY } from "astro:env/server";

interface RepresentativeInfoResponse {
  kind: "civicinfo#representativeInfoResponse";
  normalizedInput: Address;
  divisions: Record<string, Division>;
  offices: Office[];
  officials: Official[];
}

interface Address {
  locationName?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  city: string;
  state: string;
  zip: string;
}

interface Division {
  name: string;
  alsoKnownAs?: string[];
  officeIndices?: number[];
}

interface Office {
  name: string;
  divisionId: string;
  levels?: string[];
  roles?: string[];
  sources?: Source[];
  officialIndices?: number[];
}

interface Source {
  name: string;
  official: boolean;
}

interface Official {
  name: string;
  address?: Address[];
  party?: string;
  phones?: string[];
  urls?: string[];
  photoUrl?: string;
  emails?: string[];
  channels?: Channel[];
}

interface Channel {
  type: string;
  id: string;
}

export type OfficialWithOffice = Official & { office: Office };

export const getRepresentatives = async (
  address: string,
): Promise<OfficialWithOffice[]> => {
  try {
    const url = new URL(
      "https://www.googleapis.com/civicinfo/v2/representatives",
    );
    url.searchParams.set("key", GOOGLE_CIVIC_API_KEY);
    url.searchParams.set("address", address);

    const response = await fetch(url);

    const data = (await response.json()) as RepresentativeInfoResponse;
    const { officials, offices } = data;
    const officialsWithOffice = officials
      .reduce((arr, official, index) => {
        const office = offices.find((office) =>
          office.officialIndices?.includes(index),
        );
        if (!office) return arr;
        return [...arr, { ...official, office }];
      }, [] as OfficialWithOffice[])
      .sort(
        (a, b) =>
          (b?.office?.officialIndices?.[0] || 0) -
          (a?.office?.officialIndices?.[0] || 0),
      );

    return officialsWithOffice;
  } catch (error) {
    console.error("Error fetching representatives:", error);
    throw error;
  }
};
