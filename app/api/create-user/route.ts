import { TestsUsuarioServices } from "@/lib/domain/services/testsUsuario.services";
import { setAdminRole, sigUpUser } from "@/lib/supabase";
export async function POST(req: Request) {
  const {
    email,
    options: {
      data: { name },
      emailRedirectTo,
    },
    password,
    makeAdmin,
  } = await req.json();

  const { data, error } = await sigUpUser({
    email,
    options: {
      data: { name },
      emailRedirectTo,
    },
    password,
  });

  const res = await TestsUsuarioServices.CreateTests(data.user?.id!);
  if(!res) {console.error("No se logro crear la tabla Tests_Usuarios")}

  if (error)
    return Response.json(
      { error, message: "No se logro crear el usuario" },
      { status: 400 }
    );
  // 2. Si queremos que sea admin
  if (makeAdmin && data?.user?.id) {
    await setAdminRole(data.user.id);
  }

  return Response.json({ user: data.user }, { status: 200 });
}
