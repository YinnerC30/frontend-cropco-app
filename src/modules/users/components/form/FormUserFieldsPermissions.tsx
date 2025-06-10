import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Separator,
  Switch,
} from '@/components';
import { useFormUserContext } from '../../hooks';

import {
  Action,
  Module,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';
import { getRouteIcon } from '@/routes/components';
import { memo } from 'react';
import { FormUserPermissionAction } from './FormUserPermissionAction';

interface ModuleCardProps {
  label: string;
  actions: Action[];
  name: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = memo<ModuleCardProps>(
  ({ label, actions, name }) => {
    const {
      handleSelectAllActionInModule,
      handleInselectAllActionsInModule,
      userHasAction,
      readOnly,
    } = useFormUserContext();

    return (
      <Card key={name} className="mb-2 w-72">
        <CardHeader className="flex flex-row items-center justify-center gap-2 border-b">
          <CardTitle className="self-end capitalize">{label}</CardTitle>
          {getRouteIcon(name)}
        </CardHeader>
        <CardContent className="flex flex-col flex-wrap gap-4 m-2 rounded-md">
          <div className="flex items-center self-start justify-between w-full gap-2 py-4 border-b-2">
            <Label className="">Activar todo</Label>
            <Switch
              defaultChecked={false}
              onCheckedChange={(isCheked) => {
                isCheked
                  ? handleSelectAllActionInModule(name)
                  : handleInselectAllActionsInModule(name);
              }}
            />
          </div>

          {actions.map((action) => (
            <FormUserPermissionAction
              key={action.id}
              action={action}
              readOnly={readOnly}
              isChecked={userHasAction({ id: action.id })}
            />
          ))}
        </CardContent>
      </Card>
    );
  }
);

export const FormUserFieldsPermissions: React.FC = () => {
  const {
    queryModules,
    handleSelectAllActions,
    handleInselectAllActions,
    readOnly,
  } = useFormUserContext();

  return (
    <div>
      <Separator className="my-5" />
      <h3 className="text-xl">Permisos:</h3>
      <div
        className={`flex gap-2 my-2 items-center justify-center ${
          readOnly && 'hidden'
        }`}
      >
        <div className="flex items-center self-start gap-2 py-4 ">
          <Label className="">Activar todos los permisos</Label>
          <Switch
            defaultChecked={false}
            onCheckedChange={(isCheked) => {
              isCheked ? handleSelectAllActions() : handleInselectAllActions();
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 my-2 justify-evenly">
        {queryModules?.data?.map(({ label, actions, name }: Module) => (
          <ModuleCard key={name} label={label} actions={actions} name={name} />
        ))}
      </div>
    </div>
  );
};
