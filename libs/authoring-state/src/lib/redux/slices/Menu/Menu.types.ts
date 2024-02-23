export type NavTreeInstance = {
  Title: any;
  ParentId: any;
  URL: any;
  Tagging: any;
  Text: any;
  Label: any;
  Score: any;
  createdBy: any;
  LastModifiedBy?: string;
  Menu_State: any;
  Internal: any;
  IsHidden: any;
  HomePage: any;
  Menu_Id: any;
};
export type InitialStateInstance = {
  navTreeArray: NavTreeInstance[] | [];
  currentArray: NavTreeInstance | any;
};
