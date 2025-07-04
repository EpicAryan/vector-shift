import { Handle } from 'reactflow';
import { useStore } from '../store';
import { BaseNode } from './baseNode';

const FieldRenderer = ({ field, value, onChange }) => {
  const defaultClasses = "mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const combinedClasses = `${defaultClasses} ${field.className || ''}`.trim();

  const fieldValue = value ?? field.defaultValue;

  switch (field.type) {
    case 'select':
      return (
        <select value={fieldValue} onChange={onChange} className={combinedClasses}>
          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    case 'textarea':
      return <textarea value={fieldValue} onChange={onChange} rows={3} className={combinedClasses} />;
    case 'text':
    default:
      return <input type="text" value={fieldValue} onChange={onChange} className={combinedClasses} />;
  }
};

export const GenericNode = ({ id, data }) => {
  const { updateNodeField } = useStore();
  const { config } = data;

  if (!config) return null;

  const handleFieldChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode title={config.title} className={config.className}>
      {config.fields?.map(field => (
        <label key={field.name} className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          <FieldRenderer
            field={field}
            value={data[field.name]}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        </label>
      ))}

      {config.handles?.map(handle => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          className="w-2 h-2 !bg-teal-500"
        />
      ))}
    </BaseNode>
  );
};
