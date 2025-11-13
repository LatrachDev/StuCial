import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { ServicesPage } from './components/ServicesPage';
import { ProductsPage } from './components/ProductsPage';
import { DocumentsPage } from './components/DocumentsPage';
import { ReclamationPage } from './components/ReclamationPage';
import { WhatDocsINeedPage } from './components/WhatDocsINeedPage';
import { ProfilePage } from './components/ProfilePage';
import { Sidebar } from './components/Sidebar';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'services':
        return <ServicesPage />;
      case 'products':
        return <ProductsPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'reclamation':
        return <ReclamationPage />;
      case 'what-docs':
        return <WhatDocsINeedPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen bg-[#F5FEFF] flex">
          <Sidebar 
            currentPage={currentPage} 
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
          <div className="flex-1 overflow-auto">
            {renderPage()}
          </div>
        </div>
      )}
    </LanguageProvider>
  );
}

