import { Home, Users, Play, Video, Archive, BookOpen } from "lucide-react";
import Link from "next/link";

const items: NavItem[] = [
  // { url: "", id: "clases", icon: Home, label: "Clases" },
  { url: "/usuarios", id: "usuarios", icon: Users, label: "Usuarios" },
  // { url: "/planes", id: "planes", icon: Play, label: "Planes" },
  // { url: "/videos", id: "videos", icon: Video, label: "Videos" },
  { url: "/documentos", id: "Pdf", icon: Archive, label: "Documentos Pdf" },
  // { url: "/blog", id: "blogs", icon: BookOpen, label: "Blogs" },
];

export default function BottomNav() {
  return (
    <nav className="flex justify-around p-3  bg-zinc-900 sticky bottom-0 w-full">
      {items.map(({ id, icon: Icon, label, url }) => (
        <Link
          key={id}
          href={`/admin${url}`}
          className={`flex flex-col items-center text-xs`}
        >
          <Icon size={22} className="text-lima/70" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
