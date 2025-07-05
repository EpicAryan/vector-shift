// toolbar.js

import { Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { DraggableNode } from './draggableNode';
import { useTheme } from './contexts/themeContext';

export const PipelineToolbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Pipeline Builder
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Drag and drop nodes to build your pipeline
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
                onClick={toggleTheme}
                className="
                    flex items-center gap-2 px-3 py-2
                    bg-gray-100 dark:bg-gray-800
                    hover:bg-gray-200 dark:hover:bg-gray-700
                    border border-gray-300 dark:border-gray-600
                    rounded-lg transition-colors
                    text-sm font-medium
                    text-gray-700 dark:text-gray-300
                "
                >
                <span
                    key={isDarkMode ? 'sun' : 'moon'}
                    className="
                    inline-block transition-all duration-300 ease-in-out
                    transform
                    motion-safe:rotate-0 motion-reduce:transform-none
                    group-hover:scale-110
                    animate-spin-slow
                    "
                >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </span>
                {isDarkMode ? 'Light' : 'Dark'}
            </button>

            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="
                p-2 
                bg-gray-100 dark:bg-gray-800
                hover:bg-gray-200 dark:hover:bg-gray-700
                border border-gray-300 dark:border-gray-600
                rounded-lg transition-colors
                text-gray-600 dark:text-gray-400
              "
            >
              {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Available Nodes
            </h3>
            <div className="flex flex-wrap gap-3">
              <DraggableNode type='customInput' label='Input' />
              <DraggableNode type='llm' label='LLM' />
              <DraggableNode type='customOutput' label='Output' />
              <DraggableNode type='text' label='Text' />
              <DraggableNode type='apiCall' label='API Call' />
              <DraggableNode type='dataTransform' label='Transform' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
