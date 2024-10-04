import { Switch } from "@/components/ui/switch";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { useGetAllModules } from "@/modules/core/hooks/useGetAllModules";

const ModuleTitle = ({ children }: any) => {
  return <h2 className="text-2xl capitalize">{children}</h2>;
};

const ModuleAction = ({ name_action }: any) => {
  return (
    <div className="flex items-center justify-between gap-2 m-2 w-60 ">
      <span className="capitalize">{name_action}</span>
      <Switch />
    </div>
  );
};

export const UpdateUserActions = () => {
  const { data, isLoading, isError } = useGetAllModules();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <div className="w-4/5">
      {data.map(({ name, actions }: any) => {
        return (
          <>
            <ModuleTitle>{name}</ModuleTitle>
            <div className="flex flex-row flex-wrap gap-4 m-2 bg-gray-300 rounded-md">
              {actions.map((act: any) => {
                return (
                  <ModuleAction name_action={act.name.replaceAll("-", " ")} />
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};
