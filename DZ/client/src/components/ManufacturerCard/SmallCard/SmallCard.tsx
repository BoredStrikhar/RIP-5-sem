import { Colors } from 'constants/colors';

import React from 'react';

import { Button } from 'components/Button';
import { CardProps } from 'components/Card/Card.types';
import { Image } from 'components/Image';
import { StyledLink } from 'components/StyledLink/StyledLink.style';
import { Text } from 'components/Text';

import { SmallCardWrapper } from './SmallCard.styles';

export const SmallCard = ({ data, detailed }: CardProps): JSX.Element => {
  return (
    <SmallCardWrapper>
      <Image src={data.imgSrc}></Image>
      <Text bold>{data.name}</Text>
      <Text>Количество: {data.quantity} шт.</Text>
      <Text>Стоимость: {data.price} руб.</Text>
      <Text>Вес: {data.weight} гр.</Text>
      {detailed && (
      <Text>Описание: {data.description}</Text>
      )}
      {!detailed ? (
        <StyledLink to={`/product/${data.pk}`}>
          <Button
            backgroundColor={Colors.MAIN}
            backgroundHoverColor={Colors.MAIN_HOVERED}
          >
            Открыть
          </Button>
        </StyledLink>
      ) : (
        <StyledLink to={`/product/${data.pk}/edit`}>
          <Button
            backgroundColor={Colors.MAIN}
            backgroundHoverColor={Colors.MAIN_HOVERED}
          >
            Редактировать
          </Button>
        </StyledLink>
      )}
    </SmallCardWrapper>
  );
};
