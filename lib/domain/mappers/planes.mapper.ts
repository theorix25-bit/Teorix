import { PlanDB } from "@/types/supaBase/planes";
import { PlaneDTO } from "../dto/planes.dto";


export class PlanesMapper {
  static toDTO(row: PlanDB): PlaneDTO{
    return {
      id: row.id,
      nombre: row.nombre,
      descripción: row.descripción,
      precio: row.precio,
      cta: row.cta,
      insignia: row.insignia,
      slug: row.slug,
      caracteristicas: row.caracteristicas,
      resaltar: row.resaltar,
      creadoEn: row.creado_en,
      actualizadoEn: row.actualizado_en,
      fase: row.fase,
      orden: row.orden
    }
  }

  static toDtoList(rows: PlanDB[]): PlaneDTO[] {
    return rows.map((row) => PlanesMapper.toDTO(row));
  }
}