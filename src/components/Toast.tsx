import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClear();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transform translate-y-0 opacity-100 transition-all duration-300 bg-[#31302b] text-[#f4f0e8] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-md border border-[#d4a346]/40">
      <span className="material-symbols-outlined text-[#ffdea8] text-[22px] flex-shrink-0">
        check_circle
      </span>
      <span className="text-sm font-medium leading-snug">{message}</span>
      <button
        onClick={onClear}
        className="ml-auto text-white/60 hover:text-white p-0.5"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};
