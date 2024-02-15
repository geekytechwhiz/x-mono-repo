export enum MenuActions {
  DELETE = "delete",
  INVITE_USER = "inviteuser",
  LEAVE = "leave",
  Remove_USER = "removeuser",
}

export interface MenuActionsType {
  inviteuser: boolean;
  isLeave: boolean;
  isDelete: boolean;
  removeuser: boolean;
}
