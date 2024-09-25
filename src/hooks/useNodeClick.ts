import { useCallback } from 'react';
import cytoscape from 'cytoscape';

export const useNodeClick = (
  setSelectedNode: (node: cytoscape.SingularElementReturnValue) => void,
  setNodeColor: (color: string) => void,
  setNodeShape: (shape: string) => void,
  setSelectedNodes: (callback: (prevSelectedNodes: string[]) => string[]) => void,
  setShowNodeEditor: (value: boolean) => void,
  setShowEdgeEditor: (value: boolean) => void,
  isSelecting: boolean
) => {
  return useCallback(
    (event: cytoscape.EventObject) => {
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
      } else {
        setShowNodeEditor(true);
        setShowEdgeEditor(false);
      }
    },
    [setSelectedNode, setNodeColor, setNodeShape, setSelectedNodes, setShowNodeEditor, setShowEdgeEditor, isSelecting]
  );
};
