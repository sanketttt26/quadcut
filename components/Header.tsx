import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between z-10 relative">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
          Q
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-white">
          QuadCut
        </span>
      </div>
    </header>
  );
};