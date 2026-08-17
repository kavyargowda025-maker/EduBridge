import React from 'react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  imageUrl: string;
  caption: string;
  category: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ imageUrl, caption, category, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800/80 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative max-h-[75vh] flex items-center justify-center bg-black">
          <img
            src={imageUrl}
            alt={caption}
            className="max-h-[75vh] w-auto max-w-full object-contain"
          />
        </div>

        <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/50">
              {category}
            </span>
            <h3 className="text-lg font-bold text-white mt-1.5">{caption}</h3>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-500 transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
