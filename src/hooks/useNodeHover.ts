import { useCallback } from 'react';
import cytoscape from 'cytoscape';

export const useNodeHover = (
  setTooltipContent: (value: string) => void,
  setTooltip: (value: { x: number; y: number } | null) => void
) => {
  return useCallback(
    (event: cytoscape.EventObject) => {
      const node = event.target;
      setTooltipContent(`ID: ${node.id()}, Label: ${node.data('label')}`);
      setTooltip({ x: event.renderedPosition.x, y: event.renderedPosition.y });
    },
    [setTooltipContent, setTooltip]
  );
};
