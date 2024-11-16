import { Switch } from '@/components/ui/switch';
import { CapitalizeFirstWord } from '@/modules/authentication/helpers';
import { useAppDispatch } from '@/redux/store';

import { Action } from '@/modules/core/interfaces/Responses/ResponseGetAllModules';
import { updateActions } from '../../utils';

interface Props {
  action: Action;
  readOnly: boolean;
  isChecked: boolean;
}

export const FormUserPermissionAction = ({
  action,
  readOnly,
  isChecked,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between gap-2 ">
      <span className="text-xs ">
        {CapitalizeFirstWord(action.description)}
      </span>
      <Switch
        disabled={readOnly}
        checked={isChecked}
        defaultChecked={isChecked}
        onCheckedChange={(value: boolean) => {
          dispatch(updateActions([{ id: action.id, active: value }]));
        }}
      />
    </div>
  );
};
