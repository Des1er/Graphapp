import { useCallback } from 'react';

export const useNodeShapeChange = (setNodeShape: (value: 'ellipse' | 'triangle' | 'rectangle' | 'diamond') => void) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setNodeShape(event.target.value as 'ellipse' | 'triangle' | 'rectangle' | 'diamond');
    },
    [setNodeShape]
  );
};
