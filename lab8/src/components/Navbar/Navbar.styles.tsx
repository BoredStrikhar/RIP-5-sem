import { Colors } from 'constants/colors';

import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid ${Colors.BORDER_MAIN};
  height: 50px;
  background-color: ${Colors.BODY_MAIN};
  & > a > button {
    font-size: 20px;
  }
  & > img {
    width: 46px;
    height: 46px;
  }
`;
