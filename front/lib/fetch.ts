import { GraphQLClient } from 'graphql-request'

// TODO fetcherの戻り値がanyなの気になる
export type Fetcher = (query: string, variables: any) => Promise<any>;
export type GetFetcher = () => Fetcher;
export const getFetcher = () => {

  const serverHost = process.env.SERVER_HOST;
  const serverPort = process.env.SERVER_PORT;

  let client = null;
  if (serverHost && serverPort) {
    client = new GraphQLClient(`http://${serverHost}:${serverPort}/api/graphql/`);
  } else {
    client = new GraphQLClient(`/api/graphql/`);
  }

  const fetcher: Fetcher = (query, variables) => client.request(query, variables);

  return fetcher;
};

// // how to use
// import { gql } from 'graphql-request'
// import useSWR from 'swr'
// import { getFetcher } from "@/lib/fetch"
//
// const fetcher = getFetcher();
// const query = gql`
//   query someQuery($input: SomeInputType!) {
//     someField(input: $input) {
//       ...fields
//     }
//   }
// `
// const { data } = useSWR([query, { input: someInput }], fetcher)
