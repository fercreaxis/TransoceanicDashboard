export class LoginData {
    public conectado: boolean;
    public usuarioConectado: string;
    public nombreUsuarioConectado: string;
    public nombreEmpresa: string;
    public gerencial: boolean;

    constructor() {
        this.conectado = false;
        this.usuarioConectado = '';
        this.nombreUsuarioConectado = '';
        this.nombreEmpresa = '';
        this.gerencial = false;
    }
  }
