import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { JwtPayload } from "@supabase/supabase-js";

function DesktopMenu({
  user,
  navigation,
}: {
  user: User | JwtPayload | undefined;
  navigation: { name: string; href: string }[];
}) {
  return (
    <>
      <div className="hidden lg:flex items-center gap-6">
        {navigation.map((item) => (
          <Link className="hover:text-lima" key={item.name} href={item.href}>
            {item.name}
          </Link>
        ))}
        {user !== undefined ? (
          <LogoutButton />
        ) : (
          <>
            <Link href={"/auth/login"} className="bg-lima text-carbon px-4 py-1 rounded">
              Ingresar
            </Link>

            <Link
              href={"/auth/sign-up"}
              className="border border-lima  px-4 py-1 rounded"
            >
              Registrarse
            </Link>

            <div className="w-10 h-10 bg-lima text-carbon rounded-full flex justify-center items-center">
              M
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DesktopMenu;
