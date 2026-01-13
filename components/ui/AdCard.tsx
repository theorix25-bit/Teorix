"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function AdCard({ data }: { data: any }) {
  return (
    <Card className="bg-muted/30 hover:bg-muted/50 transition rounded-xl overflow-hidden border-none">
      <Link href={data.url} target="_blank" className="" rel="noopener noreferrer">
        <div className="relative w-full h-56">
          <img
            src={data.image}
            alt={data.title}
            className="object-cover h-full mx-auto"
          />
        </div>
      </Link>
    </Card>
  );
}
