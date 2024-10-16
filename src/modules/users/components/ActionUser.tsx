import { Switch } from '@/components/ui/switch';
import { CapitalizeFirstWord } from '@/modules/authentication/helpers/CapitalizeFirstWord';
import { useAppDispatch } from '@/redux/store';
import { updateActions } from '../utils/userSlice';

export const ActionUser = ({ action, readOnly, isChecked }: any) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between gap-2 ">
      <span className="text-xs ">{CapitalizeFirstWord(action.description)}</span>
      <Switch
        disabled={readOnly}
        checked={isChecked}
        defaultChecked={isChecked}
        onCheckedChange={(value: boolean) => {
          dispatch(updateActions({ id: action.id, state: value }));
        }}
      />
    </div>
  );
};
