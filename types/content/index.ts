// 1. Definimos los tipos de elementos permitidos para mayor seguridad
export type TipoElemento = 
  | 'titulo' 
  | 'subtitulo' 
  | 'texto_destacado' 
  | 'texto_secundario' 
  | 'boton' 
  | 'badge' 
  | 'imagen';

// 2. Definimos la estructura de la Metadata (que es flexible)
export interface ElementMetadata {
  url?: string;
  color?: string;
  bg_color?: string;
  highlight?: string;
  color_highlight?: string;
  icon?: string;
  [key: string]: any; // Permite agregar campos extra sin que rompa
}

// 3. El tipo para un elemento individual de la base de datos
export interface ElementoWeb {
  texto: string;
  tipo: TipoElemento;
  meta: ElementMetadata;
}

// 4. El Type final para tu sección Hero
export interface HeroContent {
  hero_title: ElementoWeb;
  hero_subtitle: ElementoWeb;
  hero_description: ElementoWeb;
  hero_instruction: ElementoWeb;
  hero_main_button: ElementoWeb;
  hero_feature_1: ElementoWeb;
  hero_feature_2: ElementoWeb;
  hero_feature_3: ElementoWeb;
}

