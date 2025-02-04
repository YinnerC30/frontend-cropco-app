export interface Module {
  id: string;
  name: string;
  label: string;
  actions: Action[];
}

export interface Action {
  id: string;
  name: string;
  description: string;
  path_endpoint: string;
  is_visible: boolean;
}
