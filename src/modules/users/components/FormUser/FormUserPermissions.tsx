// path: /components/FormUserComponents/FormUserPermissions.tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components';
import { useFormUserContext } from './FormUserContext';

import { Module } from '@/modules/core/interfaces/ResponseGetAllModules';
import { FormUserPermissionAction } from './FormUserPermissionAction';

export const FormUserPermissions = () => {
  const {
    data,
    handleSelectAllActions,
    handleInselectAllActions,
    handleSelectAllActionInModule,
    handleInselectAllActionsInModule,
    userHasAction,
    readOnly,
  } = useFormUserContext();

  return (
    <>
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
        {data?.map(({ label, actions, name }: Module) => (
          <Card key={name} className="mb-2 w-72">
            <CardHeader className="border-b">
              <CardTitle className="capitalize">{label}</CardTitle>
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
        ))}
      </div>
    </>
  );
};
