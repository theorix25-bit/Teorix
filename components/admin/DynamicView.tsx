import Usuarios from "./views/usuarios";
import Planes from "./views/Planes";
import Videos from "./views/Videos";
import Archivos from "./views/Archivos";
import Blogs from "./views/Blogs";
import Temas from "./views/temas";
import { JSX } from "react";


export default function DynamicView({ view }: { view: ViewTypeAdmin }) {
  const views: Record<ViewTypeAdmin, JSX.Element> = {
    clases: <Temas />,
    usuarios: <Usuarios />,
    planes: <Planes />,
    videos: <Videos />,
    archivos: <Archivos />,
    blogs: <Blogs />,
  };

  return views[view] ?? <div>No encontrado</div>;
}
