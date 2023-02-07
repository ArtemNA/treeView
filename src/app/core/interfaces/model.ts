export interface Account {
  id: number;
  name: string;
  index_name: string;
  accounts?: Account[];
  searched?: boolean;
}

export interface AccountFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  level: number;
  searched: boolean
}
