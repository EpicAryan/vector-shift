//nodeConfigs.jsx

import { Position } from 'reactflow';
import { getNodeBorderClass, getNodeGradientClass } from './utils/nodeColors';

export const nodeConfigs = {
  customInput: {
    title: "Input",
    className: `${getNodeBorderClass('customInput')} ${getNodeGradientClass('customInput')}`,
    handles: [
      { type: "source", position: Position.Right, id: "value" },
    ],
    fields: [
      { name: "inputName", label: "Name", type: "text", defaultValue: "input_", placeholder: "Enter input name" },
      { name: "inputType", label: "Type", type: "select", options: ["Text", "File"], defaultValue: "Text" },
    ],
  },
  
  llm: {
    title: "LLM",
    className: `${getNodeBorderClass('llm')} ${getNodeGradientClass('llm')}`,
    handles: [
      { type: "target", position: Position.Left, id: "system", style: { top: '35%' } },
      { type: "target", position: Position.Left, id: "prompt", style: { top: '65%' } },
      { type: "source", position: Position.Right, id: "response" },
    ],
    fields: [
      {
        name: "model",
        label: "Model",
        type: "select",
        options: ["gpt-3.5-turbo", "gpt-4"],
        defaultValue: "gpt-3.5-turbo"
      },
      {
        name: "prompt",
        label: "Prompt",
        type: "textarea",
        placeholder: "Enter your prompt here",
        defaultValue: ""
      }
    ],
  },
  
  customOutput: {
    title: "Output",
    className: `${getNodeBorderClass('customOutput')} ${getNodeGradientClass('customOutput')}`,
    handles: [
      { type: "target", position: Position.Left, id: "value" },
    ],
    fields: [
      { name: "outputName", label: "Name", type: "text", defaultValue: "output_", placeholder: "Enter output name" },
    ],
  },
  
 
  text: {
    title: "Text",
    className: `${getNodeBorderClass('text')} ${getNodeGradientClass('text')}`,
    handles: [
      { type: "source", position: Position.Right, id: "output" },
    ],
    fields: [
      { 
        name: "text", 
        label: "Content", 
        type: "textarea",
        autoResize: true, 
        defaultValue: "",
        placeholder: "Enter your text content...",
        className: "font-mono leading-relaxed"
      },
    ],
  },

  apiCall: {
    title: "API Call",
    className: `${getNodeBorderClass('apiCall')} ${getNodeGradientClass('apiCall')}`,
    handles: [
      { type: "target", position: Position.Left, id: "trigger", style: { top: '25%' } },
      { type: "target", position: Position.Left, id: "payload", style: { top: '75%' } },
      { type: "source", position: Position.Right, id: "response", style: { top: '33%' } },
      { type: "source", position: Position.Right, id: "error", style: { top: '67%' } },
    ],
    fields: [
      { 
        name: "url", 
        label: "API Endpoint", 
        type: "text", 
        defaultValue: "https://api.example.com/data",
        className: "font-mono text-xs",
        placeholder: "https://api.example.com/endpoint"
      },
      { 
        name: "method", 
        label: "HTTP Method", 
        type: "select", 
        options: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
        defaultValue: "GET",
        className: "font-semibold"
      },
      { 
        name: "timeout", 
        label: "Timeout (ms)", 
        type: "text", 
        defaultValue: "5000",
        className: "text-center",
        placeholder: "5000"
      },
    ],
  },


  dataTransform: {
    title: "Data Transform",
    className: `${getNodeBorderClass('dataTransform')} ${getNodeGradientClass('dataTransform')}`,
    handles: [
      { type: "target", position: Position.Left, id: "input" },
      { type: "source", position: Position.Right, id: "output" },
      { type: "source", position: Position.Right, id: "errors", style: { top: '80%' } },
    ],
    fields: [
      { 
        name: "transformType", 
        label: "Transform Type", 
        type: "select", 
        options: ["Map Fields", "Filter Rows", "Aggregate", "Sort", "Join"], 
        defaultValue: "Map Fields",
        className: "font-bold text-green-700 dark:text-green-300"
      },
      { 
        name: "filterCondition", 
        label: "Filter Condition", 
        type: "text", 
        defaultValue: "age > 18",
        className: "font-mono",
        placeholder: "e.g., age > 18"
      },
    ],
  },
};
