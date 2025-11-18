import { createClienteStripe } from "@/lib/stripe/client";
import { NextResponse } from "next/server";

const stripe = createClienteStripe();
export function POST(request: Request) {
  console.log("webhook recibido");
  return NextResponse.json("recibiendo webhook");
}
