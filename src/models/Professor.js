import { Usuario } from './Usuario.js';

export class Professor extends Usuario {
    constructor(nome, email, senha, especialidade, biografia) {
        super(nome, email, senha);
        this.especialidade = especialidade;
        this.biografia = biografia;
    }
}