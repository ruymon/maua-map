import { LocationInput } from "./location-input";

export function Searchbar() {
  return (
    <LocationInput
      inputClassName="h-auto"
      className="absolute md:top-4 inset-x-1/2 md:inset-x-auto md:translate-x-0 -translate-x-1/2 bottom-2 md:bottom-auto w-11/12 md:left-4 z-10 md:max-w-sm md:mx-auto h-auto rounded-3xl border shadow-sm"
      id="searchbar"
      placeholder="Pesquisar por ponto de interesse"
    />
  );
}
