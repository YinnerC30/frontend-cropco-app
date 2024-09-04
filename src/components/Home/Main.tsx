interface Props {
  className: string;
  children: React.ReactNode;
}

export const Main = ({ className, children }: Props) => {
  return <main className={className}>{children}</main>;
};
