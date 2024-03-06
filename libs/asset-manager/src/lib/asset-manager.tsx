import styled from "styled-components";

/* eslint-disable-next-line */
export interface AssetManagerProps {}

const StyledAssetManager = styled.div`
  color: pink;
`;

export function AssetManager(props: AssetManagerProps) {
  return (
    <StyledAssetManager>
      <h1>Welcome to AssetManager!</h1>
    </StyledAssetManager>
  );
}

export default AssetManager;
