/* eslint-disable no-useless-catch */
import { ApolloError } from "@apollo/client";
import graphqlInstance from "../../config/graphqlConfig";
import { ApiResponse } from "../utils/common.types";
import { ShowToastError } from "@platformx/utilities";
import {
  FETCH_SITE_LISTING,
  CREATE_NEW_SITE_CONFIG,
  PUBLISH_MULTISITE_INFO,
  SITE_TITLE_VALIDATION,
  SUBDOMAIN_VALIDATION,
  UPDATE_SITE_CONFIG,
} from "../../graphQL/queries/siteCreationQueries";

export const fetchSites = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_SITE_LISTING,
      variables: input,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const createSiteConfig = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: CREATE_NEW_SITE_CONFIG,
      variables: input,
    });
    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      ShowToastError(`${error.graphQLErrors[0].message}`);
    }
    throw error;
  }
};

export const updateSiteConfig = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: UPDATE_SITE_CONFIG,
      variables: input,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const publishMultisiteInfo = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: PUBLISH_MULTISITE_INFO,
      variables: input,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const siteTitleValidation = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: SITE_TITLE_VALIDATION,
      variables: input,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const subdomainValidation = async <T>(input: T): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: SUBDOMAIN_VALIDATION,
      variables: input,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
