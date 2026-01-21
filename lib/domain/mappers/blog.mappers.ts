import { BlogsDB } from "@/types/blog";
import { BlogsDTO } from "../dto/blogs.dto";

export class BlogMappers {
  static toDto(row: BlogsDB): BlogsDTO {
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category,
      content: row.content,
      imageUrl: row.image_url,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      metaTitle:row.meta_title,
      metaDescription: row.meta_description

    };
  }

  static toDtoList(rows: BlogsDB[]): BlogsDTO[] {
    return rows.map((row) => BlogMappers.toDto(row));
  }
}
