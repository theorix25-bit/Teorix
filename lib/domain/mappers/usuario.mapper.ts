import { UsuarioDTO } from "../dto/usuario.dto";

export class UsuarioMapper {
  static toDTO(row: UserDB): UsuarioDTO {
    return {
      id: row.id,
      authId: row.auth_id,
      nombre: row.nombre,
      apellido: row.apellido,
      telefono: row.telefono,
      role: row.role,
      codigo_postal: row.codigo_postal,
      fecha_de_nacimiento: row.fecha_de_nacimiento,
      stripe_customer_id: row.stripe_customer_id,
      pago_stripe: row.pago_stripe,
      creado_en: row.creado_en,
      actualizado_en: row.actualizado_en,
    };
  }
  static toDTOList(rows: UserDB[]): UsuarioDTO[] {
    return rows.map((row) => UsuarioMapper.toDTO(row));
  }
}
