"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getFirstFiveLocationsBasedOnQuery } from "@/lib/locations";
import { cn } from "@/lib/utils";
import type { Location } from "@payload-types";
import { useCallback, useState } from "react";

interface LocationInputProps {
  id: string;
  placeholder: string;
  onLocationSelect: (location: Location | null) => void;
  className?: string;
  inputClassName?: string;
}

export function LocationInput({
  id,
  placeholder,
  onLocationSelect,
  className,
  inputClassName,
}: LocationInputProps) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<Location[]>([]);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length >= 1) {
      const locations = await getFirstFiveLocationsBasedOnQuery(query);
      setOptions(locations);
    } else {
      setOptions([]);
    }
  }, []);

  return (
    <Command shouldFilter={false} className={cn(className)}>
      <CommandInput
        id={id}
        placeholder={placeholder}
        value={value}
        onValueChange={(value) => {
          setValue(value);
          handleSearch(value);
          if (value === "") {
            onLocationSelect(null);
          }
        }}
        className={cn(inputClassName)}
      />

      <CommandList className="px-2">
        {options.length === 0 && value.length >= 3 && (
          <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
        )}

        {options.map((locationOption) => (
          <CommandItem
            className="first:mt-2 last:mb-2"
            key={locationOption.id}
            value={locationOption.id}
            onSelect={() => {
              setValue(locationOption.name);
              onLocationSelect(locationOption);
              setOptions([]);
            }}
          >
            {locationOption.name}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
