export interface PlanUsuarioDTO {
    id: number;
    usuarioId: number;
    planId: number;
    estado: boolean;
    pagoStripe: string;
    inicioPeriodo: Date | null;
    finPeriodo: string;
    creadoEn: string;
    actualizadoEn: string;
}
