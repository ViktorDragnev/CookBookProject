import React, { useState, useEffect } from 'react';
import RatingWindow from './RatingWindow';
import axios from 'axios';

const RatingButton = () => {
  const [showRating, setShowRating] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRatingStatus = async () => {
      try {
        const authToken = sessionStorage.getItem('authToken');
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        
        if (authToken && loggedInUser) {
          const response = await axios.get('http://localhost:8090/api/ratings', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          
          setShowButton(response.status === 200);
        } else {
          setShowButton(false);
        }
      } catch (error) {
        setShowButton(error.response?.status !== 403);
      } finally {
        setIsLoading(false);
      }
    };

    checkRatingStatus();
  }, []);

  const handleSuccessfulSubmit = () => {
    setShowButton(false);
  };

  const styles = {
    button: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      padding: '10px 24px',
      backgroundColor: '#c28c5c',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '500',
      boxShadow: '0 2px 8px rgba(194, 140, 92, 0.3)',
      transition: 'all 0.3s ease',
      zIndex: 1000
    },
    highlight: {
      position: 'absolute',
      background: 'rgba(255,255,255,0.2)',
      width: '100%',
      height: '40px',
      left: '0',
      top: '-40px',
      transition: 'all 0.3s ease'
    }
  };

   if (isLoading) {
    return null;
  }

  if (!showButton) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .rate-button:hover {
            background: #b07d4b;
            box-shadow: 0 4px 12px rgba(194, 140, 92, 0.4);
            transform: translateY(-2px);
          }
          .rate-button:hover .button-highlight {
            top: 0;
          }
        `}
      </style>

      <button
        onClick={() => setShowRating(true)}
        style={styles.button}
        className="rate-button"
      >
        Rate Us
        <span 
          style={styles.highlight}
          className="button-highlight"
        ></span>
      </button>
      
      {showRating && (
        <RatingWindow 
          onClose={() => setShowRating(false)} 
          onSuccessfulSubmit={handleSuccessfulSubmit}
        />
      )}
    </>
  );
};

export default RatingButton;