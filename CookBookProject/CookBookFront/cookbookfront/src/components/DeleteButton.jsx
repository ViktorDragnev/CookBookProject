import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccountButton = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '1.5rem',
      border: '1px solid #ffcccc',
      borderRadius: '8px',
      backgroundColor: '#fff9f9'
    },
    heading: {
      color: '#d32f2f',
      marginTop: 0
    },
    button: {
      backgroundColor: '#d32f2f',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    buttonHover: {
      backgroundColor: '#b71c1c'
    },
    buttonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    },
    error: {
      color: '#d32f2f',
      marginTop: '1rem'
    },
    spinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '3px solid rgba(255,255,255,.3)',
      borderRadius: '50%',
      borderTopColor: 'white',
      animation: 'spin 1s ease-in-out infinite'
    },
    keyframes: `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `
  };

  const handleDeleteAccount = async () => {
    const token = sessionStorage.getItem('authToken');
    
    if (!token) {
      setError('You must be logged in to delete your account');
      return;
    }

    if (!window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await axios.delete('http://localhost:8090/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('loggedInUser');
        alert('Account deleted successfully!');
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account. Please try again.');
      console.error('Error deleting account:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles.keyframes;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Danger Zone</h3>
      <p>Permanently delete your account and all associated data.</p>
      
      <button 
        onClick={handleDeleteAccount}
        disabled={isDeleting}
        style={{
          ...styles.button,
          ...(isDeleting ? styles.buttonDisabled : {}),
          ':hover': !isDeleting ? styles.buttonHover : {}
        }}
      >
        {isDeleting ? (
          <>
            <span style={styles.spinner}></span> Deleting Account...
          </>
        ) : (
          'Delete My Account'
        )}
      </button>
      
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default DeleteAccountButton;