import { SearchBox } from "@mapbox/search-js-react";
import type { SearchBoxProps } from "@mapbox/search-js-react/dist/components/SearchBox";
import { PUBLIC_MAPBOX_TOKEN } from "astro:env/client";

const FixTypingSearchBox = SearchBox as React.ComponentType<SearchBoxProps>;

export function SearchForm() {
  return (
    <div className="max-w-3xl mx-auto">
      <style>
        {`mapbox-search-box {
        width: 100%;
        }`}
      </style>
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <FixTypingSearchBox
          accessToken={PUBLIC_MAPBOX_TOKEN}
          options={{
            language: "en",
            country: "US",
            types: "",
          }}
          onRetrieve={(address) => {
            const latitude =
              address.features?.[0]?.properties?.coordinates?.latitude;
            const longitude =
              address.features?.[0]?.properties?.coordinates?.longitude;
            location.replace(
              `/${address?.features?.[0]?.properties?.full_address?.replace(", United States", "")}:${latitude}:${longitude}`,
            );
          }}
          placeholder={
            window?.location?.pathname
              ? decodeURIComponent(window.location.pathname).substring(1)
              : "Search address"
          }
        />
      </div>
    </div>
  );
}
