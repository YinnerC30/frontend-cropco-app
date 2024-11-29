import { UsersActions } from './UsersActions';
import { UsersBreadCrumb } from './UsersBreadCrumb';
import { UsersModuleProvider } from './UsersModuleContext';
import { UsersSearchBar } from './UsersSearchBar';
import { UsersTable } from './UsersTable';

export const UsersModule = () => {
  return (
    <UsersModuleProvider>
      <div className="select-none">
        <UsersBreadCrumb />
        <UsersSearchBar />
        <UsersActions />
        <UsersTable />
      </div>
    </UsersModuleProvider>
  );
};

export default UsersModule;
