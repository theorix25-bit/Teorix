
export default function ParaQuein()  {
  return (
    <section className="relative py-10 text-white overflow-hidden">
      {/* Elementos decorativos de fondo similares al Hero */}

      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado de Sección */}
        <div className="text-center mb-6">
          <h2 className="text-lima font-bold tracking-widest uppercase mb-2">
            ¿Para quién es? Para todos los públicos
          </h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6">
            PRESÉNTATE CON QUIEN QUIERAS, <br />
            PERO APRUEBA CON <span className="text-hoodie neon-glow"> NOSOTROS</span>
          </h3>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            Nuestra misión social es que apruebes a la primera, sin importar las siglas que pongan en tu expediente. 
            <span className="text-lima font-bold"> Theorix*</span> es el método de acompañamiento para todos los que quieren el APTO en tiempo récord y con el menor esfuerzo posible.
          </p>
        </div>

        {/* Banner Secundario */}
        <div className="bg-card/30 max-w-5xl mx-auto border border-white/10 rounded-3xl p-8 mb-12 text-center backdrop-blur-sm">
          <h4 className="text-2xl md:text-3xl font-black italic">
            ES PARA TI (Y PARA EL 50% QUE VA A<span className="text-hoodie"> SUSPENDER</span>)*
          </h4>
          <p className="text-gray-400 mt-2">
            En Teorix* no nos importa dónde estés, sino a dónde quieres llegar. El sistema tradicional está colapsado, 
            pero nosotros tenemos el <span className="text-lima">cheatcode universal</span> para que el examen teórico deje de ser un drama.
          </p>
        </div>

        {/* Grid de Opciones */}
        <div className="grid md:grid-cols-2 gap-8 md:px-12">
          
          {/* OPCIÓN A */}
          <div className="group relative bg-zinc-900/50 border border-white/5 p-8 rounded-3xl transition-all hover:border-lima/50">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🕹️</span>
              <div>
                <h5 className="text-lima font-bold text-sm tracking-tighter uppercase">Opción A</h5>
                <h4 className="text-2xl font-black italic uppercase">"Aún no he empezado"</h4>
                <p className="text-xs text-lima/70 font-mono">(El camino Hacker)</p>
              </div>
            </div>
            
            <ul className="space-y-6">
              <li className="flex gap-3">
                <span className="text-lima font-bold mt-1">→</span>
                <p><strong className="text-white">Empieza con la Píldora Roja:</strong> Olvida los libros de 300 páginas; aquí vas directo al grano con nuestro Algoritmo 80/20.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-lima font-bold mt-1">→</span>
                <p><strong className="text-white">Modo Speedrun:</strong> Aprueba antes de que se te acabe la batería del móvil y elige dónde examinarte con total libertad.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-lima font-bold mt-1">→</span>
                <p><strong className="text-white">Sin laberintos digitales:</strong> Entras, estudias con Teox* y apruebas. Así de simple.</p>
              </li>
            </ul>
          </div>

          {/* OPCIÓN B */}
          <div className="group relative bg-zinc-900/50 border border-white/5 p-8 rounded-3xl transition-all hover:border-hoodie/50">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🛡️</span>
              <div>
                <h5 className="text-hoodie font-bold text-sm tracking-tighter uppercase">Opción B</h5>
                <h4 className="text-2xl font-black italic uppercase">"Ya estoy matriculado"</h4>
                <p className="text-xs text-hoodie/70 font-mono">(Tu refuerzo Élite)</p>
              </div>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-3">
                <span className="text-hoodie font-bold mt-1">→</span>
                <p><strong className="text-white">Tu Profesor Particular 24/7:</strong> Tu autoescuela cierra, pero Teox* no. Resolvemos tus dudas a las 3 AM.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-hoodie font-bold mt-1">→</span>
                <p><strong className="text-white">Filtro Anti-Paja:</strong> Si tu manual es un tostón, usa nuestro Filtro Anti-Chapa para estudiar solo lo que SÍ O SÍ cae.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-hoodie font-bold mt-1">→</span>
                <p><strong className="text-white">Blindaje contra el Suspenso:</strong> Usa nuestro Módulo 400 para entender la lógica vial que otros no te explican.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};