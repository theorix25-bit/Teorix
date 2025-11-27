// TYPE PARA EL USUARIO DE LA BASE DE DATOS
type User = {
  id: string;
  name: string;
  lastName: string;
  zipcode: string;
};
// TYPE PARA EL USUARIO EN SESIÓN AUTENTICADO
type UserAuthId = {
  userId: string | null | undefined;
  email?: string | null | undefined;
};
// TYPE PARA LOS ERRORES QUE SE ENVÍAN A LA BASE DE DATOS
type ErrorLog = {
  mensaje: string;
  origin: string;
  details: string;
  authId?: string | null | undefined;
};
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

type Subscription = {
  id: number;
  usuario_id: number;
  suscripcion_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  activa: boolean;
  metodo_pago: string;
  pago_stripe_id: string;
};
//
type TestimonialPlanDetails = {
  text: string;
  author: string;
  result: string;
};

type BenefitPlanDetails = {
  icon: any; // Usaremos 'any' para el componente de icono de Lucide
  title: string;
  description: string;
};

type PlanDetails = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: BenefitPlanDetails[];
  testimonial: TestimonialPlanDetails;
  cta: string;
  ctaVariant: "outline" | "default";
  highlight?: boolean;
};

type CheckoutBody = {
  userId: string;
  planId: number;
  stripeId: string;
};

type optionsSingUp = {
  data: { name: string };
  emailRedirectTo: string;
};

type TypeSignUp = {
  email: string;
  password: string;
  options: optionsSingUp;
};

type VimeoUrl =
  | `https://vimeo.com/${string}`
  | `https://player.vimeo.com/video/${string}`;

type Video = {
  uri: string;
  name: string;
  description: string;
  type: string;
  link: string;
  player_embed_url: VimeoUrl;
  duration: number;
  width: number;
  language: string;
  height: number;
  embed: {};
};
