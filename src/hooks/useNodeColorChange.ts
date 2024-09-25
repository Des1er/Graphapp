import { useCallback } from 'react';

export const useNodeColorChange = (setNodeColor: (value: string) => void) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNodeColor(event.target.value);
    },
    [setNodeColor]
  );
};
