import { useCallback } from 'react';

export const useEdgeTypeChange = (setSelectedEdgeType: (value: string) => void) => {
  return useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedEdgeType(event.target.value);
    },
    [setSelectedEdgeType]
  );
};
