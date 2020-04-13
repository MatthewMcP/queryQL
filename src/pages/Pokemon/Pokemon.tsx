/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { logError } from '../../util';
import { Country } from './Types';
import { Card } from '../../shared/component/index';

const EXCHANGE_RATES = gql`
  {
    countries {
      name
      native
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;
const Pokemon = (): JSX.Element => {
  const [countries, setCountries] = useState<Country[][]>([]);
  useQuery(EXCHANGE_RATES, {
    onCompleted: data => {
      if (data && data.countries) setCountries(data.countries);
    },
    onError: error => {
      logError(error);
    },
  });

  return (
    <div>
      <div>Pokemon</div>
      <Card data={countries} />
    </div>
  );
};
export default Pokemon;
