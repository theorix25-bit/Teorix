export interface PlaneDTO {
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
    creadoEn: string,
    actualizadoEn: string,
    fase: string,
    orden: string,
}
