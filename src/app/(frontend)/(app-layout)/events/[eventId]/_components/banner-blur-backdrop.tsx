"use client";

import Image from "next/image";

interface BannerBlurBackdropProps {
  bannerUrl: string;
}

export function BannerBlurBackdrop({ bannerUrl }: BannerBlurBackdropProps) {
  if (!bannerUrl) {
    return null;
  }

  return (
    <Image
      src={bannerUrl}
      fill
      className="pointer-events-none absolute inset-0 top-0 max-h-72 scale-y-[-1] opacity-0 blur-[300px] saturate-150 transition-opacity duration-1000 ease-in-out"
      alt="Illustration"
      draggable={false}
      onLoad={(e) => {
        e.currentTarget.classList.remove("opacity-0");
        e.currentTarget.classList.add("opacity-100");
      }}
    />
  );
}
