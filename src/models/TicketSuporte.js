export class TicketSuporte {
    constructor(protocolo, assunto, descricao, aluno, curso = null) {
        this.protocolo = protocolo;
        this.assunto = assunto;
        this.descricao = descricao;
        this.aluno = aluno;
        this.curso = curso;
        this.status = 'Aberto';
        this.dataAbertura = new Date();
    }
}