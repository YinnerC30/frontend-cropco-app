import { useTheme } from '@/modules/core/components/shared/ThemeProvider';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return <Sonner theme={theme as ToasterProps['theme']} {...props} />;
};

export { Toaster };
