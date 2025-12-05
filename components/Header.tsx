import Link from "next/link";
import useUserAuth from "@/hooks/useUserAuth";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import logo from "@/assets/Logo_Theorix.png"
import { log } from "console";

export default async function HeaderLayout() {
  const { user } = await useUserAuth();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Clases", href: "/clases" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="text-white">
      <nav className="flex justify-between items-center p-4 md:p-0 max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/" className="font-bold text-4xl logo text-lima">
          <img src={logo.src}  className="w-32 md:w-40 inline-block" alt="Logo Theorix" />
          <span className="text-lima ml-[-25]"> *</span>
        </Link>

        {/* Desktop menu */}
        <DesktopMenu navigation={navigation} user={user} />
        

        {/* Mobile menu */}
        <MobileMenu navigation={navigation} user={user} />
      </nav>
    </header>
  );
}
