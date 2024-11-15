// path: /components/UsersModule.tsx

import {
  UsersActions,
  UsersSearchBar,
  UsersTable,
} from './UsersModuleComponents';
import { UsersBreadCrumb } from './UsersModuleComponents/UsersBreadCrumb';
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
