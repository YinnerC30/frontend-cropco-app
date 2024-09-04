import { Route } from "@/routes/RoutesNavBar";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  route: Route;
  className: string;
}

export const NavElement = ({ route, className }: Props) => {
  const [isActiveLink, setIsActiveLink] = useState(false);
  const { name, Icon, path } = route;
  return (
    <div key={path} className={className}>
      <NavLink
        to={path}
        className={({ isActive }) => {
          if (isActive) {
            setIsActiveLink(true);
          } else {
            setIsActiveLink(false);
          }
          return "";
        }}
      >
        <div className={`flex gap-1 p-1 ${isActiveLink ? "bg-blue-500 rounded-md text-white" : ""}`}>
          <span>{Icon}</span>
          <span>{name}</span>
        </div>
      </NavLink>
    </div>
  );
};
