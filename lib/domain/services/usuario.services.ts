import { UsuarioDTO } from "../dto/usuario.dto";
import { UsuarioMapper } from "../mappers/usuario.mapper";
import { UsuarioRepository } from "../repository/usuario.repository";

export class UsuarioServices {
  static async getUsuarioByAuthId(authId: string) {
    const res = await UsuarioRepository.findByAuthId(authId);
    if (!res.ok || !res.data) {
      throw new Error(res.error || "Error al obtener el usuario");
    }
    return UsuarioMapper.toDTO(res.data);
  }
}
