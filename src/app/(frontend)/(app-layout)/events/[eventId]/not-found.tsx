import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function EventNotFound() {
  return (
    <div className="flex flex-1 flex-col  items-center gap-8 z-30">
      <Image
        src="/404.gif"
        width={360}
        height={240}
        alt="Evento não encontrado"
        className="rounded-xl md:w-full object-fill md:max-h-48 aspect-video"
      />

      <div className="flex flex-col items-center">
        <h1 className="text-accent-foreground text-xl font-semibold">
          Evento não encontrado
        </h1>
        <span className="text-muted-foreground">
          Fique ligado, sempre tem algo rolando por aqui!
        </span>
      </div>

      <Link
        href="/eventos"
        className={buttonVariants({
          size: "lg",
          variant: "link",
        })}
      >
        Voltar para a lista de eventos
      </Link>
    </div>
  );
}
