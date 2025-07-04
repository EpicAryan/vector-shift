import { Position } from 'reactflow';

export const nodeConfigs = {
  customInput: {
    title: "Input",
    handles: [
      { type: "source", position: Position.Right, id: "value" },
    ],
    fields: [
      { name: "inputName", label: "Name", type: "text", defaultValue: "input_" },
      { name: "inputType", label: "Type", type: "select", options: ["Text", "File"], defaultValue: "Text" },
    ],
  },
  
  llm: {
    title: "LLM",
    className: "bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-300",
    handles: [
      { type: "target", position: Position.Left, id: "system", style: { top: '35%' } },
      { type: "target", position: Position.Left, id: "prompt", style: { top: '65%' } },
      { type: "source", position: Position.Right, id: "response" },
    ],
    fields: [],
  },
  
  customOutput: {
    title: "Output",
    handles: [
      { type: "target", position: Position.Left, id: "value" },
    ],
    fields: [
      { name: "outputName", label: "Name", type: "text", defaultValue: "output_" },
    ],
  },
  
  text: {
    title: "Text",
    handles: [
      { type: "source", position: Position.Right, id: "output" },
    ],
    fields: [
      { 
        name: "text", 
        label: "Text", 
        type: "textarea", 
        defaultValue: "{{input}}"
      },
    ],
  },

  apiCall: {
    title: "API Call",
    className: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-300 shadow-lg",
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
        className: "font-mono text-xs"
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
        name: "headers", 
        label: "Headers (JSON)", 
        type: "textarea", 
        defaultValue: '{"Content-Type": "application/json"}',
        className: "font-mono text-xs"
      },
      { 
        name: "timeout", 
        label: "Timeout (ms)", 
        type: "text", 
        defaultValue: "5000",
        className: "text-center"
      },
      { 
        name: "retries", 
        label: "Max Retries", 
        type: "select", 
        options: ["0", "1", "2", "3", "5"], 
        defaultValue: "1"
      },
    ],
  },

  dataTransform: {
    title: "Data Transform",
    className: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 shadow-md border-2",
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
        className: "font-bold text-green-700"
      },
      { 
        name: "mapping", 
        label: "Field Mapping", 
        type: "textarea", 
        defaultValue: "{\n  \"oldField\": \"newField\",\n  \"age\": \"userAge\"\n}",
        className: "font-mono text-xs bg-gray-50"
      },
      { 
        name: "filterCondition", 
        label: "Filter Condition", 
        type: "text", 
        defaultValue: "age > 18",
        className: "font-mono bg-yellow-50 border-yellow-200"
      },
      { 
        name: "sortBy", 
        label: "Sort By Field", 
        type: "text", 
        defaultValue: "createdAt",
        className: "italic"
      },
      { 
        name: "sortOrder", 
        label: "Sort Order", 
        type: "select", 
        options: ["ASC", "DESC"], 
        defaultValue: "ASC"
      },
      { 
        name: "validateOutput", 
        label: "Validate Output", 
        type: "select", 
        options: ["true", "false"], 
        defaultValue: "true"
      },
    ],
  },

};
