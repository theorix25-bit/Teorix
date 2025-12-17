import { searchVideo } from "@/lib/Vimeo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { nombre } = body;
  if (nombre.length == 0 || nombre == null) {
    return NextResponse.json({
      status: 401,
      mensaje: "no se obtuvo el nombre",
    });
  }
  const video = await searchVideo(nombre);
  return NextResponse.json(video);
}
