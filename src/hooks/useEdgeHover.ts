import { useCallback } from 'react';
import cytoscape from 'cytoscape';

export const useEdgeHover = (
  setEdgeTooltipContent: (value: string) => void,
  setEdgeTooltip: (value: { x: number; y: number } | null) => void,
  cyRef: React.RefObject<cytoscape.Core>
) => {
  return useCallback(
    (event: cytoscape.EventObject) => {
      const edge = event.target;
      const sourceNode = cyRef.current?.getElementById(edge.data('source'));
      const targetNode = cyRef.current?.getElementById(edge.data('target'));

      const sourceLabel = sourceNode?.data('label');
      const targetLabel = targetNode?.data('label');
      const attribute = edge.data('attribute');

      setEdgeTooltipContent(`From: ${sourceLabel}\nTo: ${targetLabel}\nAttribute: ${attribute}`);
      setEdgeTooltip({ x: event.renderedPosition.x, y: event.renderedPosition.y });
    },
    [setEdgeTooltipContent, setEdgeTooltip, cyRef]
  );
};
