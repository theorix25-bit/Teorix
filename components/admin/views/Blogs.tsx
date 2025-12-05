import { useState } from "react";

function Blogs() {
  const [loading, setLoading] = useState(true);
  return loading! ? <SkeletonBlogs /> : <div>Blogs</div>;
}

export default Blogs;

function SkeletonBlogs() {
  return (
    <>
      <div className="px-4 py-4 flex flex-col gap-3">
        <div className="bg-zinc-800 animate-pulse w-full h-10"></div>
        <div className="bg-zinc-800 animate-pulse w-full h-10"></div>

        <div className="flex gap-5">
          <div className="flex gap-2 w-1/2">
            <div className="bg-zinc-800 animate-pulse w-20 h-10"></div>
            <div className="bg-zinc-800 animate-pulse w-full h-10"></div>
          </div>

          <div className="flex gap-2 w-1/2">
            <div className="bg-zinc-800 animate-pulse w-20 h-10"></div>
            <div className="bg-zinc-800 animate-pulse w-full h-10"></div>
          </div>
        </div>

        <div className="h-96 bg-zinc-800 animate-pulse"></div>

        <div className="flex justify-between">
          <div className="bg-zinc-800 w-20 h-8 animate-pulse"></div>
          <div className="bg-zinc-800 w-20 h-8 animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
