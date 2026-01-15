import { VideosMapper } from "../mappers/videos.mapper";
import { VideosRepository } from "../repository/videos.repository";

export class VideosServices {
  static async getVideos() {
    const res = await VideosRepository.getAllVideos();
    if (!res.ok || !res.data) {
      throw new Error(res.error || "Error al obtener los planes");
    }
    return VideosMapper.toDtoList(res.data);
  }
}
