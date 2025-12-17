import { searchVideo } from "@/lib/Vimeo";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { nombre } = body;
  if (nombre.length == 0 || nombre == null)
    return NextResponse.json({
      error: "No es obtuvo el nombre del video",
      status: 401,
    });
  const video = await searchVideo(nombre);
  return NextResponse.json(video);
}
