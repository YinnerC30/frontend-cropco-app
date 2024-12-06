import { ScrollArea } from '@/components';
import { memo } from 'react';
export const HarvestProcessedScrollArea = memo(
  ({ children }: { children: React.ReactNode }) => {
    return (
      <ScrollArea className={`h-[75vh] w-full pb-2 `}>{children}</ScrollArea>
    );
  }
);
