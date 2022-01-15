import React, { ChangeEvent, useCallback } from 'react';
import { Field, Form } from 'react-final-form';
import { URLSearchParamsInit } from 'react-router-dom';

import { Button } from 'components/Button';
import { CustomInput } from 'components/fields/CustomField/CustomField.styles';
import { StyledLink } from 'components/StyledLink/StyledLink.style';

import { NavbarWrapper } from './Navbar.styles';

export type NavbarProps = {
  detailed?: boolean;
  onChange?: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined,
  ) => void;
};

export const Navbar = ({ detailed, onChange }: NavbarProps) => {
  const onFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange({ productName: event.target.value });
  }, []);

  return (
    <NavbarWrapper>
      <StyledLink to="/product">
        <Button>Главная</Button>
      </StyledLink>
      <StyledLink to="/manufacturer">
        <Button>Производители</Button>
      </StyledLink>
      <StyledLink to="/product/add">
        <Button>Добавить товар</Button>
      </StyledLink>
      <StyledLink to="/manufacturer/add">
        <Button>Добавить производителя</Button>
      </StyledLink>
      {detailed && (
        <div style={{ display: 'flex', justifyContent: 'center ' }}>
          <Form
            onSubmit={() => {
              //
            }}
            render={() => (
              <Field name="name">
                {({ input }) => (
                  <CustomInput
                    {...input}
                    placeholder="Поиск по сайту..."
                    onChange={(e) => {
                      input.onChange(e);
                      onFilter(e);
                    }}
                  />
                )}
              </Field>
            )}
          />
        </div>
      )}
    </NavbarWrapper>
  );
};
