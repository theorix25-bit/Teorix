import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.user) {
    return Response.json({ error: "Usuario no autenticado" }, { status: 401 });
  }
  const { user, plan } = body;
  const PlanesConAsistente = [2, 4];
  const PlanPro = PlanesConAsistente.some((p) => plan[0].plan_id == p);
  if (!user || !PlanPro) {
    return NextResponse.json(
      { error: "Unauthenticated or unauthorized" },
      { status: 401 }
    );
  }
  const SECRET = process.env.NEXT_IFRAME_TOKEN_SECRET!;
  const payload = {
    userId: user.sub,
    userName: user.name ?? "Usuario",
    userMail: user.email,
    timestamp: Date.now(),
    nonce: crypto.randomBytes(16).toString("hex"),
    domain: process.env.NEXT_PUBLIC_URL,
  };

  const header = { alg: "HS256", typ: "JWT", ver: "1.0" };

  const base64url = (obj: any) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

  const headerEncoded = base64url(header);
  const payloadEncoded = base64url(payload);

  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const token = `${headerEncoded}.${payloadEncoded}.${signature}`;

  return NextResponse.json({ token });
}
