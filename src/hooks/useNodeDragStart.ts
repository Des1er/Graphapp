import { useCallback } from 'react';
import cytoscape from 'cytoscape';

export const useNodeDragStart = (
  setDraggingNode: (node: cytoscape.SingularElementReturnValue | null) => void
) => {
  return useCallback(
    (event: cytoscape.EventObject) => {
      const node = event.target;
      setDraggingNode(node);
    },
    [setDraggingNode]
  );
};
