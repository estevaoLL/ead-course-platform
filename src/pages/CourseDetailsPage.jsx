import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetailsPage = ({ navigateTo, allCourses, contentDB, addToCart }) => {
    const { id } = useParams(); // Pega o ID da URL (ex: /curso/1)
    const courseId = parseInt(id);

    // Busca o curso e o conteúdo baseados no ID
    const course = allCourses.find(c => c.id === courseId);
    const content = contentDB[courseId];

    if (!course) {
      return (
        <div className="container" style={{ marginTop: '30px' }}>
          <h2>Curso não encontrado</h2>
          <button className="btn" onClick={() => navigateTo('home')}>Voltar para Home</button>
        </div>
      );
    }
    
    const courseContent = content || []; 
  
    return (
      <>
        <section className="course-header">
          <div className="container">
            <h1>{course.title}</h1>
            <p>Aprenda os fundamentos da programação com exemplos práticos e projetos reais</p>
            <div className="course-meta">
              <div>
                <div>Instrutor: {course.instructor}</div>
                <div>{course.rating} ★ ({Math.floor(Math.random() * 2000 + 500)} avaliações)</div>
              </div>
              <div className="course-actions">
                <button className="btn" onClick={() => addToCart(course)}>
                  Adicionar ao Carrinho
                </button>
                <button className="btn btn-accent" onClick={() => { addToCart(course); navigateTo('cart'); }}>
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>
        </section>
  
        <div className="container">
          <div className="course-content">
            <div className="course-main">
              <div className="card">
                <h2>Descrição do Curso</h2>
                <p>{course.description || "Este curso apresenta os conceitos fundamentais da programação, utilizando uma linguagem moderna e acessível para iniciantes."}</p>
                
                <h3 style={{ marginTop: '20px' }}>O que você aprenderá</h3>
                <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                  <li>Fundamentos da lógica de programação</li>
                  <li>Estruturas de dados básicas</li>
                  <li>Controle de fluxo e loops</li>
                  <li>Resolução de problemas com código</li>
                </ul>
              </div>
              
              <div className="card">
                <h2>Conteúdo do Curso</h2>
                {courseContent.length === 0 ? (
                  <p>Nenhum conteúdo adicionado a este curso ainda.</p>
                ) : (
                  courseContent.map((module) => (
                    <div className="module" key={module.id}>
                      <div className="module-header">{module.title}</div>
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div className="lesson" key={lesson.id}>
                          <span>{lessonIndex + 1}. {lesson.title}</span>
                          <span>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
              
              <div className="card">
                <h2>Avaliações</h2>
                <div className="review">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong>Carlos Mendes</strong>
                    <span>5 ★</span>
                  </div>
                  <p>Excelente curso para iniciantes. O professor explica de forma clara e objetiva.</p>
                </div>
              </div>
            </div>
            
            <div className="course-sidebar">
              <div className="card">
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="course-preview-image" 
                  onError={(e) => e.target.src = 'https://placehold.co/600x400/2c3e50/ffffff?text=Preview+Indisponível'}
                />
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                  <button 
                    className="btn btn-accent" 
                    style={{ width: '100%' }} 
                    onClick={() => { addToCart(course); navigateTo('cart'); }}
                  >
                    {course.price === 0 ? 'Inscrever-se Agora' : `Comprar Agora - R$ ${course.price.toFixed(2)}`}
                  </button>
                </div>
                <div style={{ marginTop: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Duração:</span>
                    <span>{courseContent.length} Módulos</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Nível:</span>
                    <span>{course.level}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Certificado:</span>
                    <span>Sim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default CourseDetailsPage;