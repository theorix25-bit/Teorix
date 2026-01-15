import { GammaMapper } from "../mappers/gamma.mapper";
import { PlanesMapper } from "../mappers/planes.mapper";
import { GammaRepository } from "../repository/gamma.repository";
import { PlanesRepository } from "../repository/planes.repository";


export class GammaServices {
  static async getDocs() {
    const res = await GammaRepository.findAllDocs();
    if (!res.ok || !res.data) {
      throw new Error(res.error || "Error al obtener los planes");
    }
    return GammaMapper.toDTOList(res.data);
  }
}
