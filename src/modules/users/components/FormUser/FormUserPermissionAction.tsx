import { Switch } from '@/components/ui/switch';
import { CapitalizeFirstWord } from '@/modules/authentication/helpers';
import { Action } from '@/modules/core/interfaces/Responses/ResponseGetAllModules';

import { useFormUserContext } from './FormUserContext';

interface Props {
  action: Action;
  readOnly: boolean;
  isChecked: boolean;
}

export interface UserAction {
  id: string;
  isActive?: boolean;
}

export const FormUserPermissionAction = ({
  action,
  readOnly,
  isChecked,
}: Props) => {
  const { updateActionsUserForm } = useFormUserContext();

  const handleOnChange = (isActive: boolean) => {
    updateActionsUserForm([{ id: action.id, isActive }]);
  };

  return (
    <div className="flex justify-between gap-2">
      <span className="text-xs">{CapitalizeFirstWord(action.description)}</span>
      <Switch
        disabled={readOnly}
        checked={isChecked}
        defaultChecked={isChecked}
        onCheckedChange={handleOnChange}
      />
    </div>
  );
};