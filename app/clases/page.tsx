import { RegistroCompletoUsuario } from "@/components/ReistroCompletoUsuario";
import Clases from "@/components/Clases";
import { createClient } from "@/lib/supabase/server";
import { UsuarioServices } from "@/lib/domain/services/usuario.services";
import { PlanUsuarioServices } from "@/lib/domain/services/planUsuario.services";
import { PlanesServices } from "@/lib/domain/services/planes.services";
import { GammaServices } from "@/lib/domain/services/gamma.services";
import { VideosServices } from "@/lib/domain/services/videos.services";
import { BlogsServices } from "@/lib/domain/services/blogs.services";

export default async function PageClases() {
  
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const auth = data?.claims.sub;
  if(!auth) throw new Error("Error con el auth_id")

  // const res = await UsuarioServices.getUsuarioByAuthId(auth)
  // const plan = await PlanUsuarioServices.getPlanUsuarioByUserId(res.id)
  // const planes = await PlanesServices.getPlans()
  // const gamma = await GammaServices.getDocs()
  // const videos = await VideosServices.getVideos()
  const blogs = await BlogsServices.getBlogs()
  console.log(blogs)


  let { data: user } = await supabase
    .from("Usuarios")
    .select("*")
    .eq("auth_id", auth);
  const isLogged = user?.length == 0;
  return !isLogged ? <Clases />  : <RegistroCompletoUsuario />;
}
