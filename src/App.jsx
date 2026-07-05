import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppLogic } from './hooks/useAppLogic.js';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ReviewModal from './components/ReviewModal.jsx';

import HomePage from './pages/HomePage.jsx';
import CourseDetailsPage from './pages/CourseDetailsPage.jsx';
import LessonPlayerPage from './pages/LessonPlayerPage.jsx';
import ProfessorDashboardPage from './pages/ProfessorDashboardPage.jsx';
import CourseEditorPage from './pages/CourseEditorPage.jsx';
import EditCourseMetadataPage from './pages/EditCourseMetadataPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CartPage from './pages/CartPage.jsx';
import StudentDashboardPage from './pages/StudentDashboardPage.jsx';

const App = () => {
  const { state, controllers, actions } = useAppLogic();
  const [reviewingCourse, setReviewingCourse] = useState(null);

  return (
    <>
      <Header navigateTo={actions.navigateTo} cartItemCount={state.cart.length} searchTerm={state.searchTerm} setSearchTerm={actions.setSearchTerm} suggestions={state.autocompleteSuggestions} onSuggestionClick={(c) => {actions.setSearchTerm(''); actions.navigateTo('details', c.id)}} />
      
      <main>
        <Routes>
            <Route path="/" element={<HomePage navigateTo={actions.navigateTo} courses={state.filteredCourses} filters={state.filters} setFilters={actions.setFilters} />} />

            <Route path="/curso/:id" element={<CourseDetailsPage navigateTo={actions.navigateTo} allCourses={state.allCourses} contentDB={state.coursesContentDB} addToCart={actions.addToCart} reviews={state.reviewsDB} />} />
            
            <Route path="/aula/:courseId" element={<LessonPlayerPage navigateTo={actions.navigateTo} contentDB={state.coursesContentDB} progressDB={state.courseProgress} onProgressUpdate={actions.handleProgressUpdate} controller={controllers.controladorAula} questions={state.questionsDB} onAskQuestion={actions.handleAskQuestion} />} />
            
            <Route path="/editor-curso/:id" element={<CourseEditorPage navigateTo={actions.navigateTo} allCourses={state.allCourses} contentDB={state.coursesContentDB} onUpdateContent={actions.handleUpdateCourseContent} />} />
            
            <Route path="/editar-detalhes/:id" element={<EditCourseMetadataPage navigateTo={actions.navigateTo} allCourses={state.allCourses} onUpdateCourse={actions.handleUpdateCourseMetadata} />} />

            <Route path="/painel-instrutor" element={<ProfessorDashboardPage navigateTo={actions.navigateTo} handleCreateCourse={actions.handleCreateCourse} allCourses={state.allCourses} handleDeleteCourse={actions.handleDeleteCourse} questions={state.questionsDB} onAnswerQuestion={actions.handleAnswerQuestion} coursesContentDB={state.coursesContentDB} />} />
            
            <Route path="/painel-aluno" element={<StudentDashboardPage navigateTo={actions.navigateTo} purchasedCourses={state.purchasedCourses} courseProgress={state.courseProgress} coursesContentDB={state.coursesContentDB} onReviewClick={setReviewingCourse} />} />
            
            <Route path="/login" element={<LoginPage navigateTo={actions.navigateTo} />} />
            
            <Route path="/carrinho" element={<CartPage cart={state.cart} navigateTo={actions.navigateTo} removeFromCart={actions.removeFromCart} handlePurchase={actions.handlePurchase} />} />
        </Routes>
      </main>

      <Footer />
      {reviewingCourse && <ReviewModal course={reviewingCourse} onClose={() => setReviewingCourse(null)} onSubmitReview={(r) => actions.handleSubmitReview(r, setReviewingCourse)} />}
    </>
  );
};

export default App;