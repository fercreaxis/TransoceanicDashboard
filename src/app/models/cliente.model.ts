export class Cliente {
    public codigo: string;
    public tipo: number;
    public nombre1: string;
    public nombre2: string;
    public apellido1: string;
    public apellido2: string;
    public nombre: string;
    public pnombre: number;
    public identidad: string;
    public tipoid: number;
    public direccion: string;
    public direccion2: string;
    public telefono: string;
    public ciudad: string;
    public estado: string;
    public pais: string;
    public zip: string;
    public contacto: string;
    public email: string;
    public fax: string;
    public cartapoder: Date;
    public saldoActual: number;

    constructor() {
        this.codigo = '';
        this.tipo = 0;
        this.saldoActual = 0;
    }
}
