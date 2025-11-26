"use client";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogDetail() {
  const router = useRouter();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="p-1 rounded-full border px-3 py-1 flex items-center gap-1"
          >
            <ArrowLeft size={18} /> Volver
          </button>

          <p className="text-xs text-gray-500 font-semibold">NEWS</p>

          <h1 className="font-bold text-2xl lg:text-4xl max-w-3xl">
            Lost cat found the way back to her home
          </h1>

          {/* Main Image */}
          <div className="w-full h-48 lg:h-80 bg-gray-300 rounded-xl flex items-center justify-center">
            <ImageIcon size={60} />
          </div>

          {/* Text Blocks */}
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            A cat named Mittens has made national headlines after she managed to
            find her way back home, despite being lost for over a week. Mittens,
            a three-year-old tabby, went missing on July 4th after she escaped
            through an open window at her owner's home.
          </p>

          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            A cat named Mittens has made national headlines after she managed to
            find her way back home, despite being lost for over a week. Mittens,
            a three-year-old tabby, went missing on July 4th after she escaped
            through an open window at her owner's home.
          </p>

          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            A cat named Mittens has made national headlines after she managed to
            find her way back home, despite being lost for over a week. Mittens,
            a three-year-old tabby, went missing on July 4th after she escaped
            through an open window at her owner's home.
          </p>
        </div>

        {/* Related - Desktop Right Column */}
        <div className="hidden lg:block w-80 border-l pl-6 space-y-4">
          <h2 className="font-bold text-lg">Related</h2>
          {Array.from({ length: 4 }).map((_, i) => (
            <RelatedCard key={i} />
          ))}
        </div>
      </div>

      {/* Related - Mobile Grid */}
      <div className="lg:hidden mt-6 space-y-3">
        <h2 className="font-bold text-lg">Related</h2>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <RelatedCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedCard() {
  return (
    <Link href={"/blog/post"} className="flex flex-col gap-2 text-xs">
      <div className="w-full h-20 bg-gray-300 rounded-xl"></div>
      <span className="text-gray-500 font-semibold">NEWS</span>
      <p className="font-bold leading-tight text-sm">
        All pets from shelter were adopted!
      </p>
      <span className="text-gray-500">13 June 2023</span>
    </Link>
  );
}