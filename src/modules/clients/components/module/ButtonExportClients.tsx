import { Button } from '@/components';
import { ToolTipTemplate } from '@/modules/core/components';
import { FileUp } from 'lucide-react';
import { useState } from 'react';
import { useGetReportClients } from '../../hooks/queries/useGetReportClients';

export const ButtonExportClients: React.FC<{ disabled: boolean }> = ({
  disabled,
}) => {
  const [runQuery, setRunQuery] = useState(false);
  const [showReport, setSetShowReport] = useState(false);

  const handleDisabledQuery = () => {
    setRunQuery(false);
    setSetShowReport(false);
  };
  const handleClick = () => {
    setRunQuery(true);
    setSetShowReport(true);
  };

  useGetReportClients({
    executeQuery: runQuery,
    showReport,
    actionOnSuccess: handleDisabledQuery,
  });

  return (
    <ToolTipTemplate content="Exportar registros">
      <Button
        variant={'outline'}
        size={'icon'}
        onClick={handleClick}
        disabled={disabled}
      >
        <FileUp className="w-4 h-4" />
      </Button>
    </ToolTipTemplate>
  );
};
