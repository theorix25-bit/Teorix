import Link from "next/link";
import useUserAuth from "@/hooks/useUserAuth";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export default async function HeaderLayout() {
  const { user } = await useUserAuth();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Clases", href: "/clases" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="text-white">
      <nav className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/" className="font-bold text-4xl">
          Teorix
          <span className="text-lima"> *</span>
        </Link>

        {/* Desktop menu */}
        <DesktopMenu navigation={navigation} user={user} />
        

        {/* Mobile menu */}
        <MobileMenu navigation={navigation} user={user} />
      </nav>
    </header>
  );
}
