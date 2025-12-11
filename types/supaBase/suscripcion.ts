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