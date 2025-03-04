import type { paths } from "@/lib/openstates";
import { OPENSTATES_API_KEY } from "astro:env/server";
import createClient from "openapi-fetch";
import type { Office, OfficialWithOffice } from "./google-civic";

export const openStatesClient = createClient<paths>({
  baseUrl: "https://v3.openstates.org/",
  headers: {
    "X-API-Key": OPENSTATES_API_KEY,
  },
});

export const fallbackRepresentatives = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<OfficialWithOffice[]> => {
  const { data } = await openStatesClient.GET("/people.geo", {
    params: {
      query: {
        lng,
        lat,
        include: ["links", "offices"],
      },
    },
  });

  const results = data?.results
    ?.reduce((arr, official, index) => {
      if (!official?.offices?.[0]) return arr;

      const office = {
        name: official?.current_role?.title || "Unknown",
      } as Office;
      return [
        ...arr,
        {
          ...official,
          office,
          address: official?.offices
            ?.map((o) => o?.address || "")
            .filter(Boolean),
          urls: official?.links?.map((l) => l?.url || "").filter(Boolean),
          phones: official?.offices?.map((o) => o?.voice || "").filter(Boolean),
        },
      ];
    }, [] as OfficialWithOffice[])
    .sort((a, b) => a?.office.name.localeCompare(b?.office.name));

  return results as any;
};

// ocd-jurisdiction/country:us/state:tx/place:houston/government
export const encodeJurisdiction = ({
  state: _state,
  city: _city,
}: {
  state?: string;
  city?: string;
}) => {
  let jurisdiction = "ocd-jurisdiction/country:us";
  const state = _state?.toLowerCase().trim();
  const city = _city?.toLowerCase().trim().replaceAll(" ", "_");
  if (state) {
    if (state?.length > 2) throw new Error("State name too long");
    if (city) {
      if (city?.length > 100) throw new Error("City name too long");
      return `${jurisdiction}/state:${state}/place:${city}/government`;
    }
    return `${jurisdiction}/state:${state}/government`;
  }
  return `${jurisdiction}/government`;
};
