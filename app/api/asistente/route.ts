import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function GET() {

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const SECRET = process.env.NEXT_IFRAME_TOKEN_SECRET!;
  const payload = {
    userId: user.sub,
    userName: user.name ?? "Usuario",
    userMail: user.email,
    timestamp: Date.now(),
    nonce: crypto.randomBytes(16).toString("hex"),
    domain: process.env.NEXT_PUBLIC_URL
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

