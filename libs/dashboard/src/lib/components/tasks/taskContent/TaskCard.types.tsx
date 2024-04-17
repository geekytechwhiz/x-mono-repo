export type TaskCardProps = {
  title: string;
  titleVariant: string;
  linkText?: string;
  children: any;
  isEmptyResult?: boolean;
  refetch?: boolean;
  refetchFunction?: () => {};
  refetchLoading?: boolean;
};
