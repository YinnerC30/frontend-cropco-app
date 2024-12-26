import { BreadCrumb } from '@/modules/core/components';
import { CropsActions } from './CropsActions';
import { CropsModuleProvider } from './CropsModuleContext';
import { CropsSearchBar } from './CropsSearchBar';
import { CropsTable } from './CropsTable';

export const CropsModule: React.FC = () => {
  return (
    <CropsModuleProvider>
      <div className="select-none">
        <BreadCrumb finalItem="Cultivos" hiddenSeparator />
        <CropsSearchBar />
        <CropsActions />
        <CropsTable />
      </div>
    </CropsModuleProvider>
  );
};

export default CropsModule;
