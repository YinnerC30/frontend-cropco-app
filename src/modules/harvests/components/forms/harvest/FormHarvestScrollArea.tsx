import React from 'react';
import { ScrollArea } from '@/components';

export const FormHarvestScrollArea = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ScrollArea className="h-[72vh] w-full pb-2">{children}</ScrollArea>;
};
