import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components';
import { useFormUserContext } from '../../hooks';

import {
  Module,
  Action,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';
import { FormUserPermissionAction } from './FormUserPermissionAction';
import { memo } from 'react';
import { CatIcon } from 'lucide-react';
import { getRouteIcon } from '@/routes/components';

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
          <Button
            variant="ghost"
            onClick={() => handleSelectAllActionInModule(name)}
          >
            Marcar todo
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleInselectAllActionsInModule(name)}
          >
            Desmarcar todo
          </Button>
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
        <Button onClick={handleSelectAllActions}>Marcar todo</Button>
        <Button onClick={handleInselectAllActions}>Desmarcar todo</Button>
      </div>
      <div className="flex flex-wrap gap-2 my-2 justify-evenly">
        {queryModules?.data?.map(({ label, actions, name }: Module) => (
          <ModuleCard key={name} label={label} actions={actions} name={name} />
        ))}
      </div>
    </div>
  );
};
