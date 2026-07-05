import { Usuario } from './Usuario.js';

export class Aluno extends Usuario {
    constructor(nome, email, senha, matricula) {
        super(nome, email, senha);
        this.matricula = matricula;
        this.inscricoes = [];
    }
}

