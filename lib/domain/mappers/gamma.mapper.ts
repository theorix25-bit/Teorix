import { GammaDB } from "@/types/supaBase/gamma";
import { GammaDTO } from "../dto/gamma.dto";


export class GammaMapper {
  static toDTO(row: GammaDB): GammaDTO{
    return {
      id: row.id,
      titulo: row.titulo,
      url: row.url,
      actualizadoEn: row.actualizado_en,
      creadoEn: row.creado_en,
      slug: row.slug,
      fase: row.fase,
      descripcion: row.descripcion,
      orden: row.orden
    }
  }

  static toDTOList(rows: GammaDB[]): GammaDTO[] {
    return rows.map((row) => GammaMapper.toDTO(row));
  }
}