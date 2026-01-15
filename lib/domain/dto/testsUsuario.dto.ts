export interface TestsUsuarioDTO {
  user_id: string;
  preguntaActual: number;
  puntos: number;
  racha: number;
  updatedAt: string;
}

export interface TestsUsuarioUpdateDTO {
  preguntaActual: number
  puntos: number
  racha: number
}