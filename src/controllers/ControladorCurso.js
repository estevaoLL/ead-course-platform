import { Curso } from '../models/Curso.js';

export class ControladorCurso {
    constructor(listaCursos, setListaCursos, setConteudoCursos) {
        this.listaCursos = listaCursos;
        this.setListaCursos = setListaCursos;
        this.setConteudoCursos = setConteudoCursos;
    }

    iniciarCriacaoCurso() {
        return true; 
    }

    validarECriarCurso(dadosCurso) {
        if (!dadosCurso.titulo || dadosCurso.preco < 0) {
            alert("Dados inválidos: Título obrigatório e preço não pode ser negativo.");
            return null;
        }

        const novoCurso = Curso.criar(dadosCurso);

        this.setListaCursos(prev => [novoCurso, ...prev]);

        if (this.setConteudoCursos) {
            this.setConteudoCursos(prev => ({ ...prev, [novoCurso.id]: [] }));
        }
        
        return novoCurso;
    }

    excluirCurso(cursoId) {
        if (window.confirm("Tem certeza que deseja excluir este curso?")) {
             this.setListaCursos(prev => prev.filter(c => c.id !== cursoId));
        }
    }

    atualizarConteudo(cursoId, novoConteudo) {
        if (this.setConteudoCursos) {
            this.setConteudoCursos(prev => ({ ...prev, [cursoId]: novoConteudo }));
        }
    }
}

