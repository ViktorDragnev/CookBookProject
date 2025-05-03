import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
    <img 
      src="/Preview.png"
      alt="Recipe App Logo"
      style={{
        height: '60px',
        width: 'auto',
        marginRight: '10px'
      }}
    />
  </Link>
);

export default Logo;
