/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useState, ChangeEvent } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';
import { ToastContainer, toast } from 'react-toastify';
import { logError, useQueryString } from '../../util';
import { CardDisplay, TableDisplay } from '../../shared/components/index';
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

  const [countries, setCountries] = useState<any[][]>([]);
  // TODO: Remove the default closer to 'release'
  const { value: uriValue, onSetValue: onSetURIValue } = useQueryString(
    'uri',
    'https://countries.trevorblades.com/'
  );
  const [uri, setURIText] = useState(uriValue);
  const [debouncedURIText] = useDebounce(uri, debounceTime);
  const handleURIChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLTextAreaElement;
    setURIText(target.value);
  };

  const apolloClient = useMemo(() => {
    onSetURIValue(debouncedURIText);
    return new ApolloClient({
      uri: debouncedURIText,
    });
  }, [debouncedURIText]);

  const { error: gqlError, loading } = useQuery(gql(debouncedQueryText), {
    client: apolloClient,
    skip: !debouncedQueryText,
    onCompleted: data => {
      if (data && data[Object.keys(data)[0]]) {
        setCountries(data[Object.keys(data)[0]]);
      }
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

  const {
    value: showQuerySectionValue,
    onSetValue: onShowQuerySectionValue,
  } = useQueryString('showQuery', 'true');
  const hanldeQuerySectionButtonClick = (): any => {
    if (showQuerySectionValue === 'true') {
      onShowQuerySectionValue('false');
    } else {
      onShowQuerySectionValue('true');
    }
  };
  const showQuerySectionBool = useMemo(() => {
    return showQuerySectionValue === 'true';
  }, [showQuerySectionValue]);

  const {
    value: displayTypeValue,
    onSetValue: onDisplayTypeValue,
  } = useQueryString('displayType', 'table');
  const handleDisplayTypeChange = (): any => {
    if (displayTypeValue === 'table') {
      onDisplayTypeValue('card');
    } else {
      onDisplayTypeValue('table');
    }
  };
  const showTableDisplay = useMemo(() => {
    return displayTypeValue === 'table';
  }, [displayTypeValue]);

  return (
    <div className="container mx-auto px-6 text-white">
      <ToastContainer autoClose={3000} pauseOnHover />
      <h1 className="flex justify-center mb-8">Pokemon</h1>
      <button onClick={hanldeButtonClick} type="button">
        Copy shortened URL to clipboard
      </button>
      <div className="border-solid border-4 border-gray-600 p-2">
        <button
          onClick={hanldeQuerySectionButtonClick}
          type="button"
          // eslint-disable-next-line prettier/prettier
        >
          {showQuerySectionBool ? 'Show' : 'Hide'}
          Query Section
        </button>
        {showQuerySectionBool && (
          <div className="grid grid-cols-2 gap-2 py-2">
            <label className="col-span-1">
              URI:
              <input
                type="text"
                className="w-full box-border border-4 border-gray-400 bg-gray-200 text-black"
                name="name"
                onChange={handleURIChange}
                value={uri}
              />
            </label>
            <div className="col-span-1 flex flex-col">
              <label>Query:</label>
              <textarea
                className="box-border h-64 w-full p-2 border-4 border-gray-400 bg-gray-200 text-black"
                onChange={handleQueryChange}
                value={query}
              />
            </div>
          </div>
        )}
      </div>
      <div className="border-solid border-4 border-gray-600 p-2">
        {loading && (
          <label className="container mx-auto px-6">Data Is loading</label>
        )}
        {gqlError && (
          <label className="container mx-auto px-6">{gqlError.message}</label>
        )}
        <button
          onClick={handleDisplayTypeChange}
          type="button"
          // eslint-disable-next-line prettier/prettier
        >
          Toggle Display type
        </button>
        {showTableDisplay ? (
          <TableDisplay data={countries} />
        ) : (
          <CardDisplay data={countries} />
        )}
      </div>
    </div>
  );
};
export default Pokemon;
