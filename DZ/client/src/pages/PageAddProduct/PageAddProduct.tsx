import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { TailSpin } from 'react-loader-spinner';
import { getManufacturer } from 'api/manufacturer';
import { addProduct } from 'api/product';
import { ProductType } from 'api/types';

import { Button } from 'components/Button';
import { CustomField } from 'components/fields/CustomField';
import { CustomSelector } from 'components/fields/CustomSelector';
import { Option } from 'components/fields/CustomSelector/CustomSeletor.types';
import { Navbar } from 'components/Navbar/Navbar';
import { StyledForm } from 'components/StyledForm/StyledForm.styles';
import { sleep } from 'utils/sleep';

import { InputWrapper } from './PageAddProduct.styles';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const PageAddHotel = () => {
  const [loading, setLoading] = useState(false);
  const [manufacturers, setManufacturers] = useState<Option[] | undefined>(
    undefined,
  );

  useEffect(() => {
    setLoading(true);

    getManufacturer().then(async (values) => {
      if (values) {
        await sleep(500);
        const options = values.map((val) => ({
          value: val.pk,
          label: val.name,
        }));
        setManufacturers(options);
      }
      setLoading(false);
    });
  }, []);

  const onSubmit = useCallback(
    async (
      values: Record<string, string | Record<string, string | number>>,
    ) => {
      setLoading(true);

      if (!values['name']) {
        return { error: 'error' };
      }

      const manufacturer = values['manufacturer'] as Record<string, number>;
      const newValues: Partial<ProductType> = {
        ...values,
        id_manufacturer: manufacturer['value'],
      };

      return addProduct(newValues).then(async (value) => {
        if (value) {
          await sleep(2000);
        } else {
          console.error('Error while POST hotel fetch');
        }
        setLoading(false);
      });
    },
    [],
  );

  return (
    <>
      <Navbar />
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          return errors;
        }}
        render={({ submitting, form, handleSubmit }) =>
          loading ? (
            <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
              <TailSpin arialLabel="loading-indicator" />
            </div>
          ) : (
            <StyledForm
              onSubmit={async (event) => {
                await handleSubmit(event);
                form.reset();
              }}
            >
              <InputWrapper>
                <label htmlFor="name">Название</label>
                <CustomField
                  name="name"
                  type="text"
                  component="input"
                  placeholder="Название"
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="price">Стоимость</label>
                <CustomField
                  name="price"
                  type="text"
                  component="input"
                  placeholder="Стоимость"
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="imgSrc">Ссылка на изображение</label>
                <CustomField
                  name="imgSrc"
                  type="text"
                  component="input"
                  placeholder="Ссылка"
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="manufacturer">Производитель</label>
                <CustomSelector
                  name="manufacturer"
                  placeholder="Выберите..."
                  component="input"
                  options={manufacturers}
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="weight">Вес</label>
                <CustomField
                  name="weight"
                  type="text"
                  component="input"
                  placeholder="Вес"
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="description">Описание</label>
                <CustomField
                  name="description"
                  type="text"
                  component="textarea"
                  placeholder="Описание..."
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="quantity">Количество</label>
                <CustomField
                  name="quantity"
                  type="text"
                  component="input"
                  placeholder="Количество"
                />
              </InputWrapper>
              <Button type="submit" disabled={submitting}>
                Добавить
              </Button>
            </StyledForm>
          )
        }
      />
    </>
  );
};
