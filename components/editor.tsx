"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface Props {
  content: string;
  onChange: (value: string) => void;
}

export default function Editor({ content, onChange }: Props) {
  const [mounted, setMounted] = useState(false);

  // Evita SSR: solo se monta en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false, // 👈 FIX para Next.js SSR
  });

  if (!mounted)
    return <div className="p-4 text-gray-500">Cargando editor...</div>;

  return (
    <div className="border rounded p-2 min-h-[250px]">
      <EditorContent editor={editor} />
    </div>
  );
}
