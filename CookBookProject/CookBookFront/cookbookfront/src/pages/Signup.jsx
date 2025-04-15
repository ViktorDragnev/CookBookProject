import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8090/api/auth/register', {
        username,
        password,
      });
      alert('Account created successfully! Please log in.');
      window.location.href = '/login';
    } catch (err) {
      setError('Error creating account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          padding: '2.5rem',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '600', 
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Create an Account
          </h2>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>
            Sign up to get started
          </p>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#ffebee',
            color: '#d32f2f',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              color: '#333',
              fontWeight: '500'
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                backgroundColor:'white',
                color:"black",
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              color: '#333',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor:'white',
                color:"black",
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              color: '#333',
              fontWeight: '500'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                backgroundColor:'white',
                color:"black",
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e0e0e0',
              backgroundColor: '#c28c5c',
              color: 'white',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              boxSizing: 'border-box',
              transition: 'background-color 0.2s',
            }}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.5rem', 
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          Already have an account?{' '}
          <a 
            href="/login" 
            style={{ 
              color: '#c28c5c', 
              textDecoration: 'none',
              fontWeight: '500',
              ':hover': { textDecoration: 'underline' }
            }}
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
