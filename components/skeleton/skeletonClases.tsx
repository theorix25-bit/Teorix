
export default function SkeletonClases() {
  return (
    <div className="min-h-screen animate-pulse">
      <main className="container mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Back Button Skeleton */}
        <div className="w-32 h-10 bg-zinc-800 rounded-md mb-6" />

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Placeholder */}
          <div className="relative aspect-video bg-zinc-700/40 rounded-xl border border-gray-50/10 overflow-hidden" />

          {/* Content Skeleton */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="h-10 bg-zinc-800 rounded w-3/4" />
            <div className="space-y-3">
              <div className="h-4 bg-zinc-800 rounded w-full" />
              <div className="h-4 bg-zinc-800 rounded w-5/6" />
              <div className="h-4 bg-zinc-800 rounded w-4/6" />
            </div>
          </div>
        </div>

        {/* Temas Header */}
        <div className="flex flex-row justify-between gap-4 mb-6">
          <div className="h-8 bg-zinc-800 rounded w-40" />
          <div className="h-10 bg-zinc-800 rounded w-32" />
        </div>

        {/* Grid de Temas Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="group overflow-hidden bg-zinc-800 border border-gray-50/5 rounded-xl"
            >
              <div className="p-0">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-zinc-700/40 rounded-t-xl"></div>

                {/* Title */}
                <div className="p-4">
                  <div className="h-5 bg-zinc-700 rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lista de clases */}
        <ul className="mt-10 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="h-4 w-40 bg-muted rounded" />
          ))}
        </ul>
      </main>
    </div>
  );
}