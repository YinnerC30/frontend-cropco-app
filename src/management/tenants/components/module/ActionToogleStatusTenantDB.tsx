import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import React from 'react';
import { usePatchTenantStatus } from '../../hooks/mutations/usePatchStatusTenant';
import { usePatchTenantDBStatus } from '../../hooks/mutations/usePatchStatusTenantDB';

interface Props {
  id: string;
  status: boolean;
  disabled?: boolean;
}

export const ActionToogleStatusTenantDB: React.FC<Props> = ({
  id,
  status,
  disabled = false,
}) => {
  // const { user } = useAuthContext();
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = usePatchTenantDBStatus();

  const handleToggleTenantDB = () => {
    mutate(id, { onSuccess: () => toggleOpen(false) });
  };

  // const showToast = () => {
  //   toast('Se cerrara la sesión', {
  //     description:
  //       'Esta por desactivar su usuario, si desea continuar por favor presione "Desactivar"',
  //     action: {
  //       label: 'Desactivar',
  //       onClick: handleToggleTenant,
  //     },
  //     duration: 3000,
  //   });
  //   // return toast({
  //   //   title: 'Se cerrara la sesión',
  //   //   duration: 3000,
  //   //   description:
  //   //     'Esta por desactivar su usuario, si desea continuar por favor presione "Desactivar"',

  //   //   action: (
  //   //     <ToastAction
  //   //       onClick={() => {
  //   //         executeMutation();
  //   //       }}
  //   //       altText="Desactivar"
  //   //     >
  //   //       Desactivar
  //   //     </ToastAction>
  //   //   ),
  //   // });
  // };

  // const handleToggleStatus = () => {
  //   if (user?.id === id) {
  //     showToast();
  //   } else {
  //     handleToggleTenant();
  //   }
  // };

  return (
    <DropdownMenuItem asChild>
      <Button
        type="button"
        onClick={handleToggleTenantDB}
        variant={'ghost'}
        className="cursor-pointer"
        disabled={status}
      >
        {status ? (
          <>
            <ToggleLeft className="w-4 h-4 mr-2" /> Ya se migró
          </>
        ) : (
          <>
            <ToggleRight className="w-4 h-4 mr-2" /> Migrar DB
          </>
        )}
      </Button>
    </DropdownMenuItem>
  );
};
