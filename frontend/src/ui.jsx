// // ui.jsx
// // Displays the drag-and-drop UI
// // --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { nodeConfigs } from './nodeConfigs';
import { GenericNode } from './nodes/genericNode';
import { useTheme } from './contexts/themeContext';
import { SubmitButton } from './submit';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: GenericNode,
  llm: GenericNode,
  customOutput: GenericNode,
  text: GenericNode,
  apiCall: GenericNode,
  dataTransform: GenericNode,
};


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const { isDarkMode } = useTheme();
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      const config = nodeConfigs[type];
      if (!config) return { id: nodeID, nodeType: type };

      const fieldData = {};
      config.fields?.forEach(field => {
        fieldData[field.name] = field.defaultValue;
      });

      return {
        id: nodeID,
        nodeType: type,
        config,
        ...fieldData
      };
    };

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const backgroundProps = {
      color: isDarkMode ? '#374151' : '#d1d5db',
      gap: gridSize,
      size: 1,
    };

    const minimapProps = {
      style: {
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
        borderRadius: '8px',
      },
      maskColor: isDarkMode ? '#374151' : '#f3f4f6',
      nodeColor: isDarkMode ? '#6b7280' : '#9ca3af',
      nodeBorderRadius: 6,
    };


    return (
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background {...backgroundProps} />
                <Controls />
                <MiniMap {...minimapProps} />
            </ReactFlow>
             <SubmitButton />
        </div>
    );
};
