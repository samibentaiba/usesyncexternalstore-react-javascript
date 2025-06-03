
import React, { useSyncExternalStore } from 'react';

// External store to manage theme
let currentTheme = 'light';
const listeners = new Set();

const themeStore = {
  getSnapshot: () => currentTheme,
  subscribe: (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  toggleTheme: () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    listeners.forEach((cb) => cb());
  },
};

// Custom Hook
function useTheme() {
  return useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot);
}

// Main App Component
export default function App() {
  const theme = useTheme();

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: theme === 'dark' ? '#111' : '#f9f9f9',
        color: theme === 'dark' ? '#f9f9f9' : '#111',
        minHeight: '100vh',
        transition: 'all 0.3s ease',
      }}
    >
      <h1>useSyncExternalStore Theme Demo</h1>
      <p>
        Current Theme: <strong>{theme}</strong>
      </p>
      <button
        onClick={themeStore.toggleTheme}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: theme === 'dark' ? '#333' : '#ddd',
          color: theme === 'dark' ? '#fff' : '#000',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

