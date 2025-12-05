import { Home, Users, Play, Video, Archive, BookOpen } from "lucide-react";

const items: NavItem[] = [
  { id: "temas", icon: Home, label: "Temas" },
  { id: "usuarios", icon: Users, label: "Usuarios" },
  { id: "planes", icon: Play, label: "Planes" },
  { id: "videos", icon: Video, label: "Videos" },
  { id: "archivos", icon: Archive, label: "Archivos" },
  { id: "blogs", icon: BookOpen, label: "Blogs" }
];

export default function BottomNav({ active, onChange }:{active:string,onChange:(id:ViewType)=> void}) {
  return (
    <nav className="flex justify-around p-3 border-t bg-zinc-900">
      {items.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex flex-col items-center text-xs ${
            active === id ? "text-lima-" : "text-gray-300"
          }`}
        >
          <Icon size={22} className="text-lima/70"/>
          {label}
        </button>
      ))}
    </nav>
  );
}
