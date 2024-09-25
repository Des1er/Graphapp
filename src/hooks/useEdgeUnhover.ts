import { useCallback } from 'react';

export const useEdgeUnhover = (setEdgeTooltip: (value: null) => void) => {
  return useCallback(() => {
    setEdgeTooltip(null);
  }, [setEdgeTooltip]);
};
