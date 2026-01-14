import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, PlayCircle } from "lucide-react";
import Link from "next/link";

interface LessonCardProps {
  href: string;
  titulo: string;
  descripcion?: string;
  tipo?: "documento" | "video";
  bloqueado?: boolean;
}

export function LessonCard({
  href,
  titulo,
  descripcion,
  tipo = "documento",
  bloqueado = false,
}: LessonCardProps) {
  const Icon = tipo === "video" ? PlayCircle : FileText;

  return (
    <Link href={bloqueado ? "#" : href} className="group">
      <Card
        className={`
          h-full transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl
          border border-border/60
          ${bloqueado ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        <CardHeader className="flex flex-row items-start gap-3 pb-2">
          <div className="rounded-xl bg-lima/15 p-3 text-lima">
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold leading-tight line-clamp-2">
              {titulo}
            </h3>

            {bloqueado && (
              <Badge variant="secondary" className="mt-1">
                Plan superior
              </Badge>
            )}
          </div>
        </CardHeader>

        {descripcion && (
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {descripcion}
            </p>
          </CardContent>
        )}

        <div className="px-6 pb-5 mt-auto">
          <span className="text-sm font-medium text-lima group-hover:underline">
            {tipo === "video" ? "Ver video →" : "Ver contenido →"}
          </span>
        </div>
      </Card>
    </Link>
  );
}
