import { UserPlus, Mail, MousePointerClick, CheckCircle2, LogIn, Settings2 } from "lucide-react";
import Link from "next/link";

const pasos = [
  {
    titulo: "Accede a “Crear cuenta”",
    descripcion: "Busca el botón en el menú principal.",
    icono: <UserPlus className="w-6 h-6" />,
  },
  {
    titulo: "Completa el Formulario",
    descripcion: "Tu nombre, email y una contraseña segura.",
    icono: <Mail className="w-6 h-6" />,
  },
  {
    titulo: "Haz clic en Registrarme",
    descripcion: "Un solo click para iniciar tu proceso.",
    icono: <MousePointerClick className="w-6 h-6" />,
  },
  {
    titulo: "Confirma tu Email",
    descripcion: "Revisa tu bandeja y valida tu acceso.",
    icono: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    titulo: "Inicia Sesión",
    descripcion: "Vuelve e ingresa tus credenciales.",
    icono: <LogIn className="w-6 h-6" />,
  },
  {
    titulo: "Configura tu Perfil",
    descripcion: "Completa tus datos para personalizar Teox*.",
    icono: <Settings2 className="w-6 h-6" />,
  },
];

export function Pasos() {
  return (
    <section className="w-full py-20 b overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Encabezado Estilo Hacker */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            PROTOCOLO DE <span className="text-lima">REGISTRO</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-[0.3em]">
            Inicia tu cuenta en 60 segundos
          </p>
        </div>

        {/* Grid con Conectores Visuales */}
        <div className="grid md:grid-cols-3 gap-y-12 gap-x-8 relative">
          {/* Línea decorativa de fondo (solo en desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-lima/20 to-transparent -z-10"></div>

          {pasos.map((p, i) => (
            <div key={i} className="group relative">
              {/* Número de paso flotante */}
              <div className="absolute -top-4 -left-2 text-6xl font-black text-white/15 group-hover:text-lima/10 transition-colors pointer-events-none">
                0{i + 1}
              </div>

              <div className="relative p-6 bg-zinc-900/40 border border-white/5 rounded-2xl transition-all duration-300 group-hover:border-lima/40 group-hover:-translate-y-2 backdrop-blur-sm">
                {/* Icono con contenedor circular */}
                <div className="w-14 h-14 flex items-center justify-center bg-black border border-white/10 text-lima rounded-xl mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-lima group-hover:shadow-[0_0_20px_rgba(190,242,2,0.2)] transition-all">
                  {p.icono}
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-lima transition-colors">
                  {p.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {p.descripcion}
                </p>

                {/* Indicador de progreso móvil/tablet */}
                <div className="mt-4 h-1 w-0 bg-lima group-hover:w-full transition-all duration-500 rounded-full opacity-50"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón de acción final */}
        <div className="mt-16 text-center">
          <Link href="/formula" className="px-10 py-4 bg-lima text-black font-black rounded-xl hover:scale-105 transition-transform uppercase ">
            Crear mi cuenta ahora
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pasos;