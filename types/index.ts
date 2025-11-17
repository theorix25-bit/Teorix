type User = {
  id: string;
  name: string;
  lastName: string;
  zipcode: string;
};

type UserAuthId = {
  userId: string | null | undefined;
  email?: string | null | undefined
};

type ErrorLog = {
  mensaje: string;
  origin: string;
  details: string;
  authId?: string | null | undefined;
};

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

// Definición de tipos para mayor claridad (aunque en JSX no son estrictamente necesarios)
interface TestimonialPlanDetails {
  text: string;
  author: string;
  result: string;
}

interface BenefitPlanDetails {
  icon: any; // Usaremos 'any' para el componente de icono de Lucide
  title: string;
  description: string;
}

interface PlanDetails {
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
}

type CheckoutBody = {
  userId: string;
  plan: PlanDB;
};
