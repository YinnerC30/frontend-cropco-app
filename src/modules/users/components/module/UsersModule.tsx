import { BreadCrumb } from '@/modules/core/components';
import { UsersActions } from './UsersActions';
import { UsersModuleProvider } from './UsersModuleContext';
import { UsersSearchBar } from './UsersSearchBar';
import { UsersTable } from './UsersTable';

export const UsersModule = () => {
  return (
    <UsersModuleProvider>
      <div className="select-none">
        <BreadCrumb finalItem="Usuarios" hiddenSeparator />
        <UsersSearchBar />
        <UsersActions />
        <UsersTable />
      </div>
    </UsersModuleProvider>
  );
};

export default UsersModule;
