import { cn } from "@/lib/utils";

interface MauaIconProps {
  className?: string;
}

export function MauaIcon({ className }: MauaIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 aspect-square", className)}
      fill="none"
      viewBox="0 0 41 41"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20.35 6.859H6.25v27.947h28.203V6.859zm0 27.767c-7.672 0-13.92-6.204-13.92-13.799S12.677 7.04 20.35 7.04c7.663 0 13.922 6.194 13.922 13.788s-6.26 13.799-13.921 13.799"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20.35.665H0V41h40.701V.665zm0 40.062C9.294 40.727.264 31.79.264 20.827.263 9.876 9.293.922 20.351.922c11.057 0 20.077 8.954 20.077 19.905 0 10.962-9.02 19.9-20.077 19.9"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
