export class Curso {
    constructor(id, titulo, descricao, preco, nivel, instructorName, imageUrl = '', type = 'online') {
        this.id = id;
        this.title = titulo;         
        this.description = descricao; 
        this.price = preco;          
        this.level = nivel;
        this.instructor = instructorName;
        this.imageUrl = imageUrl;
        this.type = type;

        this.rating = 0.0; 
        this.modulos = [];
    }

    static criar(dados) {
        return new Curso(
            Math.floor(Math.random() * 10000),
            dados.titulo,
            dados.descricao,
            parseFloat(dados.preco),
            dados.nivel,
            dados.instructor || "Professor Logado",
            dados.imageUrl,
            dados.type || 'online'
        );
    }
}