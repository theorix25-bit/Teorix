import { VideosDB } from "@/types/supaBase/videos";
import { VideosDTO } from "../dto/videos.dto";

export class VideosMapper {
  static toDto(row: VideosDB): VideosDTO {
    return {
      id: row.id,
      titulo: row.titulo,
      creadoEn: row.creado_en,
      orden: row.orden,
      actualizadoEn: row.actualizado_en,
      contenidoId: row.contenido_id,
      slug: row.slug,
      descripcion: row.descripcion,
    };
  }
  static toDtoList(rows: VideosDB[]):VideosDTO[]{
    return rows.map((row) => VideosMapper.toDto(row))
  }
}
