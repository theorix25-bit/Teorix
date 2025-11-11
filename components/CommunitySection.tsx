import React from 'react';

// Los datos se mantienen iguales
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
    <section className="py-3">
      
      <div className="container">
        
        <div className="text-center mb-5">
          <div className="d-inline-block px-3 py-1 rounded-pill border mb-3">
            <span className="text-white fw-bold small text-uppercase ">
              Comunidad & Tips
            </span>
          </div>
          
          <h2 className="display-4 fw-black mb-3">
            Examen <span className="text-lima">ON</span>. Drama <span className="text-lima">OFF</span>.
          </h2>
          
          {/* Subtítulo (Lead para texto destacado y mx-auto para centrar) */}
          <p className="lead text-white mx-auto" style={{ maxWidth: '500px' }}>
            Trucos, consejos y contenido que realmente ayuda
          </p>
        </div>

        <div className="row g-2 justify-content-center mx-auto mb-5" style={{ maxWidth: '1000px' }}>
          {communityPosts.map((post, index) => (
            
            <div key={index} className="col-6 col-md-4">
              
              <div 
                className="card h-100 border rounded-4" 
                style={{ 
                  aspectRatio: '5 / 5', 
                  cursor: 'pointer',
                }}
              >
                <div className="card-body p-3 d-flex flex-column justify-content-between position-relative z-1">
                  
                  <div className="align-self-start">
                    <span className="text-lima small fw-bold text-uppercase">
                      {post.category}
                    </span>
                  </div>

                  <div>
                    <div className="display-3 mb-2">{post.emoji}</div>
                    
                    <h3 className="fs-6 mb-2 text-white">
                      {post.title}
                    </h3>
                    
                    {/* <p className="card-text text-white small">
                      👁️ {post.views} views
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#" className="btn border border-2 p-3 rounded-4 d-inline-flex align-items-center gap-3 ">
            <span className="fs-3 transition-transform-rotate">📱</span>
            <div className="text-start">
              <p className="small fw-bold text-white mb-0 text-uppercase letter-spacing-1">
                Únete al grupo
              </p>
              <p className="fw-semibold text-white mb-0">
                Contenido nuevo cada día en TikTok & IG
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};