export interface GraphUIProps {
    isFullScreen: boolean;
    toggleFullScreen: () => void;
    showNodeEditor: boolean;
    nodeColor: string;
    handleNodeColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    nodeShape: 'ellipse' | 'triangle' | 'rectangle' | 'diamond';
    handleNodeShapeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    applyNodeChanges: () => void;
    showEdgeEditor: boolean;
    edgeThickness: number;
    handleThicknessChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    selectedAttribute: string;
    handleAttributeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

    selectedEdgeType: string;
    handleEdgeTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

    selectedEdgeDirection: string;
    handleEdgeDirectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedLineStyle: string;
    handleLineStyleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    applyEdgeChanges: () => void;
    tooltip: { x: number, y: number } | null;
    tooltipContent: string;
    edgeTooltip: { x: number, y: number } | null;
    edgeTooltipContent: string;
    selectedNodes: string[];
    startNodeSelection: () => void;
    createEdge: () => void;
    createAutomaticEdges: () => void;
  };
  export type NodeShape = "ellipse" | "triangle" | "rectangle" | "diamond";