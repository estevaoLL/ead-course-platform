export class Quiz {
    constructor(id, titulo, notaMinima) {
        this.id = id;
        this.titulo = titulo;
        this.notaMinima = notaMinima;
        this.perguntas = [];
    }
}