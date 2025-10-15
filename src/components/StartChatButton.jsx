import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function StartChatButton({ text = "Probar ahora", large = false }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openChat'));
  };

  const sizeClasses = large 
    ? "px-12 py-5 text-xl" 
    : "px-8 py-4 text-lg";

  return (
    <button 
      onClick={handleClick}
      className={`bg-gradient-to-r from-purple-600 to-blue-600 ${sizeClasses} rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all font-semibold flex items-center justify-center gap-2 cursor-pointer`}
    >
      <MessageCircle className="w-5 h-5" />
      {text}
    </button>
  );
}