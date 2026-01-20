
// export async function POST() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   const res = await TestsUsuarioServices.CreateTests(user.id);

//   return NextResponse.json({ data: res }, { status: 201 });
// }

// export async function GET() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   const data = await TestsUsuarioServices.getTestsByAuthId(user.id);

//   return NextResponse.json({ data }, { status: 200 });
// }

// export async function PATCH(req: Request) {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   const body = await req.json();

//   const updated = await TestsUsuarioServices.updateTestByAuthId(
//     user.id,
//     body
//   );

//   return NextResponse.json({ data: updated }, { status: 200 });
// }



// app/api/tests/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { TestsUsuarioServices } from "@/lib/domain/services/testsUsuario.services";

async function getAuthenticatedUser(req: Request) {
  const supabase = await createClient();
  
  // 1. Intentar por el método estándar (Cookies)
  let { data: { user } } = await supabase.auth.getUser();

  // 2. Si falla (Safari), intentar extraer el Token del Header manualmente
  if (!user) {
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      // Validamos el token directamente con Supabase
      const { data: { user: userFromToken } } = await supabase.auth.getUser(token);
      user = userFromToken;
    }
  }

  return { user, supabase };
}

export async function GET(req: Request) {
  const { user } = await getAuthenticatedUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await TestsUsuarioServices.getTestsByAuthId(user.id);
  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(req: Request) {
  const { user } = await getAuthenticatedUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updated = await TestsUsuarioServices.updateTestByAuthId(user.id, body);

  return NextResponse.json({ data: updated }, { status: 200 });
}

// ... Aplicar lo mismo para POST