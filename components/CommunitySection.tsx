const communityPosts = [
  {
    title: "5 señales que siempre confunden",
    emoji: "💣",
    category: "THEORIX Tips",
    views: "12.4K",
  },
  {
    title: "Aprobé sin estudiar 40 horas",
    emoji: "🎯",
    category: "Testimonios",
    views: "8.9K",
  },
  {
    title: "Mitos del teórico que nadie cuenta",
    emoji: "🚨",
    category: "Mitos",
    views: "15.2K",
  },
  {
    title: "Trucos para el día del examen",
    emoji: "⚡",
    category: "THEORIX Tips",
    views: "21.1K",
  },
  {
    title: "Preguntas trampa y cómo detectarlas",
    emoji: "🎮",
    category: "Dudas",
    views: "18.7K",
  },
  {
    title: "De 3 suspensos a APTO directo",
    emoji: "🔥",
    category: "Testimonios",
    views: "9.3K",
  },
];

export const CommunitySection = () => {
  return (
    <section className="py-10 px-6 bg-card/20 relative overflow-hidden">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-hoodie/10 border border-hoodie/20 mb-4">
            <span className="text-hoodie font-bold text-sm uppercase tracking-wider">
              Comunidad & Tips
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            Examen <span className="text-lima">ON</span>. <br /> Drama{" "}
            <span className="text-hoodie">OFF</span>.
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Trucos, consejos y contenido que realmente ayuda
          </p>
        </div>

        {/* Posts grid (TikTok style) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl md:max-w-4xl mx-auto mb-12">
          {communityPosts.map((post, index) => (
            <div
              key={index}
              className="group relative aspect-[4/5] md:aspect-square rounded-2xl bg-gradient-to-br from-muted/50 to-muted overflow-hidden border border-transparent hover:border-lima/50 transition-all duration-300 cursor-pointer hover:scale-105"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 to-slate-800/40 backdrop-blur-sm"></div>

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                {/* Category badge */}
                <div className="self-start">
                  <span className="px-3 py-1 rounded-full bg-lima/20 text-lima text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Bottom content */}
                <div>
                  {/* Emoji */}
                  <div className="text-5xl md:text-8xl mb-3 group-hover:scale-125 transition-transform">
                    {post.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-foreground font-bold text-lg leading-tight mb-2 group-hover:text-lima transition-colors">
                    {post.title}
                  </h3>

                  {/* Views */}
                  <p className="text-muted-foreground text-sm">
                    👁️ {post.views} views
                  </p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-lima/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-background border-2 border-lima/20 hover:border-lima/50 transition-all cursor-pointer group">
            <span className="text-3xl group-hover:rotate-12 transition-transform">
              📱
            </span>
            <div className="text-left">
              <p className="text-sm font-bold text-lima uppercase tracking-wider">
                Únete al grupo
              </p>
              <p className="text-foreground font-semibold">
                Contenido nuevo cada día en TikTok & IG
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
