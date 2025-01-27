"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Node } from "@payload-types";
import { useState } from "react";
import { DrawRouteButton } from "./draw-route-button";
import { LocationInput } from "./location-input";

export function RouteCard() {
  const [startingPoint, setStartingPoint] = useState<[number, number] | null>(
    null,
  );
  const [destination, setDestination] = useState<[number, number] | null>(null);

  const isButtonDisabled = !startingPoint || !destination;

  return (
    <Card className="w-full max-w-sm mx-auto absolute z-20 top-4 left-8">
      <CardHeader>
        <CardTitle>Instruções de direção</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <LocationInput
          id="starting-point"
          placeholder="Escolha o ponto de partida"
          onLocationSelect={(location) =>
            setStartingPoint((location?.referenceNode as Node).coordinates)
          }
        />
        <LocationInput
          id="destination"
          placeholder="Escolha o destino"
          onLocationSelect={(location) =>
            setDestination((location?.referenceNode as Node).coordinates)
          }
        />
      </CardContent>
      <CardFooter>
        {isButtonDisabled ? (
          <Button disabled className="w-full">
            Traçar rota
          </Button>
        ) : (
          <DrawRouteButton
            startingCoordinates={startingPoint!}
            destinationCoordinates={destination!}
            className="w-full"
          >
            Traçar rota
          </DrawRouteButton>
        )}
      </CardFooter>
    </Card>
  );
}
