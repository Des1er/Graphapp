import { useCallback } from 'react';

export const useEdgeDirectionChange = (setSelectedEdgeDirection: (value: string) => void) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedEdgeDirection(event.target.value);
    },
    [setSelectedEdgeDirection]
  );
};
