import { DataTableMenuActionsProvider } from './DataTableMenuActionsContext';

export const DropDownMenuActions = ({ children }: any) => {
  return (
    <DataTableMenuActionsProvider>{children}</DataTableMenuActionsProvider>
  );
};
