import { BlogMappers } from "../mappers/blog.mappers";
import { BlogsRepository } from "../repository/blogs.repository";


export class BlogsServices {
  static async getBlogs(){
    const res = await BlogsRepository.getAllBlogs()
    if (!res.ok || !res.data) {
      throw new Error(res.error || "Error al obtener los planes");
    }
    return BlogMappers.toDtoList(res.data)
  }
}