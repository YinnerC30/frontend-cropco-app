export const FormDataTableActions = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`flex items-center justify-end gap-4 ${className}`}>{children}</div>;
};
