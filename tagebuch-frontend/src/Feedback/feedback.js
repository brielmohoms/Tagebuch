import React, { useState, useEffect } from 'react';
import { submitFeedback, fetchPublicFeedback } from '../services/api';
import './feedback.css';

const Feedback = () => {
  const [comment, setComment] = useState('');
  // ACHTUNG: Hier rating = 1, statt 0!
  const [rating, setRating] = useState(1);
  const [isPublic, setIsPublic] = useState(false);
  const [publicFeedback, setPublicFeedback] = useState([]);

  useEffect(() => {
    const loadPublicFeedback = async () => {
      try {
        const feedbacks = await fetchPublicFeedback();
        setPublicFeedback(feedbacks);
      } catch (err) {
        console.error(err);
      }
    };
    loadPublicFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating && !comment) {
      alert('Please provide either a rating or a comment.');
      return;
    }
    const feedback = { rating, comment, isPublic };
    try {
      await submitFeedback(feedback);
      alert('Feedback submitted!');
      setComment('');
      setRating(1);   // Wieder auf 1 setzen
      setIsPublic(false);

      // Liste neu laden
      const updatedFeedbacks = await fetchPublicFeedback();
      setPublicFeedback(updatedFeedbacks);
    } catch (error) {
      alert('Failed to submit feedback. Please try again.');
      console.error(error);
    }
  };

  const renderStars = (num) => {
    return Array(num).fill('★').join('');
  };

  return (
    <div className="feedback-container">
      <h2>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <textarea
          placeholder="Write your feedback here (optional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="star-rating">
          <p>Rating:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'selected' : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Make this feedback public
        </label>
        <button type="submit">Submit Feedback</button>
      </form>

      <h2>Public Feedback</h2>
      <ul className="feedback-list">
        {publicFeedback.map((fb) => (
          <li key={fb._id}>
            {fb.kommentar && <p>{fb.kommentar}</p>}
            {fb.bewertung > 0 && (
              <p className="stars">{renderStars(fb.bewertung)}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
