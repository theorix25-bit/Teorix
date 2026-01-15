export interface PlanUsuarioDB {
  id: number;
  usuario_id: number;
  plan_id: number;
  estado: boolean;
  pago_stripe: string;
  inicio_periodo: Date | null;
  fin_periodo: string;
  creado_en: string;
  actualizado_en: string;
}
