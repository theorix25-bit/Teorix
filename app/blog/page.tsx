import BlogPage from "@/components/ui/BlogPage";
import { getAllBlogs } from "@/lib/blog";

export default async function Page() {
  const {data:blogs,error}= await getAllBlogs()
  return (
    <BlogPage blogs={blogs} />
  );
}
