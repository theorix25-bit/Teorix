import { UsuarioDTO } from "../dto/usuario.dto";
import { PlanUsuarioDTO } from "../dto/planUsuario.dto";
import { PlanUsuarioDB } from "@/types/supaBase/planUsuario";

export class PlanUsuarioMapper {
  static toDTO(row: PlanUsuarioDB): PlanUsuarioDTO {
    return {
      id: row.id,
      usuarioId: row.usuario_id,
      planId: row.plan_id,
      estado: row.estado,
      pagoStripe: row.pago_stripe,
      inicioPeriodo: row.inicio_periodo,
      finPeriodo : row.fin_periodo,
      creadoEn: row.creado_en,
      actualizadoEn: row.actualizado_en
    };
  }
  static toDTOList(rows: PlanUsuarioDB[]): PlanUsuarioDTO[] {
    return rows.map((row) => PlanUsuarioMapper.toDTO(row));
  }
}
