import { PUBLIC_LOCATIONIQ_TOKEN } from "astro:env/client";
import CreatableSelect from "react-select/async";

const fetchLocation = async (inputValue: string) => {
  if (!inputValue) return [];
  const url = new URL("https://api.locationiq.com/v1/autocomplete");
  url.searchParams.set("key", PUBLIC_LOCATIONIQ_TOKEN);
  url.searchParams.set("q", inputValue);
  url.searchParams.set("countrycodes", "us");

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data.map((item: any) => ({
    value: item.osm_id,
    label: item.display_address.split(",").slice(0, -1).join(","),
  }));
};

let timeoutId: Timer | undefined;
const debouncedCall = (inputValue: string) =>
  new Promise<
    {
      value: string;
      label: string;
    }[]
  >((resolve) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      resolve(fetchLocation(inputValue));
    }, 1000);
  });

export const ManualSearchForm = () => (
  <CreatableSelect
    cacheOptions
    defaultOptions
    loadOptions={debouncedCall}
    placeholder={
      window?.location?.pathname
        ? decodeURIComponent(window.location.pathname).substring(1)
        : "Search address"
    }
    onChange={(address) => {
      if (!address?.label) return;
      location.replace(`/${address?.label}`);
    }}
    components={{ IndicatorsContainer: () => null }}
  />
);
