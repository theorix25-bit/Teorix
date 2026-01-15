// TYPE PARA EL USUARIO DE LA BASE DE DATOS
/**
 *  Tipado para los usuarios de la base de datos Supabase */
type UserDB = {
  id: number;
  auth_id: string;
  nombre: string;
  apellido: string;
  codigo_postal: string;
  creado_en: string;
  pago_stripe: string;
  rol: string;
  actualizado_en: string;
  telefono: string;
  fecha_de_nacimiento: string;
  stripe_customer_id: string;
};
type User = {
    id: number,
    auth_id: string ,
    nombre: string ,
    apellido: string ,
    codigo_postal: string ,
    telefono:string,
    rol: string ,
    creado_en: string ,
    pago_stripe: string ,
    actualizado_en: string ,
};

type Role = {
  role: string;
};
type UserAuthId = {
  userId: string | null | undefined;
  email?: string | null | undefined;
};
