import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- O Router entra aqui
import { initialCourses, initializeContentDB, initialQuestions, initialReviews } from '../data/initialData.js';
import { ControladorCurso } from '../controllers/ControladorCurso.js';
import { ControladorAula } from '../controllers/ControladorAula.js';

export const useAppLogic = () => {
    const navigate = useNavigate(); // Hook do Router

    // --- ESTADO GLOBAL ---
    const [allCourses, setAllCourses] = useState(initialCourses);
    const [coursesContentDB, setCoursesContentDB] = useState(initializeContentDB);
    const [questionsDB, setQuestionsDB] = useState(initialQuestions);
    const [reviewsDB, setReviewsDB] = useState(initialReviews);
    const [cart, setCart] = useState([]);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [courseProgress, setCourseProgress] = useState({});

    // Filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ level: 'all', price: 'all', rating: 'all' });

    // --- CONTROLADORES ---
    const controladorCurso = useMemo(() => 
        new ControladorCurso(allCourses, setAllCourses, setCoursesContentDB), 
    [allCourses]);

    const controladorAula = useMemo(() => 
        new ControladorAula(courseProgress, setCourseProgress), 
    [courseProgress]);

    // --- FUNÇÃO DE NAVEGAÇÃO HÍBRIDA (O TRUQUE) ---
    // Mantemos a assinatura antiga para não quebrar os botões, mas usamos navigate() por dentro
    const navigateTo = (page, data = null) => {
        switch(page) {
            case 'home': navigate('/'); break;
            case 'details': navigate(`/curso/${data}`); break; // Passa ID na URL
            case 'player': navigate(`/aula/${data}`); break;
            case 'dashboard': navigate('/painel-instrutor'); break;
            case 'courseEditor': navigate(`/editor-curso/${data}`); break;
            case 'editCourseMetadata': navigate(`/editar-detalhes/${data}`); break;
            case 'login': navigate('/login'); break;
            case 'cart': navigate('/carrinho'); break;
            case 'studentDashboard': navigate('/painel-aluno'); break;
            default: navigate('/');
        }
        window.scrollTo(0, 0);
    };

    const actions = {
        handleCreateCourse: (dados) => {
            const novo = controladorCurso.validarECriarCurso(dados);
            if (novo) {
                setCoursesContentDB(prev => ({ ...prev, [novo.id]: [] }));
                navigateTo('courseEditor', novo.id);
            }
        },
        handleDeleteCourse: (id) => controladorCurso.excluirCurso(id),
        handleUpdateCourseContent: (cId, content) => controladorCurso.atualizarConteudo(cId, content),
        handleProgressUpdate: (cId, data) => setCourseProgress(prev => ({...prev, [cId]: {...(prev[cId]||{completed:new Set(),unlocked:new Set([0])}), ...data}})),
        addToCart: (course) => {
            if (purchasedCourses.find(c => c.id === course.id)) return alert("Já possui!");
            if (cart.find(c => c.id === course.id)) return alert("Já no carrinho.");
            setCart(prev => [...prev, course]);
        },
        removeFromCart: (id) => setCart(prev => prev.filter(c => c.id !== id)),
        handlePurchase: () => {
            if (cart.length === 0) return alert("Vazio!");
            setPurchasedCourses(prev => [...prev, ...cart.filter(c => !prev.find(p => p.id === c.id))]);
            setCart([]);
            alert('Sucesso!');
            navigateTo('studentDashboard');
        },
        handleUpdateCourseMetadata: (cId, data) => setAllCourses(prev => prev.map(c => c.id === cId ? data : c)),
        handleAskQuestion: (q) => setQuestionsDB(prev => [{...q, id: Date.now(), date: 'Hoje', answer: null}, ...prev]),
        handleAnswerQuestion: (qId, text) => setQuestionsDB(prev => prev.map(q => q.id === qId ? {...q, answer: {author: 'Prof', date: 'Hoje', text}} : q)),
        handleSubmitReview: (r, cb) => { setReviewsDB(prev => [{...r, id: Date.now(), author: "Aluno"}, ...prev]); cb(null); },
        setFilters,
        setSearchTerm,
        navigateTo
    };

    // View Logic
    const autocompleteSuggestions = useMemo(() => {
        if (!searchTerm) return [];
        return allCourses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,5);
    }, [searchTerm, allCourses]);

    const filteredCourses = useMemo(() => {
        return allCourses.filter(c => {
            if(searchTerm && !c.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if(filters.level !== 'all' && c.level !== filters.level) return false;
            if(filters.price !== 'all') {
                if(filters.price === 'gratuito' && c.price !== 0) return false;
                if(filters.price === 'ate50' && (c.price === 0 || c.price > 50)) return false;
                if(filters.price === '50a100' && (c.price <= 50 || c.price > 100)) return false;
                if(filters.price === 'acima100' && c.price <= 100) return false;
            }
            if(filters.rating !== 'all' && c.rating < parseFloat(filters.rating)) return false;
            return true;
        });
    }, [allCourses, searchTerm, filters]);

    return {
        state: { 
            allCourses, coursesContentDB, questionsDB, reviewsDB, cart, purchasedCourses, courseProgress, 
            searchTerm, filters, filteredCourses, autocompleteSuggestions 
        },
        controllers: { controladorAula },
        actions
    };
};