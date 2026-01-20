"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteBlog } from "@/lib/blog"; // Asegúrate de tener esta función en tu lib
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

export function DeleteBlogButton({ blogId }: { blogId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteBlog(blogId);
      router.refresh(); // Refresca los datos del Server Component
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("No se pudo eliminar el blog.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button 
          className="px-3 flex items-center justify-center bg-[#E6392D]/10 hover:bg-[#E6392D] text-[#E6392D] hover:text-white py-2 rounded-lg transition-all"
          title="Eliminar"
        >
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="bg-[#111111] border border-white/10 text-[#F8F9FB]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#C6FF5B]">¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-[#F8F9FB]/60">
            Esta acción no se puede deshacer. Esto eliminará permanentemente el artículo
            de la base de datos y del servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-[#E6392D] text-white hover:bg-[#b02a22]"
          >
            {isDeleting ? <Loader2 className="animate-spin" size={16} /> : "Eliminar definitivamente"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}