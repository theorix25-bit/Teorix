import UploadFile from "@/components/UploadFile"
import Link from "next/link"

function page() {
  return (
    <div className="container">
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link href="/admin/blog">Blogs</Link>
        </li>
      </ul>
      <h1 className="mb-3 text-center">Panel administrador</h1>


      <div className="m2 p3">
        <UploadFile />
      </div>
    </div>
  )
}

export default page