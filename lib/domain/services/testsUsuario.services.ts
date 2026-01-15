import { TestsUsuarioDB, TestsUsuarioUpdateDB } from "@/types/supaBase/testsUsuarios";
import { BlogMappers } from "../mappers/blog.mappers";
import { TestsUsuarioMappers } from "../mappers/testsUsuario.mappers";
import { BlogsRepository } from "../repository/blogs.repository";
import { TestsUsuarioRepository } from "../repository/testsUsuario.repository";

export class TestsUsuarioServices {
  static async CreateTests(authId: string) {
    const res = await TestsUsuarioRepository.createTestsUsuarioDB(authId);
    return res.ok;
  }
  static async getTestsByAuthId(authId: string) {
    const res = await TestsUsuarioRepository.getTestForByAuthId(authId);
    if (!res.ok || !res.data) {
      throw new Error(res.error || "Error al obtener el plan usuario");
    }
    return TestsUsuarioMappers.toDtoList(res.data);
  }
  static async updateTestByAuthId(authId:string,update:TestsUsuarioUpdateDB){
    const res = await TestsUsuarioRepository.UpDateTestsUsuario(authId,update)
  }
}
