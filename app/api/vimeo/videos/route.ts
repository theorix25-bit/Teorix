import { searchVideoForId } from "@/lib/supabase";
import { searchVideo } from "@/lib/Vimeo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;
  if (id == 0 || id == null) {
    return NextResponse.json({
      status: 401,
      mensaje: "no se obtuvo el id del video",
    });
  }

  const {titulo} = await searchVideoForId(id);
  const video = await searchVideo(titulo);
  return NextResponse.json(video);
}
