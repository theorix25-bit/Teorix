"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import { 
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, 
  List, ListOrdered, Quote, Undo, Redo, Eraser, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Minus, Code
} from "lucide-react";

// Botón estilizado con tus colores
const MenuButton = ({ 
  onClick, 
  isActive = false, 
  children, 
  title 
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  children: React.ReactNode;
  title: string;
}) => (
  <button
    onClick={(e) => { e.preventDefault(); onClick(); }}
    title={title}
    className={`p-2 rounded-md transition-all border ${
      isActive 
        ? "bg-[#C6FF5B] text-[#111111] border-[#C6FF5B]" 
        : "bg-[#0E2633] text-[#F8F9FB] border-[#0E2633] hover:border-[#C6FF5B]/40"
    }`}
  >
    {children}
  </button>
);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL del enlace:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 border-b border-white/10 bg-[#111111] sticky top-0 z-10">
      {/* GRUPO: Formato Básico */}
      <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Negrita">
          <Bold size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="Cursiva">
          <Italic size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} title="Subrayado">
          <UnderlineIcon size={18} />
        </MenuButton>
      </div>

      {/* GRUPO: Alineación */}
      <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Izquierda">
          <AlignLeft size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Centro">
          <AlignCenter size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Derecha">
          <AlignRight size={18} />
        </MenuButton>
      </div>

      {/* GRUPO: Estructura */}
      <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} title="H1">
          <Heading1 size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title="H2">
          <Heading2 size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="Lista">
          <List size={18} />
        </MenuButton>
      </div>

      {/* GRUPO: Insertar */}
      <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
        <MenuButton onClick={addLink} isActive={editor.isActive("link")} title="Insertar Enlace">
          <LinkIcon size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Línea Divisoria">
          <Minus size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} title="Bloque de Código">
          <Code size={18} />
        </MenuButton>
      </div>

      <div className="flex-grow" />

      {/* GRUPO: Utilidades */}
      <div className="flex gap-1 items-center">
        <button onClick={() => editor.chain().focus().undo().run()} className="p-2 text-[#F8F9FB]/50 hover:text-[#C6FF5B]">
          <Undo size={18} />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="p-2 text-[#E6392D]" title="Limpiar formato">
          <Eraser size={18} />
        </button>
      </div>
    </div>
  );
};

export default function BlogEditor({ content, onChange }: { content: string, onChange: (v: string) => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-[#C6FF5B] underline cursor-pointer' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  if (!mounted) return <div className="p-4 text-[#F8F9FB]">Cargando...</div>;

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-[#111111] ring-1 ring-white/5 shadow-2xl">
      <MenuBar editor={editor} />
      <div className="p-6 min-h-[400px]">
        <style dangerouslySetInnerHTML={{ __html: `
          .ProseMirror { color: #F8F9FB; outline: none; }
          .ProseMirror h1 { font-size: 2.5rem; color: #C6FF5B; font-weight: 800; margin-bottom: 1.5rem; }
          .ProseMirror h2 { font-size: 1.8rem; color: #C6FF5B; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
          .ProseMirror p { margin-bottom: 1.2rem; line-height: 1.7; font-size: 1.1rem; }
          .ProseMirror hr { border: none; border-top: 2px solid rgba(255,255,255,0.1); margin: 2rem 0; }
          .ProseMirror code { background: #0E2633; color: #C6FF5B; padding: 0.2rem 0.4rem; rounded: 4px; }
          .ProseMirror pre { background: #0E2633; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
          .ProseMirror blockquote { border-left: 4px solid #C6FF5B; padding-left: 1.5rem; font-style: italic; color: #a3d34a; margin: 1.5rem 0; }
        `}} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}