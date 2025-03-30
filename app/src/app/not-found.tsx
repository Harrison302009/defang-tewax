"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Oops! Page Not Found</h1>
      <p style={styles.message}>
        We couldn&apos;t find the page you&apos;re looking for. It might have been removed or the link is broken.
      </p>
      <button style={styles.button} onClick={() => router.push('/')}>
        Go Back to Home
      </button>
    </div>
  );
};


import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '600px',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default NotFound;
