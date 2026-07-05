export class Inscricao {
    constructor(aluno, curso) {
        this.id = `${aluno.matricula}-${curso.id}`;
        this.aluno = aluno;
        this.curso = curso;
        this.progresso = new Progresso(aluno.id, curso.id);
    }
}