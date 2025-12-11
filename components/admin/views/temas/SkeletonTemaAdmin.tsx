export default function SkeletonTemasAdmin() {
  return (
    <div className="min-h-full w-full animate-pulse px-5">
      <div className="w-full h-10 mt-3 bg-zinc-800 rounded-md"></div>
      <div className="w-full h-10 mt-3 bg-zinc-800 rounded-md"></div>
      <div className="flex flex-col mt-3 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="bg-zinc-800 w-1/3 h-6 rounded-md"></div>
            <div className="bg-zinc-800 w-2/3 h-6 rounded-md"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 px-3">
        <div className="bg-zinc-800 rounded-md px-3 py-2 w-20 h-8"></div>
        <div className="bg-zinc-800 rounded-md px-3 py-2 w-20 h-8"></div>
      </div>
    </div>
  );
}