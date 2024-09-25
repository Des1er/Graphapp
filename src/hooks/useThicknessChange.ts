import { useCallback } from 'react';

export const useThicknessChange = (setEdgeThickness: (value: number) => void) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEdgeThickness(Number(event.target.value));
    },
    [setEdgeThickness]
  );
};
