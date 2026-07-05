export class Aula {
    constructor(id, titulo, urlVideo, materialApoio, duracao, tipo = 'video') {
        this.id = id;
        this.titulo = titulo;
        this.urlVideo = urlVideo;
        this.materialApoio = materialApoio;
        this.duracao = duracao;
        this.tipo = tipo; 
    }
}