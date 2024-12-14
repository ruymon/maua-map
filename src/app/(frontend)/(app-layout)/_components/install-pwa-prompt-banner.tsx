"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Plus, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export function InstallPWAPromptBanner() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    setIsIOS(isIOS);

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    // Verifica se o aplicativo é instalável
    const checkInstallable = async () => {
      if ("getInstalledRelatedApps" in navigator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const relatedApps = await (navigator as any).getInstalledRelatedApps();
        setIsInstallable(relatedApps.length === 0);
      } else {
        setIsInstallable(true); // Assume que é instalável se não pudermos verificar
      }
    };

    checkInstallable();
  }, []);

  const handleInstallClick = () => {
    if (isIOS) {
      alert(
        "Para instalar este aplicativo no seu dispositivo iOS:\n1. Toque no botão de compartilhar\n2. Role para baixo e toque em 'Adicionar à Tela Inicial'",
      );
    } else {
      alert(
        "Para instalar este aplicativo:\n1. Abra o menu do seu navegador\n2. Procure por 'Instalar aplicativo' ou 'Adicionar à tela inicial'\n3. Siga as instruções para instalar",
      );
    }
  };

  if (isStandalone || !isInstallable) {
    return null; // Não mostra o botão de instalação se já estiver instalado ou não for instalável
  }

  return (
    <Card className="fixed bottom-4 right-4 max-w-sm">
      <CardHeader>
        <CardTitle>Instale Nosso Aplicativo</CardTitle>
        <CardDescription>
          Adicione nosso aplicativo à sua tela inicial para acesso rápido e
          fácil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleInstallClick} className="w-full">
          <Download className="mr-2 h-4 w-4" /> Instalar Aplicativo
        </Button>
        {isIOS ? (
          <div className="mt-4 space-y-2 text-sm">
            <p>Para instalar no iOS:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Toque no botão de compartilhar{" "}
                <Share2 className="inline-block w-4 h-4" />
              </li>
              <li>
                Toque em &quot;Adicionar à Tela Inicial&quot;{" "}
                <Plus className="inline-block w-4 h-4" />
              </li>
            </ol>
          </div>
        ) : (
          <div className="mt-4 space-y-2 text-sm">
            <p>Para instalar no seu dispositivo:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Abra o menu do seu navegador</li>
              <li>
                Procure por &quot;Instalar aplicativo&quot; ou &quot;Adicionar à
                tela inicial&quot;
              </li>
              <li>Siga as instruções para instalar</li>
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
