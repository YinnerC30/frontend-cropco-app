import { PropsWithChildren } from 'react';
import { DataTableMenuActionsProvider } from './DataTableMenuActionsContext';

interface Props extends PropsWithChildren {
  idRecord?: string;
}

export const DropDownMenuActions: React.FC<Props> = ({
  idRecord = 'no-implemented',
  children,
}) => {
  return (
    <DataTableMenuActionsProvider idRow={idRecord}>
      <div
        className="flex flex-col items-center"
        data-testid={`actions-row-id-${idRecord}`}
      >
        {children}
      </div>
    </DataTableMenuActionsProvider>
  );
};
