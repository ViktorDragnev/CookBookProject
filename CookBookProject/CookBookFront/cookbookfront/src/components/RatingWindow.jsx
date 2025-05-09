import React, { useState } from "react";
import axios from "axios";

const RatingWindow = ({ onClose, onSuccessfulSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const styles = {
    popup: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      zIndex: 1001,
      width: "320px",
      textAlign: "center",
    },
    title: {
      color: "#5a3921",
      marginBottom: "20px",
      fontSize: "1.2rem",
    },
    starsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      margin: "25px 0",
    },
    starButton: {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer",
      fontSize: "28px",
      padding: "0",
      margin: "0",
      transition: "transform 0.2s ease",
    },
    feedbackPrompt: {
      color: "black",
      margin: "15px 0",
      fontSize: "0.9rem",
      fontStyle: "italic",
    },
    feedbackTextarea: {
      width: "95%",
      backgroundColor: "white",
      color: "black",
      padding: "12px",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      resize: "vertical",
      minHeight: "80px",
      marginBottom: "15px",
      fontFamily: "inherit",
      fontSize: "0.9rem",
      transition: "border 0.3s ease",
      ":focus": {
        outline: "none",
        borderColor: "#c28c5c",
        boxShadow: "0 0 0 2px rgba(194, 140, 92, 0.2)",
      },
    },
    submitButton: {
      padding: "10px 24px",
      backgroundColor: "#c28c5c",
      color: "white",
      border: "none",
      borderRadius: "25px",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "500",
      boxShadow: "0 2px 8px rgba(194, 140, 92, 0.3)",
      transition: "all 0.3s ease",
      width: "100%",
    },
    highlight: {
      position: "absolute",
      background: "rgba(255,255,255,0.2)",
      width: "100%",
      height: "40px",
      left: "0",
      top: "-40px",
      transition: "all 0.3s ease",
    },
  };

  const handleSubmit = async () => {
    if (rating < 5 && !feedback.trim()) {
      alert("Please provide feedback for ratings less than 5 stars");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = sessionStorage.getItem("authToken");
      const ratingData = {
        value: rating,
        comment: rating < 5 ? feedback : null,
      };

      await axios.post("http://localhost:8090/api/ratings/add", ratingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setIsSubmitted(true);
      
      onSuccessfulSubmit();

      alert("Rating submitted successfully!");
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.popup}>
      <h3 style={styles.title}>Rate Your Experience</h3>

      <div style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            style={styles.starButton}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(rating)}
            aria-label={`Rate ${star} star`}
          >
            <span
              style={{
                color: star <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
            >
              {star <= (hover || rating) ? "★" : "☆"}
            </span>
          </button>
        ))}
      </div>

      {rating > 0 && rating < 5 && (
        <>
          <p style={styles.feedbackPrompt}>
            What could we improve? (Required for ratings less than 5 stars)
          </p>
          <textarea
            style={styles.feedbackTextarea}
            placeholder="Please share your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </>
      )}

      <button
        onClick={handleSubmit}
        style={styles.submitButton}
        className="submit-rating-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : isSubmitted ? "Rating Submitted!" : "Submit Rating"}
        <span style={styles.highlight} className="button-highlight"></span>
      </button>

      <style>
        {`
          .submit-rating-button:hover {
            background: #b07d4b;
            box-shadow: 0 4px 12px rgba(194, 140, 92, 0.4);
          }
          .submit-rating-button:hover .button-highlight {
            top: 0;
          }
          button[type="button"]:hover {
            transform: scale(1.2);
          }
          textarea:focus {
            outline: none;
            border-color: #c28c5c;
            box-shadow: 0 0 0 2px rgba(194, 140, 92, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default RatingWindow;
