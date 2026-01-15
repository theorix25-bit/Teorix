// app/api/tests/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { TestsUsuarioServices } from "@/lib/domain/services/testsUsuario.services";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = await TestsUsuarioServices.CreateTests(user.id);

  return NextResponse.json({ data: res }, { status: 201 });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await TestsUsuarioServices.getTestsByAuthId(user.id);

  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const updated = await TestsUsuarioServices.updateTestByAuthId(
    user.id,
    body
  );

  return NextResponse.json({ data: updated }, { status: 200 });
}
