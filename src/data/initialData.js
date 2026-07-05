export const initialCourses = [
  { 
    id: 1, 
    title: 'Introdução à Programação', 
    instructor: 'João Silva', 
    price: 99.90, 
    level: 'Iniciante', 
    rating: 4.7, 
    imageUrl: 'https://placehold.co/600x400/2c3e50/ffffff?text=Programação', 
    type: 'online' 
  },
  { 
    id: 2, 
    title: 'Design UX/UI Avançado', 
    instructor: 'Maria Santos', 
    price: 149.90, 
    level: 'Avançado', 
    rating: 4.8, 
    imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=UX/UI', 
    type: 'online' 
  }
];

export const initializeContentDB = () => {
  const db = {};
  // Conteúdo padrão para demonstração
  const defaultContent = [
      { 
        id: 'm1', 
        title: 'Módulo 1: Introdução', 
        lessons: [
          // URL do vídeo profissional da Google (Sem coelhos!)
          { id: '1-1', title: 'O que é programação?', duration: '15 min', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { id: '1-2', title: 'Primeiros passos', duration: '20 min', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
        ] 
      }
  ];
  
  initialCourses.forEach(course => {
    db[course.id] = JSON.parse(JSON.stringify(defaultContent));
  });
  return db;
};

export const initialQuestions = [
  { id: 1, courseId: 1, lessonId: '1-1', author: 'Maria Silva', date: 'Ontem', text: 'Dúvida sobre variáveis.', answer: { author: 'João', date: 'Hoje', text: 'Resposta do professor.' } }
];

export const initialReviews = [
    { id: 1, courseId: 1, author: 'Carlos', rating: 5, text: 'Ótimo curso!' },
    { id: 2, courseId: 1, author: 'Ana', rating: 4, text: 'Gostei muito.' }
];

export const calculateProgress = (courseId, courseProgress, content) => {
    const data = courseProgress[courseId];
    const list = content || [];
    const total = list.reduce((acc, m) => acc + m.lessons.filter(l => l.type === 'video').length, 0);
    if (!data || total === 0) return 0;
    const completed = Array.from(data.completed).filter(lid => {
        for (const m of list) if (m.lessons.find(l => l.id === lid && l.type === 'video')) return true;
        return false;
    }).length;
    return Math.round((completed / total) * 100);
};