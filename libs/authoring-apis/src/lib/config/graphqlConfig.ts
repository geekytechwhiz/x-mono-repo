import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCurrentLang, getSelectedSite } from "../utils/helper";

const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
const link = createHttpLink({
  uri: process.env.NX_GRAPHQL_URI,
  headers: {
    language: getCurrentLang(),
    sitename: getSelectedSite(),
  },
  credentials: "include",
});
const updateLanguageheader = setContext((_, { headers }) => {
  // const language = headers && headers.language ? headers.language : "en";
  // return {
  //   headers: {
  //     ...headers,
  //     language,
  //     Locale: getLocale(language, language),
  //   },
  // };
  return {
    headers: {
      ...headers,
      // language: i18next.language,
    },
  };
});

const graphqlInstance = new ApolloClient({
  link: updateLanguageheader.concat(link),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
export default graphqlInstance;
