import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { CapitalizeFirstWord } from '@/modules/authentication/helpers/CapitalizeFirstWord';
import { ErrorLoading, Loading } from '@/modules/core/components';
import { useGetAllModules } from '@/modules/core/hooks/useGetAllModules';

const ModuleAction = ({ name_action }: any) => {
  return (
    <div className="flex justify-between gap-2 ">
      <span className="text-xs ">{name_action}</span>
      <Switch />
    </div>
  );
};

export const UpdateUserActions = ({className}:any) => {
  const { data, isLoading, isError } = useGetAllModules();

  // const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  // const handleCancel = () => {
  //   navigate('../all');
  // };

  return (
    <div className={className}>
      {data.map(({ label, actions, name }: any) => {
        return (
          <Card key={name} className="w-2/4 mb-2">
            <CardHeader className="border-b">
              <CardTitle className="capitalize ">{label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap gap-4 m-2 rounded-md">
              {actions.map((act: any) => {
                return (
                  <div key={act.name}>
                    <ModuleAction name_action={CapitalizeFirstWord(act.name)} />
                  </div>
                );
              })}
            </CardContent>
            <CardFooter>
              {/* <Button variant={"link"}>Marcar todas</Button> */}
              {/* <Button variant={"ghost"}>Desmarcar todas</Button> */}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
