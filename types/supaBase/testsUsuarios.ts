export interface TestsUsuarioDB {
  user_id: string
  pregunta_actual: number
  puntos: number
  racha: number
  updated_at: string
}

export interface TestsUsuarioUpdateDB {
  pregunta_actual: number
  puntos: number
  racha: number
}