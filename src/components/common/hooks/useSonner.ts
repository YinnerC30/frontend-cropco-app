import { toast } from 'sonner';

export const useSonner = ({ message }: { message: string }) => {
  const handleSonner = () => {
    toast(message);
  };
  return {
    handleSonner,
  };
};
