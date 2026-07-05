export class Certificado {
    constructor(codigoValidacao, cargaHoraria, curso, aluno) {
        this.codigoValidacao = codigoValidacao;
        this.dataEmissao = new Date();
        this.cargaHoraria = cargaHoraria;
        this.curso = curso;
        this.aluno = aluno;
    }
}