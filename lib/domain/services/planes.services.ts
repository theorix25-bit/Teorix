import { PlanesMapper } from "../mappers/planes.mapper";
import { PlanesRepository } from "../repository/planes.repository";


export class PlanesServices {
  static async getPlans() {
    const res = await PlanesRepository.find();
    if (!res.ok || !res.data) {
      throw new Error(res.error || "Error al obtener los planes");
    }
    return PlanesMapper.toDtoList(res.data);
  }
}
