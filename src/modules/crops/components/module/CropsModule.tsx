import { CropsActions } from './CropsActions';
import { CropsBreadCrumb } from './CropsBreadCrumb';
import { CropsModuleProvider } from './CropsModuleContext';
import { CropsSearchBar } from './CropsSearchBar';
import { CropsTable } from './CropsTable';

export const CropsModule = () => {
  return (
    <CropsModuleProvider>
      <div className="select-none">
        <CropsBreadCrumb />
        <CropsSearchBar />
        <CropsActions />
        <CropsTable />
      </div>
    </CropsModuleProvider>
  );
};

export default CropsModule;
