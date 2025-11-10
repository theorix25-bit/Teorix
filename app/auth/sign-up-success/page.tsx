export default function GraciasRegistro() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-4">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-0">
            <h2 className="h4 mb-1 text-center fw-bold text-lime">
              ¡Gracias por registrarte!
            </h2>
            <p className="text-white text-center mb-0">
              Revisa tu correo para confirmar tu cuenta
            </p>
          </div>

          <div className="card-body">
            <p className="text-white text-center">
              Tu registro fue exitoso. Por favor, verifica tu bandeja de entrada
              para confirmar tu cuenta antes de iniciar sesión.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
