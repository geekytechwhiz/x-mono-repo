import styled from "styled-components";

/* eslint-disable-next-line */
export interface AssetsManagerProps {}

const StyledAssetsManager = styled.div`
  color: pink;
`;

export function AssetsManager(props: AssetsManagerProps) {
  return (
    <StyledAssetsManager>
      <h1>Welcome to AssetsManager!</h1>
    </StyledAssetsManager>
  );
}

export default AssetsManager;
