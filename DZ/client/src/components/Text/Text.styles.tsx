import { Colors } from 'constants/colors';

import styled from 'styled-components';

import { TextProps } from './Text.types';

export const Text = styled.p<TextProps>`
  color: ${Colors.TEXT_MAIN_COLOR};
  font-family: Roboto;
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? '800' : '600')};

  margin: 0;
`;
