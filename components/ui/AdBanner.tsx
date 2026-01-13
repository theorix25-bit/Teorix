"use client";

import Image from "next/image";
import Link from "next/link";

export function AdBanner({ data ,width,height }: { data: any, width:number, height:number }) {
  return (
    <div className="w-full py-2 flex justify-center rounded-xl">
      <Link href={data.url} target="_blank" className="block">
        <img
          src={data.image}
          alt={data.title}
          width={width}
          height={height}
          className="rounded-lg object-cover shadow-sm"
        />
      </Link>
    </div>
  );
}
