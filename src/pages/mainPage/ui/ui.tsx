import React from 'react';
import NodeSettings from '../../../entities/enditNode/ui/NodeSettings.tsx';
import EdgeSettings from '../../../entities/editEdge/ui/EdgeSettings.tsx';
import { GraphUIProps } from '../model/types.tsx';



const GraphUI: React.FC<GraphUIProps> = ({
  isFullScreen,
  toggleFullScreen,
  showNodeEditor,
  nodeColor,
  handleNodeColorChange,
  nodeShape,
  handleNodeShapeChange,
  applyNodeChanges,
  showEdgeEditor,
  edgeThickness,
  handleThicknessChange,
  selectedAttribute,
  handleAttributeChange,
  selectedEdgeType,
  handleEdgeTypeChange,
  selectedEdgeDirection,
  handleEdgeDirectionChange,
  selectedLineStyle,
  handleLineStyleChange,
  applyEdgeChanges,
  tooltip,
  tooltipContent,
  edgeTooltip,
  edgeTooltipContent,
  selectedNodes,
  startNodeSelection,
  createEdge,
  createAutomaticEdges
}) => {
  return (
    <>
      <button
        onClick={toggleFullScreen}
        className="absolute bottom-9 right-4 p-2 bg-blue-500 text-white rounded shadow"
        title="Toggle Full Screen"
      >
        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>

     

      {tooltip && (
        <div
          className="absolute left-10 top-10 bg-black text-white p-1 rounded pointer-events-none"
          style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
        >
          {tooltipContent}
        </div>
      )}

      {edgeTooltip && (
        <div
          className="absolute left-10 top-10 bg-black text-white p-1 rounded pointer-events-none"
          style={{ left: edgeTooltip.x + 10, top: edgeTooltip.y + 10 }}
        >
          {edgeTooltipContent}
        </div>
      )}

      <div className="absolute top-2 right-1 w-72 p-2 border border-gray-300 bg-white" title="Control Panel">
        <div className="flex flex-col gap-2">
          <button onClick={startNodeSelection} className="p-2 bg-blue-500 text-white rounded">
            Select Nodes to Create Edge
          </button>
          <button onClick={createEdge} disabled={selectedNodes.length < 2} className="p-2 bg-blue-500 text-white rounded">
            Create Edge
          </button>
          <button onClick={createAutomaticEdges} className="p-2 bg-blue-500 text-white rounded">
            Create Automatic Edges
          </button>
          <div>Selected Nodes: {selectedNodes.join(', ')}</div>
           {showNodeEditor && (
        <NodeSettings
          nodeColor={nodeColor}
          onNodeColorChange={handleNodeColorChange}
          nodeShape={nodeShape}
          onNodeShapeChange={handleNodeShapeChange}
          onApplyChanges={applyNodeChanges}
        />
      )}

      {showEdgeEditor && (
        <EdgeSettings
          edgeThickness={edgeThickness}
          onThicknessChange={handleThicknessChange}

          selectedAttribute={selectedAttribute}
          onAttributeChange={handleAttributeChange}

          selectedEdgeType={selectedEdgeType}
          onEdgeTypeChange={handleEdgeTypeChange}

          selectedEdgeDirection={selectedEdgeDirection}
          onEdgeDirectionChange={handleEdgeDirectionChange}
          selectedLineStyle={selectedLineStyle}
          onLineStyleChange={handleLineStyleChange}
          onApplyChanges={applyEdgeChanges}       />
      )}
        </div>
      </div>
    </>
  );
};

export default GraphUI;
