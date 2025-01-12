interface Props {
  className: string;
  children: React.ReactNode;
}

export const Header = ({ className, children }: Props) => {
  return <header className={className}>{children}</header>;
};
