import useDocumentTitle from '@/modules/core/hooks/useDocumentTitle';

interface Props {
  titlePage: string;
  children: React.ReactNode;
}

export const CustomLazyLoadComponent = ({ titlePage, children }: Props) => {
  useDocumentTitle({ title: titlePage });
  return <>{children}</>;
};

export default CustomLazyLoadComponent;
