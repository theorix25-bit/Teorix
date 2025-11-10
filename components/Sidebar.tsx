export default function sidebar() {
  return (
    <>
      <div>
        <div id="sidebar" className="bg-dark text-white p-3 vh-100">
          <h4 className="mb-4">Menú</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Ventas
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Configuración
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
