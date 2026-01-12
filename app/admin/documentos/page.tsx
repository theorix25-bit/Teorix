import { createClient } from "@/lib/supabase/server";
import Form from "./Form";
import Link from "next/link";

async function Documento() {
  // const supabase = await createClient();

  // const { data: planes, error: errorPlanes } = await supabase.from("Planes").select("*");
  //   if(errorPlanes) console.error(errorPlanes)

  // const {data:documentos,error:errorDocumentos} = await supabase.from("gramma").select("*")
  // if(errorDocumentos) console.error(errorDocumentos)

  return (
    <div>
      <nav className=" w-80 mx-auto flex gap-4 justify-center mb-4 mt-5 ">
        <Link href={`/admin/documentos/crear`} className="border px-2 py-1 rounded-md">Crear</Link>
        <Link href={`/admin/documentos/editar`} className="border px-2 py-1 rounded-md">editar</Link>
        <Link href={`/admin/documentos/eliminar`} className="border px-2 py-1 rounded-md">Eliminar</Link>
      </nav>
      {/* <div>
        <Form planes={planes} documentos={documentos} />
      </div> */}
    </div>
  );
}

export default Documento;
