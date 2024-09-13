import React, { useState, useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import screenfull from 'screenfull';
import GraphUI from './ui/ui.tsx';



const initialData = {
  nodes: [
    { data: { id: "app1", label: "Application A", type: "app" }, position: { x: 100, y: 100 } },
    { data: { id: "server1", label: "Server 1", type: "server" }, position: { x: 200, y: 200 } },
    { data: { id: "networkL3", label: "Network Layer 3", type: "network" }, position: { x: 300, y: 100 } },
    { data: { id: "networkL2", label: "Network Layer 2", type: "network" }, position: { x: 400, y: 200 } }
  ],
  edges: []
};




const GraphComponent: React.FC = () => {

  const [selectedNode, setSelectedNode] = useState<cytoscape.NodeSingular | null>(null);
  const [nodeColor, setNodeColor] = useState<string>('#666');
  const [nodeShape, setNodeShape] = useState<'ellipse' | 'triangle' | 'rectangle' | 'diamond'>('ellipse');

  const [elements, setElements] = useState<cytoscape.ElementDefinition[]>(CytoscapeComponent.normalizeElements(initialData));
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectedEdge, setSelectedEdge] = useState<cytoscape.EdgeSingular | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string>('');
  const [selectedEdgeType, setSelectedEdgeType] = useState<string>('');
  const [selectedEdgeDirection, setSelectedEdgeDirection] = useState<string>('');
  const [selectedLineStyle, setSelectedLineStyle] = useState<string>('');
  const [edgeThickness, setEdgeThickness] = useState<number>(2);
  const [tooltip, setTooltip] = useState<{ x: number, y: number } | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [draggingNode, setDraggingNode] = useState<cytoscape.NodeSingular | null>(null);
  const [edgeTooltip, setEdgeTooltip] = useState<{ x: number, y: number } | null>(null);
  const [edgeTooltipContent, setEdgeTooltipContent] = useState<string>('');
  const [showNodeEditor, setShowNodeEditor] = useState<boolean>(false);
  const [showEdgeEditor, setShowEdgeEditor] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullScreen(!isFullScreen);
    }
  };

  useEffect(() => {
    const cy = cyRef.current;
    if (cy) {
      cy.on('tap', 'node', handleNodeClick);
      cy.on('tap', 'edge', handleEdgeClick);
      cy.on('tap', function(event) {
        if (event.target === cy) {
          setShowNodeEditor(false);
          setShowEdgeEditor(false);
          setIsSelecting(false);
        }
      });
      cy.on('mouseover', 'node', handleNodeHover);
      cy.on('mouseout', 'node', handleNodeUnhover);
      cy.on('mouseover', 'edge', handleEdgeHover);
      cy.on('mouseout', 'edge', handleEdgeUnhover);
      cy.on('drag', 'node', handleNodeDragStart);
      cy.on('dragend', 'node', handleNodeDragEnd);
      return () => {
        cy.removeListener('tap', 'node', handleNodeClick);
        cy.removeListener('tap', 'edge', handleEdgeClick);
        cy.removeListener('mouseover', 'node', handleNodeHover);
        cy.removeListener('mouseout', 'node', handleNodeUnhover);
        cy.removeListener('mouseover', 'edge', handleEdgeHover);
        cy.removeListener('mouseout', 'edge', handleEdgeUnhover);
        cy.removeListener('drag', 'node', handleNodeDragStart);
        cy.removeListener('dragend', 'node', handleNodeDragEnd);
        cy.removeListener('tap', function(event) {
          if (event.target === cy) {
            setShowNodeEditor(false);
            setShowEdgeEditor(false);
            setIsSelecting(false);
          }
        });
      };
    }
  }, [cyRef.current, draggingNode, isSelecting]);

  const handleNodeClick = (event: cytoscape.EventObject) => {
    const node = event.target;
    setSelectedNode(node);
    setNodeColor(node.style('background-color'));
    setNodeShape(node.style('shape'));
    if (isSelecting) {
      const nodeId = event.target.id();
      setSelectedNodes(prevSelectedNodes => {
        if (prevSelectedNodes.includes(nodeId)) {
          return prevSelectedNodes;
        } else if (prevSelectedNodes.length === 2) {
          return [nodeId];
        } else {
          return [...prevSelectedNodes, nodeId];
        }
      });
    }
    else {
      setShowNodeEditor(true);
      setShowEdgeEditor(false);
    }
  };

  const handleEdgeClick = (event: cytoscape.EventObject) => {
    const edge = event.target;
    setSelectedEdge(edge);
    setSelectedAttribute(edge.data('attribute') || '');
    setSelectedEdgeType(edge.data('type') || '');
    setSelectedEdgeDirection(edge.data('direction') || '');
    setSelectedLineStyle(edge.data('lineStyle') || '');
    setEdgeThickness(edge.data('width'));
    setIsSelecting(false);
    setShowNodeEditor(false);
    setShowEdgeEditor(true);
  };

  const startNodeSelection = () => {
    setIsSelecting(true);
    setSelectedNodes([]);
    setShowNodeEditor(false);
    setShowEdgeEditor(false);
  };

  const handleNodeDragStart = (event: cytoscape.EventObject) => {
    const node = event.target;
    setDraggingNode(node);
  };

  const handleNodeDragEnd = (event: cytoscape.EventObject) => {
    const node = event.target;

    if (draggingNode && draggingNode.id() !== node.id()) {
      const newEdge = {
        data: {
          source: draggingNode.id(),
          target: node.id(),
          width: edgeThickness,
          type: selectedEdgeType || 'dependency',
          attribute: selectedAttribute || '',
          direction: selectedEdgeDirection || 'forward',
          lineStyle: selectedLineStyle || 'solid',
          label: 'New Edge'
        }
      };
      setElements(prevElements => [...prevElements, newEdge]);
    }
    setDraggingNode(null);
  };

  const createEdge = () => {
    if (selectedNodes.length === 2) {
      const newEdge = {
        data: {
          source: selectedNodes[0],
          target: selectedNodes[1],
          width: 2,
          lineStyle: 'solid',
          label: 'New Edge'
        }
      };
      setElements(prevElements => [...prevElements, newEdge]);
      setSelectedNodes([]);
      setIsSelecting(false);
      setShowNodeEditor(false);
      setShowEdgeEditor(false);
    }
  };

  const applyEdgeChanges = () => {
    if (selectedEdge) {
      const updatedEdgeData = {
        ...selectedEdge.data(),
        width: edgeThickness,
        attribute: selectedAttribute,
        type: selectedEdgeType,
        direction: selectedEdgeDirection,
        lineStyle: selectedLineStyle,
        label: selectedAttribute
      };

      setElements(elements => elements.map(el => {
        if (el.data.id === selectedEdge.id()) {
          return { data: { ...el.data, ...updatedEdgeData } };
        }
        return el;
      }));
      setSelectedEdge(null);
      setShowNodeEditor(false);
      setShowEdgeEditor(false);
    }
  };

  const handleNodeHover = (event: cytoscape.EventObject) => {
    const node = event.target;
    setTooltipContent(`ID: ${node.id()}, Label: ${node.data('label')}`);
    setTooltip({ x: event.renderedPosition.x, y: event.renderedPosition.y });
  };

  const handleNodeUnhover = () => {
    setTooltip(null);
  };

  const handleThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdgeThickness(Number(event.target.value));
  };

  const createAutomaticEdges = () => {
    const nodes = initialData.nodes;
    const edgesToAdd: cytoscape.ElementDefinition[] = []; // Explicitly define the type of edges

    nodes.forEach((node) => {
        if (node.data.type === "app") {
            const serverNode = nodes.find(n => n.data.type === "server");
            if (serverNode) {
                edgesToAdd.push({
                    data: {
                        source: node.data.id,
                        target: serverNode.data.id,
                        type: "dependency",
                        attribute: "hosted_on",
                        width: 2,
                        label: "Hosted on",
                        direction: 'forward',
                        lineStyle: 'solid'
                    }
                });
            }

            const networkNode = nodes.find(n => n.data.type === "network");
            if (networkNode) {
                edgesToAdd.push({
                    data: {
                        source: node.data.id,
                        target: networkNode.data.id,
                        type: "influence",
                        attribute: "communicates_with",
                        width: 1,
                        label: "Communicates with",
                        direction: 'forward',
                        lineStyle: 'solid'
                    }
                });
            }
        } else if (node.data.type === "network") {
            const otherNetworkNode = nodes.find(n => n.data.type === "network" && n.data.id !== node.data.id);
            if (otherNetworkNode) {
                edgesToAdd.push({
                    data: {
                        source: node.data.id,
                        target: otherNetworkNode.data.id,
                        type: "dependency",
                        attribute: "depends_on",
                        width: 3,
                        label: "Depends on",
                        direction: 'forward',
                        lineStyle: 'solid'
                    }
                });
            }
        }
    });

    setElements(prevElements => [...prevElements, ...edgesToAdd]);
  };

  const handleAttributeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAttribute(event.target.value);
  };

  const handleEdgeTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEdgeType(event.target.value);
  };

  const handleEdgeDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEdgeDirection(event.target.value);
  };

  const handleLineStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLineStyle(event.target.value);
  };

  const applyNodeChanges = () => {
    if (selectedNode) {
      selectedNode.style('background-color', nodeColor);
      selectedNode.style('shape', nodeShape);
      setElements(elements => elements.map(el => {
        if (el.data.id === selectedNode.id()) {
          return {
            ...el,
            style: {
              ...el.style,
              'background-color': nodeColor,
              'shape': nodeShape
            }
          };
        }
        return el;
      }));
      setSelectedNode(null);
      setShowNodeEditor(false);
      setShowEdgeEditor(false);
    }
  };

  const handleEdgeHover = (event: cytoscape.EventObject) => {
    const edge = event.target;
    const sourceNode = cyRef.current?.getElementById(edge.data('source'));
    const targetNode = cyRef.current?.getElementById(edge.data('target'));

    const sourceLabel = sourceNode?.data('label');
    const targetLabel = targetNode?.data('label');
    const attribute = edge.data('attribute');

    setEdgeTooltipContent(`From: ${sourceLabel}\nTo: ${targetLabel}\nAttribute: ${attribute}`);
    setEdgeTooltip({ x: event.renderedPosition.x, y: event.renderedPosition.y });
  };

  const handleEdgeUnhover = () => {
    setEdgeTooltip(null);
  };

  const handleNodeColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeColor(event.target.value);
  };

  const handleNodeShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNodeShape(event.target.value as 'ellipse' | 'triangle' | 'rectangle' | 'diamond');
};


  return (
    <div className={`relative ${isFullScreen ? 'bg-gray-100' : 'bg-white'} transition-all`}>
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100vh', backgroundColor: isFullScreen ? '#f0f0f0' : '#fff' }}
        layout={{ name: 'grid' }}
        cy={(cy) => {
          cyRef.current = cy;

          cy.on('drag', 'node', handleNodeDragStart);
          cy.on('dragend', 'node', handleNodeDragEnd);
        }}
        stylesheet={[
          {
            selector: 'node',
            style: {
              'label': 'data(label)',
              'background-color': 'data(background-color)',
              'text-valign': 'center',
              'color': '#fff',
              'text-outline-width': 2,
              'text-outline-color': '#666',
              'shape': 'data(shape)',
              'cursor': 'grab'
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 'data(width)',
              'line-color': '#ccc',
              'label': 'data(label)',
              'text-margin-x': 5,
              'text-margin-y': -5,
              'line-style': 'data(lineStyle)',
              'curve-style': 'bezier',
              'target-distance-from-node': 5,
              'source-distance-from-node': 5
            }
          },
          {
            selector: 'edge[direction="forward"]',
            style: {
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'arrow-scale': 2
            }
          },
          {
            selector: 'edge[direction="backward"]',
            style: {
              'source-arrow-color': '#ccc',
              'source-arrow-shape': 'triangle',
              'arrow-scale': 2
            }
          },
          {
            selector: 'edge[direction="both"]',
            style: {
              'source-arrow-color': '#ccc',
              'source-arrow-shape': 'triangle',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'arrow-scale': 2
            }
          },
          {
            selector: '.selected',
            style: {
              'background-color': '#ff0',
              'line-color': '#ff0',
              'target-arrow-color': '#ff0',
              'source-arrow-color': '#ff0',
              'border-color': '#ff0'
            }
          }
        ]}
      />

<GraphUI
        isFullScreen={isFullScreen}
        toggleFullScreen={toggleFullScreen}
        showNodeEditor={showNodeEditor}
        nodeColor={nodeColor}
        handleNodeColorChange={handleNodeColorChange}
        nodeShape={nodeShape}
        handleNodeShapeChange={handleNodeShapeChange}
        applyNodeChanges={applyNodeChanges}
        showEdgeEditor={showEdgeEditor}
        edgeThickness={edgeThickness}
        handleThicknessChange={handleThicknessChange}

        selectedAttribute={selectedAttribute}
        handleAttributeChange={handleAttributeChange}

        selectedEdgeType={selectedEdgeType}
        handleEdgeTypeChange={handleEdgeTypeChange}

        selectedEdgeDirection={selectedEdgeDirection}
        handleEdgeDirectionChange={handleEdgeDirectionChange}
        selectedLineStyle={selectedLineStyle}
        handleLineStyleChange={handleLineStyleChange}
        applyEdgeChanges={applyEdgeChanges}
        tooltip={tooltip}
        tooltipContent={tooltipContent}
        edgeTooltip={edgeTooltip}
        edgeTooltipContent={edgeTooltipContent}
        selectedNodes={selectedNodes}
        startNodeSelection={startNodeSelection}
        createEdge={createEdge}
        createAutomaticEdges={createAutomaticEdges}
      />
      
      
       
    </div>
  );
};

export default GraphComponent;

