import { BreadCrumb } from '@/modules/core/components';
import { WorksModuleProvider } from './WorkModuleContext';
import { WorkModuleTable } from './WorkModuleTable';
import { WorkModuleActions } from './WorkModuleActions';
import { WorkModuleSearchbar } from './WorkModuleSearchbar';

export const WorkModule = () => {
  return (
    <WorksModuleProvider>
      <BreadCrumb finalItem="Trabajos" hiddenSeparator/>
      <WorkModuleSearchbar />
      <WorkModuleActions />
      <WorkModuleTable />
    </WorksModuleProvider>
  );
};

export default WorkModule;
