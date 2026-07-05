export class Progresso {
    constructor(alunoId, cursoId, aulasConcluidas = new Set()) {
        this.alunoId = alunoId;
        this.cursoId = cursoId;
        this.aulasConcluidas = aulasConcluidas;
    }

    marcarConclusao(aulaId) {
        if (this.aulasConcluidas.has(aulaId)) {
            this.aulasConcluidas.delete(aulaId);
            return false; 
        } else {
            this.aulasConcluidas.add(aulaId);
            return true; 
        }
    }

    obterPercentual(totalAulas) {
        return (this.aulasConcluidas.size / totalAulas) * 100;
    }

    estaConcluido(aulaId) {
        return this.aulasConcluidas.has(aulaId);
    }
}