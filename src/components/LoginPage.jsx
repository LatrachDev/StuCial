import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import logo from '../assets/logo.png';

export function LoginPage({ onLogin }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="h-screen overflow-hidden flex  lg:flex-row">
      {/* Left side - Background image */}
      <div className="hidden lg:flex lg:w-1/2 lg:order-1 relative overflow-hidden h-full">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1647755154819-ea9d48b0eb8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMHVuaXZlcnNpdHklMjBhcmNoaXRlY3R1cmUlMjBibHVlfGVufDF8fHx8MTc2Mjk4Mjg0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="University background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E2F76]/90 to-[#AAC0E1]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <img 
            src={logo} 
            alt="Stucial Logo" 
            className="w-24 h-24 mb-6 object-contain rounded-xl drop-shadow-lg"
          />
          <h1 className="text-5xl mb-4 text-center">{t('login.title')}</h1>
          <p className="text-xl text-center max-w-md">
            {t('login.subtitle')}
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 lg:order-2 flex items-center justify-center bg-[#F5FEFF] relative h-full overflow-y-auto">
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>
        
        <div className="w-full max-w-md px-4 py-6 lg:py-8">
          <div className="lg:hidden flex flex-col items-center mb-6">
            <img 
              src={logo} 
              alt="Stucial Logo" 
              className="w-16 h-16 mb-3 object-contain rounded-lg"
            />
            <h1 className="text-3xl text-[#0E2F76] mb-2">{t('login.title')}</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl text-[#0E2F76] mb-2">{t('login.welcomeBack')}</h2>
            <p className="text-[#5A6C7D] mb-6 lg:mb-8 text-sm lg:text-base">{t('login.signInMessage')}</p>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div>
                <Label htmlFor="email" className="text-[#0E2F76] text-sm">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 border-[#AAC0E1] focus:border-[#AAC0E1] focus:ring-[#AAC0E1] h-10 lg:h-11"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#0E2F76] text-sm">{t('login.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 border-[#AAC0E1] focus:border-[#AAC0E1] focus:ring-[#AAC0E1] h-10 lg:h-11"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs lg:text-sm">
                <label className="flex items-center text-[#5A6C7D]">
                  <input type="checkbox" className="mr-2 rounded border-[#AAC0E1]" />
                  {t('login.rememberMe')}
                </label>
                <a href="#" className="text-[#AAC0E1] hover:text-[#0E2F76]">
                  {t('login.forgotPassword')}
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0E2F76] hover:bg-[#1a4a9e] text-white rounded-xl py-5 lg:py-6 text-sm lg:text-base"
              >
                {t('login.signIn')}
              </Button>
            </form>

            <div className="mt-4 lg:mt-6 text-center">
              <p className="text-[#5A6C7D] text-sm">
                {t('login.noAccount')}{' '}
                <a href="#" className="text-[#AAC0E1] hover:text-[#0E2F76]">
                  {t('login.register')}
                </a>
              </p>
            </div>
          </div>

          <p className="mt-4 lg:mt-6 text-center text-xs lg:text-sm text-[#5A6C7D]">
            {t('login.footer')}
          </p>
        </div>
      </div>
    </div>
  );
}

