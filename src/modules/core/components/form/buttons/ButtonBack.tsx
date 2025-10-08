import { Button } from '@/components';

interface Props {
  handleNavigation: () => void;
}

export const ButtonBack: React.FC<Props> = ({ handleNavigation }) => {
  return (
    <Button
      className="my-2"
      data-testid="form-back-button"
      onClick={handleNavigation}
    >
      Volver
    </Button>
  );
};
