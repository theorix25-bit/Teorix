import { createClient } from "@/lib/supabase/server";
import Form from "../Form"

async function page() {
  const supabase = await createClient();
  
    const { data: planes, error: errorPlanes } = await supabase.from("Planes").select("*");
      if(errorPlanes) console.error(errorPlanes)
  
    const {data:documentos,error:errorDocumentos} = await supabase.from("gramma").select("*")
    if(errorDocumentos) console.error(errorDocumentos)

    const handleSubmit = ()=>{

    }
  
  return (
    <>
    
      <Form documentos={documentos} planes={planes} tipo="crear" />
    
    
    </>
  )
}

export default page