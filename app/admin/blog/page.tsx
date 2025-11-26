import { getAllBlogs } from "@/lib/blog";
import Link from "next/link";

export default async function AdminBlogs() {
  const { data } = await getAllBlogs();

  return (
    <div className="container">
      <h1>Blogs</h1>
      <Link href="/admin/blog/new">Crear nuevo</Link>

      {data?.map((b) => (
        <div key={b.id}>
          <h3>{b.title}</h3>
          <Link href={`/admin/blog/${b.id}/edit`}>Editar</Link>
        </div>
      ))}
    </div>
  );
}
