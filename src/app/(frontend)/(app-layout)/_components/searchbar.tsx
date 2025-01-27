"use client";

import { Location } from "@payload-types";
import { useRouter } from "next/navigation";
import { LocationInput } from "./location-input";

export function Searchbar() {
  const router = useRouter();
  const handleSearch = (selectedLocation: Location | null) => {
    if (!selectedLocation) {
      return;
    }
    router.push(`/location/${selectedLocation.id}`);
  };

  return (
    <LocationInput
      inputClassName="h-auto"
      className="absolute top-4 left-4 z-10 max-w-sm mx-auto h-auto rounded-3xl border shadow-sm"
      id="searchbar"
      placeholder="Pesquisar por ponto de interesse"
      onLocationSelect={handleSearch}
    />
  );
}
