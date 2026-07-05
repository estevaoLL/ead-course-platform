# 🎓 Plataforma de Cursos EAD

## 📝 Sobre o Projeto
Este projeto consiste no desenvolvimento de um ecossistema digital para gestão e ensino à distância, criado como trabalho final para a disciplina de Princípios de Engenharia de Software (UERJ)[cite: 5]. 

A aplicação possui foco no Front-end e na modelagem de requisitos, conectando dois atores principais:
* **Alunos:** Podem descobrir, adquirir e consumir materiais de aprendizagem (vídeos, quizzes), interagir em fóruns de dúvidas e emitir certificados de conclusão[cite: 5].
* **Professores/Instrutores:** Possuem ferramentas de gestão para criar cursos, adicionar módulos e materiais de apoio, definir preços, responder dúvidas e analisar métricas de vendas[cite: 5].

> **⚠️ Nota Técnica (Mock Database):** O foco desta etapa do projeto foi a validação da interface, arquitetura e Casos de Uso. Portanto, a aplicação não possui conexão com um banco de dados real. Todos os dados, relacionamentos e estados (como progresso de aulas e cursos disponíveis) são simulados (mockados) através do arquivo estático `src/data/initialData.js`.

## 🛠 Arquitetura e Engenharia
O projeto foi cuidadosamente estruturado com base nos artefatos de Engenharia de Software, aplicando o padrão de separação de responsabilidades (Models, Controllers, Pages e Components). 

Na documentação deste repositório, você encontrará as fundamentações do sistema:
- Documento de Requisitos e Histórias de Usuário (HU)[cite: 5].
- Diagrama de Casos de Uso[cite: 5].
- Diagrama Conceitual (Modelo de Domínio).

## 🚀 Tecnologias Utilizadas
* **Front-end:** React.js
* **Build Tool:** Vite
* **Linguagem:** JavaScript / JSX
