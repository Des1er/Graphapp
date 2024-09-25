import { useCallback } from 'react';

export const useNodeUnhover = (setTooltip: (value: null) => void) => {
  return useCallback(() => {
    setTooltip(null);
  }, [setTooltip]);
};
