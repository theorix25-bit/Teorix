import { createClient } from "@/lib/supabase/server";
import Form from "./Form";

async function Documento() {
  const supabase = await createClient();

  const { data: planes, error: errorPlanes } = await supabase
    .from("Planes")
    .select("*");
    if(errorPlanes) console.error(errorPlanes)
  return (
    <div>
      <h2>Documentos</h2>
      <div>
        <Form planes={planes} />
      </div>
    </div>
  );
}

export default Documento;
