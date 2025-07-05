//genericNode.jsx

import { Handle } from 'reactflow';
import { useStore } from '../store';
import { useTheme } from '../contexts/themeContext';
import { BaseNode } from './baseNode';
import { ChevronDown } from 'lucide-react';
import { getHandleColorClasses } from '../utils/nodeColors';

const FieldRenderer = ({ field, value, onChange }) => {
  const { isDarkMode } = useTheme();
  
  const baseInputClasses = `
    mt-2 block w-full px-3 py-2 
    ${isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    }
    border rounded-lg shadow-sm
    transition-all duration-200
    text-sm
  `;

  const selectClasses = `
    ${baseInputClasses}
    cursor-pointer
    ${isDarkMode 
      ? 'hover:bg-gray-650 hover:border-gray-500' 
      : 'hover:bg-gray-50 hover:border-gray-400'
    }
    appearance-none
    bg-no-repeat bg-right
    pr-10
  `;
  
  const combinedClasses = `${baseInputClasses} ${field.className || ''}`.trim();
  const fieldValue = value ?? field.defaultValue;

  switch (field.type) {
    case 'select':
      return (
        <div className="relative">
          <select 
            value={fieldValue} 
            onChange={onChange} 
            className={`${selectClasses} ${field.className || ''}`.trim()}
          >
            {field.options?.map(opt => (
              <option 
                key={opt} 
                value={opt}
                className={`
                  ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}
                  py-2
                `}
              >
                {opt}
              </option>
            ))}
          </select>
          <div className={`
            absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          `}>
            <ChevronDown size={16} />
          </div>
        </div>
      );
    case 'textarea':
      return (
        <textarea 
          value={fieldValue} 
          onChange={onChange} 
          rows={3} 
          className={combinedClasses}
          placeholder={field.placeholder || 'Enter text...'}
        />
      );
    case 'text':
    default:
      return (
        <input 
          type="text" 
          value={fieldValue} 
          onChange={onChange} 
          className={combinedClasses}
          placeholder={field.placeholder || 'Enter value...'}
        />
      );
    }
  };

const EnhancedHandle = ({ handle, nodeType }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <Handle
      key={handle.id}
      type={handle.type}
      position={handle.position}
      id={handle.id}
      style={{
        ...handle.style,
        width: '10px',
        height: '10px',
      }}
      className={`
        relative w-3 h-3 border-2
        ${isDarkMode ? 'border-gray-700' : 'border-white'}
        rounded-full
        bg-gradient-to-br ${getHandleColorClasses(nodeType, handle.type)}
        shadow-lg transition-all duration-200 hover:shadow-xl
      `}
    />
  );
};

export const GenericNode = ({ id, data }) => {
  const { updateNodeField } = useStore();
  const { isDarkMode } = useTheme();
  const { config } = data;

  if (!config) return null;

  const handleFieldChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode title={config.title} className={config.className}>
      {config.fields?.map(field => (
        <div key={field.name} className="space-y-1">
          <label className={`
            block text-xs font-semibold tracking-wide uppercase
            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {field.label}
          </label>
          <FieldRenderer
            field={field}
            value={data[field.name]}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        </div>
      ))}

      {config.handles?.map(handle => (
        <EnhancedHandle 
          key={handle.id} 
          handle={handle} 
          nodeType={data.nodeType} 
        />
      ))}
    </BaseNode>
  );
};
