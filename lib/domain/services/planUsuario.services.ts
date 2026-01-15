import { UsuarioDTO } from "../dto/usuario.dto";
import { PlanUsuarioMapper } from "../mappers/planUsuario.mapper";
import { PlanUsuarioRepository } from "../repository/planUsuario.repository";

export class PlanUsuarioServices {
  static async getPlanUsuarioByUserId(usuarioId: number) {
    const res = await PlanUsuarioRepository.findByAuthId(usuarioId);
    if (!res.ok || !res.data) {
      throw new Error(res.error || "Error al obtener el plan usuario");
    }
    return PlanUsuarioMapper.toDTO(res.data);
  }
}
