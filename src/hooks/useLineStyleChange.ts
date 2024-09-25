import { useCallback } from 'react';

export const useLineStyleChange = (setSelectedLineStyle: (value: string) => void) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedLineStyle(event.target.value);
    },
    [setSelectedLineStyle]
  );
};
