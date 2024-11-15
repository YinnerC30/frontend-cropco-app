export interface RouteConfig {
  path: string;
  action: string;
  element: JSX.Element;
  viewComponent?: boolean;
}
