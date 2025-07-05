// /submit.jsx

import { Play, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './contexts/themeContext';
import { useStore } from './store';

export const SubmitButton = () => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    setIsLoading(true);
    

    setTimeout(() => {
      setIsLoading(false);
      console.log('Pipeline submitted with nodes:', nodes);
      console.log('Pipeline submitted with edges:', edges);
    }, 2000);
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`
            flex items-center gap-3 px-6 py-3
            bg-gradient-to-r from-blue-600 to-blue-700
            hover:from-blue-700 hover:to-blue-800
            disabled:from-gray-400 disabled:to-gray-500
            disabled:cursor-not-allowed
            text-white font-semibold
            rounded-lg shadow-lg hover:shadow-xl
            transition-all duration-200
            transform hover:scale-105 active:scale-95
            disabled:transform-none disabled:hover:scale-100
            backdrop-blur-sm
            border border-white/20
          `}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Play size={16} />
          )}
          <span>{isLoading ? 'Processing...' : 'Submit Pipeline'}</span>
        </button>
        
        {isLoading && (
          <div className={`
            px-4 py-2 rounded-2xl text-xs
            ${isDarkMode 
              ? 'bg-gray-800/90 text-gray-300 border border-gray-600' 
              : 'bg-green-500/80 text-gray-700 font-semibold border border-gray-200'
            }
            backdrop-blur-sm
          `}>
            Validating pipeline...
          </div>
        )}
      </div>
    </div>
  );
};
