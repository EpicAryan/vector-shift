// draggableNode.js

import { 
  Download, 
  Brain, 
  Upload, 
  FileText, 
  Globe, 
  Zap 
} from 'lucide-react';
import { getNodeColorClasses } from './utils/nodeColors';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const getNodeIcon = (type) => {
    const iconProps = { size: 20, className: "mb-1 text-gray-700 dark:text-gray-300" };
    
    switch(type) {
      case 'customInput': return <Download {...iconProps} />;
      case 'llm': return <Brain {...iconProps} />;
      case 'customOutput': return <Upload {...iconProps} />;
      case 'text': return <FileText {...iconProps} />;
      case 'apiCall': return <Globe {...iconProps} />;
      case 'dataTransform': return <Zap {...iconProps} />;
      default: return <FileText {...iconProps} />;
    }
  };

  return (
    <div
      className={`
        cursor-grab active:cursor-grabbing
        min-w-[120px] h-20
        flex flex-col items-center justify-center
        bg-white dark:bg-gray-800
        border-2 rounded-lg
        shadow-sm hover:shadow-md
        transition-all duration-200
        hover:-translate-y-1 
        ${getNodeColorClasses(type)}
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {getNodeIcon(type)}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
    </div>
  );
};
  