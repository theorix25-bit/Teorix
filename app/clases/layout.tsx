import Link from "next/link";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" max-w-6xl flex justify-end gap-3 text-white p-2 ">
        <span className="nav-item hover:text-lima">
          <Link href={"/clases/examen"} className="nav-link">
            Test
          </Link>
        </span>
        <span className="nav-item hover:text-lima">
          <Link href={"/clases/documentos"} className="nav-link">
            Documentos
          </Link>
        </span>
        <span className="nav-item hover:text-lima ">
          <Link href={"/clases/videos"} className="nav-link">
            Videos
          </Link>
        </span>
      </div>
      <div className="bg-carbon text-white">{children}</div>
    </>
  );
}
