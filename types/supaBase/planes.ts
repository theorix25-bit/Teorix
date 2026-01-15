export interface PlanDB {
    id: number,
    nombre: string,
    descripción: string,
    precio: string,
    cta: string,
    insignia: string,
    slug: string,
    caracteristicas:
      string[],
    resaltar: boolean,
    creado_en: string,
    actualizado_en: string,
    fase: string,
    orden: string,
}