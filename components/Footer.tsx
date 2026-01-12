import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#09090b] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">

        <div className="flex items-center gap-1.5 order-2 md:order-1">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-cyan-500 fill-cyan-500" />
          <span>by</span>
          <a href="https://x.com/gxjo_dev" target="_blank" className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors">gxjo</a>
        </div>

        <div className="flex items-center gap-6 order-1 md:order-2">
          <span className="hidden md:inline">Free tool</span>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-zinc-700"></span>
          <span>No login required</span>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-zinc-700"></span>
          <span>100% client-side</span>
        </div>

        <a
          href="https://x.com/gxjo_dev"
          target="_blank"
          className="flex items-center gap-1.5 hover:text-white transition-colors order-3"
        >
          Follow on X <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </footer>
  );
};