import React from 'react';
import { GameProvider } from './game/GameContext';
import { Shell } from './ui/Shell';

export const App: React.FC = () => {
  return (
    <GameProvider>
      <Shell />
    </GameProvider>
  );
};

export default App;
