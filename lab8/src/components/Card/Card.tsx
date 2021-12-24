import { Colors } from 'constants/colors';

import React, { useCallback } from 'react';
import { removeProductById } from 'api';
import { ReactComponent as IcClose } from 'assets/icons/close.svg';

import { Button } from 'components/Button';
import { Image } from 'components/Image';
import { StyledLink } from 'components/StyledLink/StyledLink.style';
import { Text } from 'components/Text';

import { CardWrapper } from './Card.styles';
import { CardProps } from './Card.types';
import { CardNavbar } from './CardNavbar';

export const Card = ({ data, onRemove, hasButton }: CardProps): JSX.Element => {
  const handleRemoveCard = useCallback(async () => {
    await removeProductById(data.pk);
    if (onRemove) {
      onRemove();
    }
  }, []);

  return (
    <CardWrapper>
      <CardNavbar>
        <Button round onClick={handleRemoveCard}>
          <IcClose width={16} height={16} />
        </Button>
      </CardNavbar>
      <Image src={data.imgSrc}></Image>
      <Text bold>{data.name}</Text>
      <Text>Цена: {data.price} руб.</Text>
      <Text>Количество на складе: {data.quantity}</Text>
      <Text>Производитель: {data.manufacturer}</Text>
      <Text>Вес: {data.weight} г.</Text>
      <Text>Срок годности: {data.expiration_date}</Text>
      <Text>Описание: {data.description}</Text>
      {hasButton && (
        <StyledLink to={`/products/${data.pk}`}>
          <Button backgroundColor={Colors.MAIN} backgroundHoverColor={Colors.MAIN_HOVERED}>
            Открыть
          </Button>
        </StyledLink>
      )}
    </CardWrapper>
  );
};
