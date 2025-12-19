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

interface PlanDetails {
  id: number;
  nombre: string;
  descripción: string;
  precio: string;
  creado_en: string;
  actualizado_en: string;
  id_producto_stripe: string;
  eslogan: string /* Agregar a la base de datos */;
  link: string;
  caracteristicas: string[];
  cta: string;
  ctaVariant: "esquema" | "predeterminado";
  resaltar?: boolean;
  insignia: string;
}
interface PlanDetailsDB {
  id: number;
  nombre: string;
  descripción: string;
  precio: number;
  creado_en: string;
  actualizado_en: string;
  id_producto_stripe: string;
  color: string;
  cta: string;
  insignia: string;
  link: string;
  caracteristicas: string[];
}

type optionsSingUp = {
  data: { name: string };
  emailRedirectTo: string;
};

type TypeSignUp = {
  email: string;
  password: string;
  options: optionsSingUp;
};
interface Clases_b {
  id: number;
  titulo: String;
  descripcion: string;
  slug: string;
  temas: Temas[];
}

type Temas = {
  id: number;
  clase_id: number;
  titulo: string;
  descripcion: string;
  temas: SubTemas[];
  completed: boolean;
  locked: boolean;
  slug: string;
};

type SubTemas = {
  id: number;
  titulo: String;
  descripcion: string;
  subtemas: string[];
  preguntas: Preguntas[];
};

type Preguntas = {
  id: number;
  question: string;
  yesCount: number;
  noCount: number;
};

// TYPE PARA LOS ERRORES QUE SE ENVÍAN A LA BASE DE DATOS
type ErrorLog = {
  mensaje: string;
  origin: string;
  details: string;
  authId?: string | null | undefined;
};

interface ClaseProgreso extends Clases_b {
  Temas: TemasProgreso;
}

interface TemasProgreso extends Temas {
  SubTema: SubTemaProgreso;
}

interface SubTemaProgreso extends SubTemas {
  progreso: Progreso;
}
interface Progreso {
  completado: boolean;
  completado_en: string;
}

interface VideosDB {
  id: number;
  titulo: string;
  created_at: string;
}
