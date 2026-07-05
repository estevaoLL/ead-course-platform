import React, { useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import CreateCourseForm from '../components/CreateCourseForm.jsx';

const ProfessorDashboardPage = ({ 
  navigateTo, 
  handleCreateCourse, 
  allCourses, 
  handleDeleteCourse,
  questions,
  onAnswerQuestion,
  activeTab: initialTab
}) => {
  // Aba padrão inicia em 'my-courses' para já mostrar conteúdo útil
  const [activeTab, setActiveTab] = useState(initialTab || 'my-courses');
  const [replyText, setReplyText] = useState({}); 
  const [selectedQuestion, setSelectedQuestion] = useState(null); 

  const handleReplyChange = (questionId, text) => {
    setReplyText(prev => ({ ...prev, [questionId]: text }));
  };

  const handleReplySubmit = (questionId) => {
    if (!replyText[questionId]) return;
    onAnswerQuestion(questionId, replyText[questionId]);
    setReplyText(prev => ({ ...prev, [questionId]: '' })); 
    setSelectedQuestion(null); 
  };
  
  // Filtra cursos do professor logado (incluindo o João Silva do mock)
  const myCourses = allCourses.filter(c => c.instructor === 'Professor (Logado)' || c.instructor === 'João Silva');
  
  const unansweredQuestions = questions.filter(q => !q.answer);

  // Função para itens não implementados (apenas visual)
  const handleNotImplemented = (e) => {
    e.preventDefault();
    alert("Este recurso é apenas demonstrativo na interface.");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-courses':
        return (
          <>
            <h2>Meus Cursos</h2>
            <div className="course-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'}}>
              {myCourses.length > 0 ? (
                myCourses.map(course => (
                  <CourseCard key={course.id} course={course} navigateTo={navigateTo} />
                ))
              ) : (
                <div className="card">
                    <p>Você ainda não criou nenhum curso.</p>
                    <button className="btn btn-accent" onClick={() => setActiveTab('new-course')}>Criar Primeiro Curso</button>
                </div>
              )}
            </div>
          </>
        );
      case 'new-course':
        return (
          <>
            <h2>Criar Novo Curso</h2>
            <p>Preencha as informações conforme o Caso de Uso: Criar Curso.</p>
            <CreateCourseForm onCourseCreate={handleCreateCourse} />
          </>
        );
      case 'manage-courses':
        return (
          <>
            <h2>Gerenciar Conteúdo</h2>
            <p>Selecione um curso para editar módulos e aulas.</p>
            <ul style={{listStyle: 'none', padding: 0}}>
              {myCourses.map(course => (
                <li key={course.id} className="card" style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '15px'
                }}>
                  <div>
                    <strong>{course.title}</strong>
                  </div>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button className="btn" style={{backgroundColor: 'var(--primary-light)'}} onClick={() => navigateTo('editCourseMetadata', course.id)}>
                      Editar Detalhes
                    </button>
                    <button className="btn" onClick={() => navigateTo('courseEditor', course.id)}>
                      Editar Conteúdo
                    </button>
                    <button className="btn-danger" onClick={() => handleDeleteCourse(course.id)}>
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        );
      case 'questions':
        return (
          <>
            <h2>Dúvidas dos Alunos</h2>
            {unansweredQuestions.length === 0 ? (
              <p>Nenhuma dúvida pendente.</p>
            ) : (
              <div className="card" style={{padding: '0'}}>
                {unansweredQuestions.map(q => (
                    <div key={q.id} className={`question-list-item ${selectedQuestion === q.id ? 'active' : ''}`}>
                      <div onClick={() => setSelectedQuestion(selectedQuestion === q.id ? null : q.id)}>
                        <div className="question-header">
                          <div className="question-author">{q.author}</div>
                          <div className="question-date">{q.date}</div>
                        </div>
                        <p>{q.text}</p>
                      </div>
                      
                      {selectedQuestion === q.id && (
                        <div className="question" style={{padding: '15px 0 0 0', border: 'none'}}>
                          <div className="form-group">
                            <textarea 
                              rows="3" 
                              placeholder="Escreva sua resposta..."
                              value={replyText[q.id] || ''}
                              onChange={(e) => handleReplyChange(q.id, e.target.value)}
                            ></textarea>
                          </div>
                          <button className="btn btn-accent" onClick={() => handleReplySubmit(q.id)}>
                            Responder
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </>
        );
      default:
        return <h2>Meus Cursos</h2>;
    }
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="sidebar">
          <h3>Painel do Instrutor</h3>
          <ul className="sidebar-menu">
            {/* Itens VISUAIS (Não funcionais para economizar código) */}
            <li><a href="#" onClick={handleNotImplemented} style={{opacity: 0.7}}>Visão Geral</a></li>
            
            {/* Itens FUNCIONAIS */}
            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('my-courses'); }} className={activeTab === 'my-courses' ? 'active' : ''}>Meus Cursos</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('new-course'); }} className={activeTab === 'new-course' ? 'active' : ''}>Criar Novo Curso</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('manage-courses'); }} className={activeTab === 'manage-courses' ? 'active' : ''}>Gerenciar Cursos</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('questions'); }} className={activeTab === 'questions' ? 'active' : ''}>Dúvidas</a></li>
            
            {/* Itens VISUAIS */}
            <li><a href="#" onClick={handleNotImplemented} style={{opacity: 0.7}}>Análises</a></li>
            <li><a href="#" onClick={handleNotImplemented} style={{opacity: 0.7}}>Configurações</a></li>
          </ul>
        </div>
        <div className="dashboard-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboardPage;