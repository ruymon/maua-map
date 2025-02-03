import { BASE_URL } from "@/constants/url";
import { getLocationById } from "@/data/locations";
import { Block, Location, Media, Node } from "@payload-types";
import { ImageOffIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GoToLocationButton } from "../../_components/go-to-location-button";

export const revalidate = 3600; // 1 hour
export const dynamicParams = true;

interface LocationDetailsPageProps {
  params: Promise<{
    locationId: string;
  }>;
}

export async function generateMetadata({
  params,
}: LocationDetailsPageProps): Promise<Metadata> {
  const { locationId } = await params;
  const locationData = await getLocationById(locationId);

  return {
    title: locationData?.name,
    description: `Confira informações sobre o local ${locationData?.name} e trace a rota para chegar até lá.`,
  };
}

const locationTypeVariants: Record<Location["type"], string> = {
  auditorium: "Auditório",
  classroom: "Sala de aula",
  bathroom: "Banheiro",
  cafeteria: "Copa / Refeitório",
  laboratory: "Laboratório",
  office: "Escritório",
  restaurant: "Restaurante",
  sports: "Atividades esportivas",
  storage: "Armazenamento / Depósito",
};

export default async function LocationDetailsPage({
  params,
}: LocationDetailsPageProps) {
  const { locationId } = await params;

  if (!locationId) {
    notFound();
  }

  const locationData = await getLocationById(locationId);

  if (!locationData) {
    notFound();
  }

  const getBannerImage = (location: Location): Media | null => {
    const locationBlock = location.block as Block;

    if (location.image) {
      return location.image as Media;
    }

    if (locationBlock.image) {
      return locationBlock as Media;
    }

    return null;
  };

  const bannerImage = getBannerImage(locationData);

  return (
    <div className="flex flex-1 flex-col gap-8 z-0">
      <div className="flex flex-col gap-6">
        {bannerImage ? (
          <Image
            src={`${BASE_URL}${bannerImage.url}`}
            width={bannerImage.width || 500}
            height={bannerImage.height || 300}
            alt={bannerImage.description || `Imagem de ${locationData.name}`}
            className="rounded-xl max-h-36 md:max-h-48 w-full object-cover"
          />
        ) : (
          <figure className="rounded-lg h-36 md:h-48 w-full flex items-center justify-center flex-grow bg-muted text-muted-foreground text-lg">
            <ImageOffIcon />
          </figure>
        )}
        <header className="flex flex-col gap-1">
          <h1 className="text-secondary-foreground text-2xl md:text-3xl font-bold">
            {locationData.name}
          </h1>
          <span className="text-muted-foreground">
            {locationTypeVariants[locationData.type]}
          </span>
        </header>
      </div>

      <GoToLocationButton
        destinationCoordinates={
          (locationData.referenceNode as Node).coordinates
        }
      >
        Traçar rota
      </GoToLocationButton>
    </div>
  );
}
