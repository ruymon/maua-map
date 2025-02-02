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
import type { Block, Location } from "@payload-types";
import { GraduationCapIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
interface LocationInputProps {
  id: string;
  placeholder: string;
  className?: string;
  inputClassName?: string;
}

export function LocationInput({
  id,
  placeholder,
  className,
  inputClassName,
}: LocationInputProps) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<Location[]>([]);

  const debouncedHandleSearch = useDebouncedCallback(async (query: string) => {
    if (query.length >= 1) {
      const locations = await getFirstFiveLocationsBasedOnQuery(query);
      console.log(locations);
      setOptions(locations);
    } else {
      setOptions([]);
    }
  }, 300);

  const handleInputChange = useCallback(
    (value: string) => {
      setValue(value);
      debouncedHandleSearch(value);
    },
    [debouncedHandleSearch],
  );

  return (
    <Command shouldFilter={false} className={cn(className)}>
      <CommandInput
        id={id}
        placeholder={placeholder}
        value={value}
        onValueChange={handleInputChange}
        className={cn(inputClassName)}
      />

      <CommandList className="px-2">
        {options.length === 0 && value.length >= 3 && (
          <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
        )}

        {options.map((locationOption) => (
          <Link
            key={locationOption.id}
            href={`/locations/${locationOption.id}`}
          >
            <CommandItem
              className="first:mt-2 last:mb-2 gap-4 cursor-pointer"
              value={locationOption.id}
              onSelect={() => {
                setValue(locationOption.name);
                setOptions([]);
              }}
            >
              <GraduationCapIcon />
              <div className="flex flex-col min-w-0 flex-1">
                <h4 className="truncate text-accent-foreground">
                  {locationOption.name}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {locationOption?.code} &middot; Bloco{" "}
                  {(locationOption?.block as unknown as Block).name}
                </span>
              </div>
            </CommandItem>
          </Link>
        ))}
      </CommandList>
    </Command>
  );
}
