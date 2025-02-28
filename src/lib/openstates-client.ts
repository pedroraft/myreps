import type { paths } from "@/lib/openstates";
import { OPENSTATES_API_KEY } from "astro:env/server";
import createClient from "openapi-fetch";

export const openStatesClient = createClient<paths>({
  baseUrl: "https://v3.openstates.org/",
  headers: {
    "X-API-Key": OPENSTATES_API_KEY,
  },
});

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
