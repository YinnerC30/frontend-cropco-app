interface Props {
  className: string;
  children: React.ReactNode;
}

export const NavBar = ({ className, children }: Props) => {
  return <nav className={className}>{children}</nav>;
};
