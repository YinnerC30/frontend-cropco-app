import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';

import { calculateTotal, remove } from '../../utils/harvestSlice';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { useFormHarvestContext } from '../../hooks';
import { Button, DropdownMenuItem } from '@/components';

export const ActionsTableHarvestDetail = ({ harvestDetail }: any) => {
  const dispatch = useAppDispatch();
  const { setHarvestDetail, handleOpenDialog } = useFormHarvestContext();

  const handleDelete = () => {
    dispatch(remove(harvestDetail));
    dispatch(calculateTotal());
    toast.success(
      `Se ha eliminado la cosecha del empleado ${harvestDetail.employee.first_name}`
    );
  };

  const handleModify = () => {
    console.log('Hay un click');
    setHarvestDetail(harvestDetail);
    handleOpenDialog();
    console.log('hubo un llamado');
  };

  return (
    // <ActionsTable open={openDropDownMenu} onChange={setOpenDropDownMenu}>
    //   <ItemCopyIdRecord id={harvestDetail.id} onChange={setOpenDropDownMenu} />
    //   <ItemDeleteRecord action={handleDelete} onChange={setOpenDropDownMenu} />
    //   <ItemModifyRecordDetail setOpenDialog={setDialogOpen}>
    //     <ModifyHarvestDetail />
    //   </ItemModifyRecordDetail>
    // </ActionsTable>
    <DropDownMenuActions>
      <ActionCopyIdRecord id={harvestDetail.id} />
      <ActionDeleteRecord action={handleDelete} disabled={false} />
      <DropdownMenuItem asChild>
        <Button variant={'ghost'} onClick={() => handleModify()}>
          Modificar
        </Button>
      </DropdownMenuItem>
    </DropDownMenuActions>
  );
};
