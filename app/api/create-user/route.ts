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
  console.log(error);
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
