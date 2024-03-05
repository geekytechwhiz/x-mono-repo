import { nullToObject, postData } from "../../utils/helperFunctions";

/**
 * register new user
 */
export const registerUserApiCall = (ele: any) => {
  const { secondaryArgs = {}, userDetails = {} } = nullToObject(ele);
  const { PublishEndPoint = "" } = nullToObject(secondaryArgs);
  const { userName = "", firstName = "", lastName = "", emailID = "" } = userDetails;

  const data = JSON.stringify({
    query: `mutation ($input:userInputRequest){
  createUser(input: $input) {    
  message
  }
}`,

    variables: {
      input: {
        first_name: firstName,
        last_name: lastName,
        email: emailID,
        username: userName,
        role_id: "",
        role: "",
        timezone: "",
      },
    },
  });
  const { deliveryEndPoint = "" } = nullToObject(secondaryArgs);
  return postData(`${deliveryEndPoint}delivery-engine`, data, PublishEndPoint);
};
