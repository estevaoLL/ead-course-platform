export class Avaliacao {
    constructor(id, cursoId, nota, comentario, autor) {
        this.id = id;
        this.cursoId = cursoId;
        this.nota = nota;
        this.comentario = comentario;
        this.autor = autor;
        this.data = new Date();
    }
}