import React from "react";

function SubTemaSkeleton() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground md:px-32">
        <div className="flex ">
          <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 md:py-10">
            <div className="mb-10 w-32 h-14 rounded-md hover-lift hidden lg:flex animate-pulse bg-zinc-800"></div>

            <div className="mb-8 ">
              <div className="relative w-[1100px] mx-auto aspect-video bg-zinc-800 animate-pulse rounded-xl border-2 border-gray-50/20 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default SubTemaSkeleton;
