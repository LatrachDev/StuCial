import { useState } from 'react';
import { Feed } from './Feed';
import { ChatPanel } from './ChatPanel';
import { Button } from './ui/button';
import { MessageSquare, MessageSquareOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Dashboard() {
  const { t } = useLanguage();
  const [showMessages, setShowMessages] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
      <div className={showMessages ? "lg:col-span-8" : "lg:col-span-12"}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-[#0E2F76]">{t('nav.dashboard')}</h1>
          </div>
          <Button
            onClick={() => setShowMessages(!showMessages)}
            variant="outline"
            className="border-[#AAC0E1] text-[#0E2F76] hover:bg-[#F5FEFF] rounded-xl"
          >
            {showMessages ? (
              <>
                <MessageSquareOff className="w-4 h-4 mr-2" />
                {t('dashboard.hideMessages')}
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-2" />
                {t('dashboard.showMessages')}
              </>
            )}
          </Button>
        </div>
        <Feed />
      </div>

      {showMessages && (
        <div className="lg:col-span-4">
          <ChatPanel />
        </div>
      )}
    </div>
  );
}

