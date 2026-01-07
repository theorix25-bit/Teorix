import Form from "./form";
import { supabaseAdmin } from "@/lib/supabase/admin";


async function page() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  const users: TypeUsers[] = [];
  if (error) console.log(error);
  data.users.map((e) => users.push({ email: e.email, id: e.id }));

  return (
    <>
      <div>
        <Form users={users} />
      </div>
    </>
  );
}

export default page;
