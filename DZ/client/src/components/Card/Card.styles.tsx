import { Colors } from 'constants/colors';

import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  flex: 1 0 26%;
  position: relative;
  height: 300px;
  border: 1px solid ${Colors.BORDER_MAIN};
  border-radius: 16px;
  margin: 26px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.CARD_MAIN};
`;
