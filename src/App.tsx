import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { QueueProvider } from './context/QueueContext';
import { LanguageProvider } from './context/LanguageContext';
import CustomerView from './pages/CustomerView';
import AdminView from './pages/AdminView';

function App() {
  const isAdmin = new URLSearchParams(window.location.search).get('view') === 'admin';

  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueueProvider>
          {isAdmin ? <AdminView /> : <CustomerView />}
        </QueueProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;