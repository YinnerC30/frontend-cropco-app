import { Button } from '@/components';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { memo } from 'react';
import { Link } from 'react-router-dom';

export const HarvestProcessedReturnButton: React.FC = memo(() => {
  return (
    <div className="flex justify-center">
      <Button variant="default" asChild>
        <Link to={MODULE_HARVESTS_PATHS.ViewAll}>Volver</Link>
      </Button>
    </div>
  );
});
