import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(l => l.code === language);

  const handleSelect = (langCode) => {
    setLanguage(langCode);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-[#5A6C7D] hover:bg-[#F0F7FF] transition-all text-sm"
        >
          <Globe className="w-4 h-4" />
          <span>{currentLanguage?.flag} {currentLanguage?.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl bg-white border border-[#D0E1F9] shadow-lg min-w-[150px] z-[100]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => handleSelect(lang.code)}
            className={`cursor-pointer px-3 py-2 text-sm ${language === lang.code ? 'bg-[#F0F7FF] text-[#0A2463]' : 'text-[#5A6C7D] hover:bg-[#F0F7FF]'}`}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

