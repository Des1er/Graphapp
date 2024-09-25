import { useCallback } from 'react';
import cytoscape from 'cytoscape';

export const useNodeDragEnd = (
  draggingNode: cytoscape.SingularElementReturnValue | null,
  setDraggingNode: (node: cytoscape.SingularElementReturnValue | null) => void,
  setElements: (callback: (prevElements: any[]) => any[]) => void,
  edgeThickness: number,
  selectedEdgeType: string | null,
  selectedAttribute: string | null,
  selectedEdgeDirection: string | null,
  selectedLineStyle: string | null
) => {
  return useCallback(
    (event: cytoscape.EventObject) => {
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
    },
    [
      draggingNode,
      setDraggingNode,
      setElements,
      edgeThickness,
      selectedEdgeType,
      selectedAttribute,
      selectedEdgeDirection,
      selectedLineStyle
    ]
  );
};
