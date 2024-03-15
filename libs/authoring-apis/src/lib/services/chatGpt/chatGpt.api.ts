import { ApolloError } from "@apollo/client";
import { ShowToastError } from "@platformx/utilities";
import graphqlInstance from "../../config/graphqlConfig";
import { CREATE_NEW_CHATGPT_REQUEST } from "../../graphQL/mutations/chatGptMutateQueries";

export const createChatGptRequest = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: CREATE_NEW_CHATGPT_REQUEST,
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
