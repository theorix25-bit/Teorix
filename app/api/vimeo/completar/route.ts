import { changeStateVideo } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { videoId, userId } = body;
  if (userId == null)
    return NextResponse.json("usuario no autenticado", userId);
  if (!videoId) return NextResponse.json("id del video indefinido", videoId);

  console.log(videoId, userId);
  const res = await changeStateVideo(userId, videoId);
  if (res) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({ status: 401 });
  }
}
