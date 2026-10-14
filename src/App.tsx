import React, { useState } from 'react';
import { GameProvider } from './game/GameContext';
import { Shell } from './ui/Shell';
import { useFarm } from './context/FarmContext';
import { AppShell } from './components/AppShell';
import { HomeScreen } from './components/HomeScreen';
import { FarmScreen } from './components/FarmScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { HarvestScreen } from './components/HarvestScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LivestockScreen } from './components/LivestockScreen';
import { WeatherScreen } from './components/WeatherScreen';
import {
  SplashScreen,
  OnboardingScreen,
  LoginScreen,
  CreateAccountScreen,
} from './components/AuthScreens';

const FarmManagementApp: React.FC<{ onSwitchToGame: () => void }> = ({ onSwitchToGame }) => {
  const { screen } = useFarm();

  if (screen === 'splash') return <SplashScreen />;
  if (screen === 'onboarding') return <OnboardingScreen />;
  if (screen === 'login') return <LoginScreen />;
  if (screen === 'create-account') return <CreateAccountScreen />;

  return (
    <AppShell onSwitchToGame={onSwitchToGame}>
      {screen === 'home' && <HomeScreen />}
      {screen === 'farm' && <FarmScreen />}
      {screen === 'analytics' && <AnalyticsScreen />}
      {screen === 'harvest' && <HarvestScreen />}
      {screen === 'profile' && <ProfileScreen />}
      {(screen === 'livestock' || screen === 'animal-detail') && <LivestockScreen />}
      {screen === 'weather' && <WeatherScreen />}
    </AppShell>
  );
};

export const App: React.FC = () => {
  const [mode, setMode] = useState<'game' | 'dashboard'>(() => {
    try {
      const saved = localStorage.getItem('app_mode');
      if (saved === 'game' || saved === 'dashboard') return saved;
    } catch (_) {}
    return 'game';
  });

  const handleSetMode = (m: 'game' | 'dashboard') => {
    setMode(m);
    try {
      localStorage.setItem('app_mode', m);
    } catch (_) {}
  };

  return (
    <>
      {mode === 'game' ? (
        <GameProvider>
          <Shell onSwitchToDashboard={() => handleSetMode('dashboard')} />
        </GameProvider>
      ) : (
        <FarmManagementApp onSwitchToGame={() => handleSetMode('game')} />
      )}
    </>
  );
};

export default App;
