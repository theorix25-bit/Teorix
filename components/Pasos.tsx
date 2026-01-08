const pasos = [
  {
    titulo: "Accede a “Crear cuenta” desde el menú principal.",
  },
  {
    titulo:
      "Completa el formulario con tu nombre, correo electrónico y contraseña",
  },
  {
    titulo: "Haz clic en “Registrarme” para crear tu cuenta.",
  },
  {
    titulo: "Revisa tu correo y confirma tu cuenta",
  },
  {
    titulo:
      "Vuelve a la web e “Iniciar sesión” e ingresa tu correo y contraseña.",
  },
  {
    titulo: "Una vez dentro, completa los datos adicionales de tu perfil",
  },
];
function Pasos() {
  return (
    <>
      <section className="w-full py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-semibold mb-8 text-center">
            Cómo <span className="text-lima">registrarte</span> en la{" "}
            <span className="text-hoodie">plataforma</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {pasos.map((p, i) => (
              <div key={i} className="p-6 transition">
                <div className="w-12 h-12 flex items-center justify-center bg-lima text-black rounded-full text-xl font-bold mb-3">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.titulo}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Pasos;
