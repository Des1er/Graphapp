import { useCallback } from 'react';

export const useAttributeChange = (setSelectedAttribute: (value: string) => void) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedAttribute(event.target.value);
    },
    [setSelectedAttribute]
  );
};
