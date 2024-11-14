import { Switch } from '@/components/ui/switch';
import { CapitalizeFirstWord } from '@/modules/authentication/helpers';
import { useAppDispatch } from '@/redux/store';
import { updateActions } from '../utils';
import { Action } from '@/modules/core/interfaces/ResponseGetAllModules';

interface ActionUserProps {
  action: Action;
  readOnly: boolean;
  isChecked: boolean;
}

export const ActionUser = ({
  action,
  readOnly,
  isChecked,
}: ActionUserProps) => {
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
