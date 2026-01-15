import { TestsUsuarioDB } from "@/types/supaBase/testsUsuarios";
import { TestsUsuarioDTO } from "../dto/testsUsuario.dto";

export class TestsUsuarioMappers {
  static toDto(row: TestsUsuarioDB): TestsUsuarioDTO {
    return {
      user_id: row.user_id,
      preguntaActual: row.pregunta_actual,
      puntos: row.puntos,
      racha: row.racha,
      updatedAt: row.updated_at,
    };
  }

  static toDtoList(rows: TestsUsuarioDB[] ): TestsUsuarioDTO[] {
    return rows.map((row) => TestsUsuarioMappers.toDto(row));
  }
}
