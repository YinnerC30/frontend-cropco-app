import { BasicSearchBar } from '@/modules/core/components';
import React from 'react';
import { useSuppliesModuleContext } from '../../hooks';

export const SuppliesSearchBar: React.FC = () => {
  const { paramQuery, actionsSuppliesModule } = useSuppliesModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={paramQuery}
        disabled={!actionsSuppliesModule['find_all_supplies']}
      />
    </div>
  );
};
