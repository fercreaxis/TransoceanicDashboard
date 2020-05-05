export class Login {
    public username: string;
    public password: string;
    public name_user: string;
    public company_name: string;
    public kind: number;
    public token: string;

    constructor() {
        this.username = '';
        this.password = '';
        this.name_user = '';
        this.company_name = '';
        this.kind = 0;
        this.token = '';
    }
}
