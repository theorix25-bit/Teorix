// TYPE PARA EL USUARIO DE LA BASE DE DATOS
/**
 *  Tipado para los usuarios de la base de datos Supabase */
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
