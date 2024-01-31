import styled from "styled-components";

/* eslint-disable-next-line */
export interface SitesProps {}

const StyledSites = styled.div`
  color: pink;
`;

export function Sites(props: SitesProps) {
  return (
    <StyledSites>
      <h1>Welcome to Sites!</h1>
    </StyledSites>
  );
}

export default Sites;
