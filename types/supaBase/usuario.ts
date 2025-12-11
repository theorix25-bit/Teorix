// TYPE PARA EL USUARIO DE LA BASE DE DATOS
/**
 *  Tipado para los usuarios de la base de datos Supabase */ 
type User = {
  id: number;
  nombre: string;
  apellido: string;
  zipcode: string;
  app_metadata:Role;
};


type Role = {
  role:string
}
type UserAuthId = {
  userId: string | null | undefined;
  email?: string | null | undefined;
};

