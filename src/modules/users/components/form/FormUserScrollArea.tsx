import React from 'react';
import { ScrollArea } from '@/components';

export const FormUserScrollArea: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ScrollArea className="h-[72vh] w-full pb-2">{children}</ScrollArea>;
};
