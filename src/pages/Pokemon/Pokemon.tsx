import React, { useEffect, useState, ChangeEvent } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';
import { ToastContainer, toast } from 'react-toastify';
import { logError, useQueryString } from '../../util';
import { Country } from './Types';
import { Card } from '../../shared/components/index';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TinyUrl = require('tinyurl');

const Pokemon = (): JSX.Element => {
  const defaultQueryString = `{
    countries {
      name
      native
      capital
      phone
      emoji
      currency
      languages {
        name
      }
    }
  }`;

  // TODO: Remove the default closer to 'release'
  const { value, onSetValue } = useQueryString('state', defaultQueryString);
  const [query, setQueryText] = useState(value);
  const debounceTime = 1000;
  const [debouncedQueryText] = useDebounce(query, debounceTime);

  useEffect(() => {
    onSetValue(debouncedQueryText);
  }, [debouncedQueryText]);

  const handleQueryChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLTextAreaElement;
    setQueryText(target.value);
  };

  const [countries, setCountries] = useState<Country[][]>([]);
  useQuery(gql(debouncedQueryText), {
    skip: !debouncedQueryText,
    onCompleted: data => {
      if (data && data.countries) setCountries(data.countries);
    },
    onError: error => {
      logError(error);
      setCountries([]);
    },
  });

  const hanldeButtonClick = (): any => {
    TinyUrl.shorten(window.location.href, function(
      shortenedUrl: string,
      error: Error
    ) {
      if (error) {
        logError(error);
      }
      navigator.clipboard.writeText(shortenedUrl);
      toast(`${shortenedUrl} Copied to clipboard`);
    });
  };

  return (
    <div className="container mx-auto px-6">
      <ToastContainer autoClose={3000} pauseOnHover />

      <h1 className="flex justify-center text-white mb-8">Pokemon</h1>
      <button onClick={hanldeButtonClick} type="button">
        Copy shortened URL to clipboard
      </button>
      <textarea
        className="box-border h-64 w-64 p-2 border-4 border-gray-400 bg-gray-200 mb-6"
        onChange={handleQueryChange}
        value={query}
      />
      <Card data={countries} />
    </div>
  );
};
export default Pokemon;
