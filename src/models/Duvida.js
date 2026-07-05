export class Duvida {
    constructor(id, texto, autor, data = new Date()) {
        this.id = id;
        this.texto = texto;
        this.autor = autor;
        this.data = data;
        this.resposta = null;
        this.respondida = false;
    }
}