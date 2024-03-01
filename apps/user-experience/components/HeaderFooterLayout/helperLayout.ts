import { nullToObject, postData } from "../../utils/helperFunctions";

/**
 * cartId based get full details
 */
export const ecomCartIdBasedGetItem = (ele: any) => {
  const { secondaryArgs = {}, cartId = "" } = nullToObject(ele);
  const { deliveryEndPoint = "" } = nullToObject(secondaryArgs);
  const data = {
    query: `query { getCartItems(cartId:${JSON.stringify(cartId)}) } `,
  };
  return postData(`${deliveryEndPoint}delivery-engine`, data);
};
