import React, { useState } from 'react';

const ReviewModal = ({ course, onClose, onSubmitReview }) => {
  if (!course) return null;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, selecione uma nota.');
      return;
    }
    onSubmitReview({
      courseId: course.id,
      rating: rating,
      text: comment,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Avaliar o Curso: {course.title}</h2>
          <button onClick={onClose} className="modal-close">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Sua nota:</label>
            <div 
              className="star-rating" 
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map(star => (
                <span 
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'selected' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="review-comment">Seu comentário (opcional):</label>
            <textarea 
              id="review-comment" 
              rows="5" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Fale sobre sua experiência com o curso..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success" style={{width: '100%'}}>
            Enviar Avaliação
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;