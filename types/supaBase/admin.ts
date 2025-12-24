type Tipo = "clases" | "temas" | "subtema"

interface Contenido {
    id: number,
    contenido_id: number,
    titulo: string,
    descripcion: string,
    tipo: Tipo,
    orden: number,
    slug: string,
    imagen: string,
    actualizado_en: string,
    creado_en: string,
}
