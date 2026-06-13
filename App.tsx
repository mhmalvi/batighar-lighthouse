
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Feed } from './components/Feed';
import { Marketplace } from './components/Marketplace';
import { ImpactHub } from './components/ImpactHub';
import { LiveStream } from './components/LiveStream';
import { Messages } from './components/Messages';
import { Profile } from './components/Profile';
import { Explore } from './components/Explore';
import { Para } from './components/Para';
import { Games } from './components/Games';
import { Reels } from './components/Reels';
import { ChhobirGhor } from './components/ChhobirGhor';
import { View, Language } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [language, setLanguage] = useState<Language>('EN');

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Feed language={language} />;
      case View.MARKET:
        return <Marketplace language={language} />;
      case View.IMPACT:
        return <ImpactHub language={language} />;
      case View.LIVE:
        return <LiveStream language={language} />;
      case View.REELS:
        return <Reels language={language} />;
      case View.EVENTS:
        // Reusing Explore or separate component if needed, keeping simple for now
        return <Explore language={language} />;
      case View.MESSAGES:
        return <Messages language={language} />;
      case View.PROFILE:
        return <Profile language={language} />;
      case View.EXPLORE:
        return <Explore language={language} onGameClick={() => setCurrentView(View.GAMES)} onGalleryClick={() => setCurrentView(View.CHHOBIR_GHOR)} />;
      case View.PARA:
        return <Para language={language} />;
      case View.GAMES:
        return <Games language={language} />;
      case View.CHHOBIR_GHOR:
        return <ChhobirGhor language={language} />;
      default:
        return <Feed language={language} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView} language={language} setLanguage={setLanguage}>
      {renderView()}
    </Layout>
  );
}

export default App;
