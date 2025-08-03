import { BreadCrumb } from "@/modules/core/components";
import { TenantsActions } from "./TenantsActions";
import { TenantsModuleProvider } from "./TenantsModuleContext";
import { TenantsSearchBar } from "./TenantsSearchBar";
import { TenantsTable } from "./TenantsTable";


export const TenantsModule: React.FC = () => {
  return (
    <TenantsModuleProvider>
      <div className="select-none">
        <BreadCrumb finalItem="Inquilinos" hiddenSeparator />
        <TenantsSearchBar />
        <TenantsActions />
        <TenantsTable />
      </div>
    </TenantsModuleProvider>
  );
};

export default TenantsModule; 