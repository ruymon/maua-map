"use client";

import { Media } from "@/../payload-types";
import Image from "next/image";

interface BannerBlurBackdropProps {
  banner?: Media;
}

export function BannerBlurBackdrop({ banner }: BannerBlurBackdropProps) {
  if (!banner || !banner.url) {
    return null;
  }

  return (
    <Image
      fill
      src={banner.url}
      className="pointer-events-none absolute inset-0 top-0 max-h-96 scale-y-[-1] opacity-0 blur-[300px] saturate-150 transition-opacity duration-1000 ease-in-out"
      loading="lazy"
      fetchPriority="low"
      sizes="(max-width: 768px) 65ch, 100vw"
      alt={banner?.description || banner.filename || ""}
      draggable={false}
      onLoad={(e) => {
        e.currentTarget.classList.remove("opacity-0");
        e.currentTarget.classList.add("opacity-100");
      }}
    />
  );
}
