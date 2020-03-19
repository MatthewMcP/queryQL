//TODO Take in gql query / overloads

// Output enum + data
// Global Error handling but overwrittble
// Cache management
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

interface QueryType {
  data: object;
  status: queryStatus;
}

enum queryStatus {
  errored,
  loading,
  returned,
}


//I don't think this will work with typescipt, it will mean taking in a type which would be hacky hacky react
// Going to leave the base and then use a hook or a component to handle the if isLoading/if isErrored logic. 
const useQueryWrap = (gqlQuery: any, test: any, ...args: any): QueryType => {
    const return = QueryType;
  const { loading, error, data } = useQuery<test.ty>(gqlQuery, {
    onCompleted: (data: any) => {},
    onError: (error: any) => {},
  });

  return data;
};
