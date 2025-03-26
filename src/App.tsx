import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { QueueProvider } from './context/QueueContext';
import CustomerView from './pages/CustomerView';
import AdminView from './pages/AdminView';

function App() {
  // For demo purposes, we'll use a URL parameter to switch between views
  const isAdmin = new URLSearchParams(window.location.search).get('view') === 'admin';

  return (
    <ThemeProvider>
      <QueueProvider>
        {isAdmin ? <AdminView /> : <CustomerView />}
      </QueueProvider>
    </ThemeProvider>
  );
}

export default App;