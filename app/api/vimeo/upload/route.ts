import { NextResponse } from "next/server";
import { vimeoClient } from "@/lib/Vimeo/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  const title = data.get("title") as string;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Convertir a Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const videoUri = await new Promise<string>((resolve, reject) => {
      vimeoClient.upload(
        buffer as any,
        { name: title || file.name },
        (uri: string) => resolve(uri),
        (bytesUploaded: number, bytesTotal: number) => {
          console.log(`Progreso: ${((bytesUploaded / bytesTotal) * 100).toFixed(2)}%`);
        },
        (error: any) => reject(error)
      );
    });

    return NextResponse.json({
      success: true,
      videoUri,
      editUrl: `https://vimeo.com${videoUri}`
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
