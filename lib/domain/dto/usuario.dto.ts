export interface UsuarioDTO {
  id: number;
  authId: string;
  nombre: string;
  apellido: string;
  codigo_postal: string;
  creado_en: string;
  pago_stripe: string;
  role: string;
  actualizado_en: string;
  telefono: string;
  fecha_de_nacimiento: string;
  stripe_customer_id: string;
}
