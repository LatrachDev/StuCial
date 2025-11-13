import { Briefcase, ShoppingBag, FileText, MessageSquareWarning, HelpCircle, Home, LogOut, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import logo from '../assets/logo.png';

export function Sidebar({ currentPage, onNavigate, onLogout }) {
  const { t } = useLanguage();
  
  const menuItems = [
    { id: 'dashboard', icon: Home, label: t('nav.dashboard') },
    { id: 'services', icon: Briefcase, label: t('nav.services') },
    { id: 'products', icon: ShoppingBag, label: t('nav.products') },
    { id: 'documents', icon: FileText, label: t('nav.documents') },
    { id: 'what-docs', icon: HelpCircle, label: t('nav.whatDocs') },
    { id: 'reclamation', icon: MessageSquareWarning, label: t('nav.reclamation') },
    { id: 'profile', icon: User, label: t('nav.profile') },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#AAC0E1] h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-[#AAC0E1]">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Stucial Logo" 
            className="w-12 h-12 object-contain rounded-lg"
          />
          <div>
            <h1 className="text-[#0E2F76]">Stucial</h1>
            <p className="text-xs text-[#5A6C7D]">{t('nav.studentNetwork')}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#0E2F76] to-[#1a4a9e] text-white shadow-md'
                  : 'text-[#5A6C7D] hover:bg-[#F5FEFF]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#AAC0E1] space-y-2">
        <LanguageSwitcher />
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#AAC0E1] hover:bg-[#F5FEFF] transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">{t('nav.logout')}</span>
          </button>
        )}
      </div>
    </aside>
  );
}

