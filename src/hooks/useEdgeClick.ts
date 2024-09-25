import { useCallback } from 'react';
import cytoscape from 'cytoscape';

export const useEdgeClick = (
  setSelectedEdge: (edge: cytoscape.SingularElementReturnValue) => void,
  setSelectedAttribute: (attribute: string) => void,
  setSelectedEdgeType: (type: string) => void,
  setSelectedEdgeDirection: (direction: string) => void,
  setSelectedLineStyle: (lineStyle: string) => void,
  setEdgeThickness: (width: number) => void,
  setIsSelecting: (value: boolean) => void,
  setShowNodeEditor: (value: boolean) => void,
  setShowEdgeEditor: (value: boolean) => void
) => {
  return useCallback(
    (event: cytoscape.EventObject) => {
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
    },
    [
      setSelectedEdge,
      setSelectedAttribute,
      setSelectedEdgeType,
      setSelectedEdgeDirection,
      setSelectedLineStyle,
      setEdgeThickness,
      setIsSelecting,
      setShowNodeEditor,
      setShowEdgeEditor
    ]
  );
};
