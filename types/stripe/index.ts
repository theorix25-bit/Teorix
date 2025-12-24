// TYPE PARA LOS PLANES DE LA BASE DE DATOS
type PlanDB = {
  actualizado_en: string;
  caracteristicas: string[];
  color: null;
  creado_en: string;
  cta: string;
  descripción: string;
  id: 1;
  id_producto_stripe: string;
  insignia: string;
  link: string;
  nombre: string;
  precio: number;
};


type CheckoutBody = {
  userId: string;
  planId: number;
  stripeId: string;
};

