// path: /components/UsersModule.tsx

import {
  UsersActions,
  UsersSearchBar,
  UsersTable,
} from '.';
import { UsersBreadCrumb } from './UsersBreadCrumb';
import { UsersModuleProvider } from './UsersModuleContext';

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
