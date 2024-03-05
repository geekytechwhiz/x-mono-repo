export interface userGroupsProps {
  startIndex: number;
}
export interface userGroupsResponse {
  success: boolean;
}
export interface userGroupsResult {
  contents: object[];
  isLoading: boolean;
  error: any;
  fetchMore: () => void;
  refetch: () => void;
}
