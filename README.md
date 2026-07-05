# 🎓 Plataforma de Cursos EAD

Sistema web integrado de gestão e ensino à distância (EAD), desenvolvido como projeto prático para a disciplina de Princípios de Engenharia de Software. A plataforma foi projetada para centralizar a administração de conteúdo acadêmico e proporcionar uma experiência de aprendizado flexível, conectando Alunos e Professores.

## ✨ Características Principais

* **Arquitetura Baseada em Requisitos:** Sistema totalmente modelado a partir de Casos de Uso (CDUs), Histórias de Usuário e Diagramas Conceituais.
* **Múltiplos Atores:** Interfaces e fluxos de navegação distintos para Alunos e Instrutores/Professores.
* **Gerenciamento de Estado Simulando Persistência:** Utilização de estruturas de dados locais (`initialData.js`) estruturadas como um banco de dados relacional para viabilizar testes de interface e lógicas de controle sem a necessidade de um backend real.
* **Padrões de Engenharia:** Separação clara de responsabilidades no código (Models, Controllers e Views/Pages).

---

## 🚀 Funcionalidades Implementadas

O projeto implementa uma vasta gama de Casos de Uso (CDUs) definidos na documentação oficial:

### 🧑‍🎓 1. Visão do Aluno
* **Busca e Filtro de Cursos:** Autocomplete por palavra-chave e filtros combinados (nível, preço, avaliação).
* **Jornada de Matrícula:** Visualização detalhada de ementas, adição ao carrinho, aplicação de cupons de desconto e simulação de checkout.
* **Ambiente Virtual de Aprendizagem (Player):** 
  * Consumo de videoaulas com navegação entre módulos.
  * Atualização de progresso dinâmico (marcar como concluído).
  * Realização de quizzes de múltipla escolha para validação de conhecimento.
  * Download de materiais de apoio.
* **Interação e Feedback:**
  * Envio de perguntas diretamente na área de dúvidas de cada aula.
  * Avaliação do curso (1 a 5 estrelas e comentários).
* **Certificação:** Emissão de certificado (simulada) liberada automaticamente ao atingir 100% de progresso.
* **Suporte:** Abertura e acompanhamento de tickets de atendimento.

### 👨‍🏫 2. Visão do Professor / Instrutor
* **Gestão de Conteúdo (Criação de Cursos):**
  * Cadastro de informações básicas (Título, Descrição, Nível).
  * Estruturação de grade curricular (Adicionar/Editar/Remover Módulos e Aulas).
  * Upload simulado de vídeos e materiais de apoio.
* **Precificação:** Definição de valores dos cursos ou configuração de gratuidade.
* **Gestão de Comunidade:** Painel centralizado para responder dúvidas pendentes dos alunos.
* **Dashboard de Desempenho:** Acompanhamento de métricas financeiras (faturamento) e de engajamento (número de alunos matriculados).

---

## 💻 Tecnologias Utilizadas

* **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)
* **Build Tool:** Vite
* **Engenharia de Software:** UML (Diagramas de Classe, Casos de Uso e Modelo de Domínio), Padrões GRASP.
* **Persistência de Dados (Mock):** Objetos e Arrays JavaScript simulando tabelas relacionais.

---

## 📂 Estrutura do Projeto

A organização das pastas reflete a arquitetura planejada para separar dados, regras de negócio e interfaces:

```text
.
├── src/
│   ├── components/       # Componentes visuais reutilizáveis (Header, CourseCard, Quiz, etc.)
│   ├── controllers/      # Controladores de domínio (ControladorAula, ControladorCurso)
│   ├── data/             # Base de dados simulada (initialData.js)
│   ├── hooks/            # Regras de estado customizadas (useAppLogic.js)
│   ├── models/           # Classes de domínio (Aluno, Curso, Aula, Avaliacao, etc.)
│   ├── pages/            # Telas principais roteadas (Home, Dashboard, LessonPlayer, etc.)
│   ├── App.jsx           # Configuração de Rotas
│   └── main.jsx          # Ponto de entrada da aplicação
├── public/               # Arquivos e assets estáticos
├── package.json          # Dependências do projeto
└── vite.config.js        # Configurações do compilador Vite
```

---

## ⚙️ Como Executar a Aplicação

### Pré-requisitos
* Node.js instalado (versão 16 ou superior recomendada)
* Gerenciador de pacotes (NPM ou Yarn)

### Instalação

1. Clone o repositório para sua máquina local:
```bash
git clone [https://github.com/estevaoLL/NOME_DO_SEU_REPOSITORIO.git](https://github.com/estevaoLL/NOME_DO_SEU_REPOSITORIO.git)
cd NOME_DO_SEU_REPOSITORIO
```

2. Instale as dependências essenciais:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse a aplicação no seu navegador padrão através do link fornecido no terminal (geralmente `http://localhost:5173`).

---

## 🗄️ Entendendo a Persistência de Dados (Mock)

Diferente de sistemas com backend integrado, este projeto possui foco exclusivo na **Camada de Apresentação e Regras de Negócio**. 

Para permitir o uso pleno da plataforma, todos os dados foram "mockados" (simulados). 
* O arquivo `src/data/initialData.js` atua como o banco de dados.
* Sempre que a aplicação é recarregada, ela retorna ao estado inicial contido neste arquivo.
* Durante a navegação (em tempo de execução), o React mantém os estados ativos. Ou seja, se você comprar um curso ou marcar uma aula como concluída, o sistema registrará e atualizará os dados visualmente enquanto a aba estiver aberta.

---

## 👥 Equipe de Desenvolvimento

Projeto desenvolvido para a disciplina de Princípios de Engenharia de Software (Instituto Politécnico - Universidade do Estado do Rio de Janeiro).

* **Alunos Desenvolvedores:** Estevão Mello, Leonardo Mançano
* **Professor Orientador:** Anderson Namen
