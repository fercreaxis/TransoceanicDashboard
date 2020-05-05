export class FiltroConsulta {
    public id: number;
    param_1: string;
    public tipo_opcion_1: string;
    public tipo_opcion_2: string;
    public tipo_opcion_3: string;
    public opcion_1: number;
    public opcion_2: number;
    public opcion_3: number;

    constructor() {
        this.id = 0;
        this.param_1 = '';
        this.tipo_opcion_1 = '';
        this.tipo_opcion_2 = '';
        this.tipo_opcion_3 = '';
        this.opcion_1 = 0;
        this.opcion_2 = 0;
        this.opcion_3 = 0;
    }
}
