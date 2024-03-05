export type multiTagSelectProps = {
  tags: string[];
  handleCallback: (event: any, val: any) => void;
  error: boolean;
  errorText: string;
};
