import { BreadCrumb } from '@/modules/core/components';
import { ShoppingModuleProvider } from './ShoppingModuleContext';
import { ShoppingModuleTable } from './ShoppingModuleTable';
import { ShoppingModuleActions } from './ShoppingModuleActions';
import { ShoppingModuleSearchbar } from './ShoppingModuleSearchbar';

export const ShoppingModule: React.FC = () => {
  return (
    <ShoppingModuleProvider>
      <BreadCrumb finalItem="Compras" hiddenSeparator />
      <ShoppingModuleSearchbar />
      <ShoppingModuleActions />
      <ShoppingModuleTable />
    </ShoppingModuleProvider>
  );
};

export default ShoppingModule;
