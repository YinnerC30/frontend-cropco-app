import { toast } from 'sonner';

interface Props {
//   data: UseDeleteBulkResponse;
  status: number;
  customMessages?: {
    success?: string;
    conflict?: string;
    multiStatus?: string;
    other?: string;
  };
}

export const ManageMessageBulkRemove = (props: Props) => {
  const { status, customMessages } = props;

  if (status == 200) {
    toast.success(
      customMessages?.success || 'Los registros seleccionados fueron eliminados'
    );
  } else if (status == 207) {
    toast.info(
      customMessages?.multiStatus || 'Algunos registros no fueron eliminados'
    );
  }
};
