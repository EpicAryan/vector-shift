//autoResizeTextarea.jsx

import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/themeContext';

export const AutoResizeTextarea = ({ 
  value, 
  onChange, 
  placeholder, 
  className = '',
  onSizeChange,
  minRows = 3,
  maxRows = 30 
}) => {
  const { isDarkMode } = useTheme();
  const textareaRef = useRef(null);

  const baseClasses = `
    block w-full px-3 py-2 resize-none
    ${isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    }
    border rounded-lg shadow-sm0
    transition-all duration-200
    text-sm leading-relaxed
    overflow-hidden
  `;

  const calculateHeight = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    textarea.style.transition = 'none';
    textarea.style.height = 'auto';
    
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
    const paddingTop = parseInt(getComputedStyle(textarea).paddingTop) || 12;
    const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom) || 12;
    const totalPadding = paddingTop + paddingBottom;
    
    const contentHeight = scrollHeight - totalPadding;
    const lines = Math.max(
      minRows, 
      Math.min(maxRows, Math.ceil(contentHeight / lineHeight))
    );
    
    const textareaHeight = (lines * lineHeight) + totalPadding;
    textarea.style.height = `${textareaHeight}px`;
    
    const nodeHeight = Math.max(120, textareaHeight + 117);
    requestAnimationFrame(() => {
      if (textarea) {
        textarea.style.transition = '';
      }
    });
    
    onSizeChange?.({ height: nodeHeight });
  };

  useEffect(() => {
    calculateHeight();
  }, [value, minRows, maxRows]);

  useEffect(() => {
    if (textareaRef.current) {
      calculateHeight();
    }
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e);
        calculateHeight();
      }}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`.trim()}
      rows={minRows}
      style={{
        minHeight: `${minRows * 20 + 24}px`, 
        transition: 'none',  
      }}
    />
  );
};
