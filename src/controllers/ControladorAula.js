import { Progresso } from '../models/Progresso.js';

export class ControladorAula {
    constructor(progressoGlobal, setProgressoGlobal) {
        this.progressoGlobal = progressoGlobal;
        this.setProgressoGlobal = setProgressoGlobal;
    }

    carregarAula(aulaId) {
        console.log(`Carregando aula ${aulaId}...`);
        return true;
    }

    registrarConclusao(cursoId, aulaId, alunoId = 1) {
        const estadoAtual = this.progressoGlobal[cursoId] || { completed: new Set(), unlocked: new Set([0]) };
        
        const dominioProgresso = new Progresso(alunoId, cursoId, new Set(estadoAtual.completed));
        
        dominioProgresso.marcarConclusao(aulaId);
        
        this.setProgressoGlobal(prev => ({
            ...prev,
            [cursoId]: {
                ...estadoAtual,
                completed: dominioProgresso.aulasConcluidas 
            }
        }));
    }
    
    registrarAprovacaoQuiz(cursoId, quizId, nextModuleIndex) {
         const estadoAtual = this.progressoGlobal[cursoId] || { completed: new Set(), unlocked: new Set([0]) };
         const novasConcluidas = new Set(estadoAtual.completed).add(quizId);
         const novosDesbloqueados = new Set(estadoAtual.unlocked).add(nextModuleIndex);
         
         this.setProgressoGlobal(prev => ({
            ...prev,
            [cursoId]: {
                completed: novasConcluidas,
                unlocked: novosDesbloqueados
            }
        }));
    }
}

