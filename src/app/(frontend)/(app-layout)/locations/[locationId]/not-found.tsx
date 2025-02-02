import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LocationNotFound() {
  return (
    <div className="flex flex-1 flex-col  items-center gap-8 z-30">
      <Image
        src="/404.gif"
        width={360}
        height={240}
        alt="Local não encontrado"
        className="rounded-xl md:w-full object-fill md:max-h-48 aspect-video"
      />

      <div className="flex flex-col items-center">
        <h1 className="text-accent-foreground text-xl font-semibold">
          Local não encontrado
        </h1>
        <span className="text-muted-foreground text-center">
          Sabemos que você está procurando por algo, mas não encontramos nada
          com esse nome...
        </span>
      </div>

      <Link
        href="/"
        className={buttonVariants({
          size: "lg",
          variant: "link",
        })}
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
