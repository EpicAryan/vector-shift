//baseNode.jsx

import { useTheme } from '../contexts/themeContext';

export const BaseNode = ({ 
  title, 
  children, 
  className, 
  height, 
  minHeight = 120 
}) => {
  const { isDarkMode } = useTheme();
  
  const defaultClasses = `
    w-52 min-h-[120px]
    ${isDarkMode 
      ? 'bg-gray-800 border-gray-600 shadow-lg shadow-gray-900/20' 
      : 'bg-white border-gray-200 shadow-md shadow-gray-900/10'
    }
    border-2 rounded-xl transition-all duration-200 ease-out hover:shadow-lg hover:scale-[1.01] relative overflow-visible
  `;
  
  const combinedClasses = `${defaultClasses} ${className || ''}`;

  const nodeStyle = {
    height: height ? `${Math.max(height, minHeight)}px` : 'auto',
    minHeight: `${minHeight}px`,
    transition: 'height 0.15s ease-out, box-shadow 0.2s ease-out, transform 0.2s ease-out',
  };

  return (
    <div className={combinedClasses.trim()} style={nodeStyle}>
      <div className={`
        relative p-3
        ${isDarkMode 
          ? 'bg-gradient-to-r from-gray-700 to-gray-750 border-gray-600' 
          : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
        }
        border-b rounded-t-xl
      `}>
        <strong className={`
          text-sm font-bold tracking-wide
          ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}
        `}>
          {title}
        </strong>

        <div className={`
          absolute bottom-0 left-0 right-0 h-0.5
          ${isDarkMode 
            ? 'bg-gradient-to-r from-gray-700 to-gray-750 border-gray-600' 
            : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
          }
        `} />
      </div>

      <div className="p-4 space-y-3 flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
};
