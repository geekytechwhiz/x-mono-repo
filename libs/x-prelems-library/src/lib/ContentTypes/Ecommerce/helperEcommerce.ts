import { getRestApiCall, nullToObject, postRestApiCall, nullToArray } from "@platformx/utilities";
import ToastService from "../../components/ToastContainer/ToastService";

export const getCartId = (secondaryArgs = {}) => {
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);
  const data = JSON.stringify({
    query: `mutation {addProductToCart(input: {initialize:true})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 * product add to cart
 */
const ecomProductAddToCart = (ele: any) => {
  const {
    secondaryArgs = {},
    cartId = "",
    id = "",
    quantity = "",
    ecomx_variant_id = 1,
  } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
      cartId,
    )}, line_item: { product_id: ${JSON.stringify(
      id,
    )}, variant_id: ${ecomx_variant_id}, quantity: ${JSON.stringify(quantity)}}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 * add to cart process
 * @param cartId string | number
 */

const addToCartProcess = async (
  cartId: string | number,
  productId: string,
  cartQuantity: string | number,
  secondaryArgs: any,
  fromListing = false,
  ecomx_variant_id = 1,
) => {
  const response = await ecomProductAddToCart({
    id: productId,
    cartId: cartId,
    quantity: cartQuantity,
    secondaryArgs: secondaryArgs,
    ecomx_variant_id: ecomx_variant_id,
  });
  const { data: { data: { addProductToCart = {} } = {} } = {} } = nullToObject(response);
  const { statusCode = 0, msg = "" } = nullToObject(addProductToCart);
  if (statusCode === 200) {
    if (fromListing) {
      window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/cart-list`;
    }
    ToastService.SuccessToast((msg || "").charAt(0).toUpperCase() + msg.slice(1));
    return true;
  } else {
    ToastService.failToast(msg);
    return false;
  }
};

/**
 * generate cartId
 * @param secondaryArgs object
 * @returns object
 */

export const addToCartGetCartId = async (
  secondaryArgs: any,
  productId: string,
  cartQuantity: string | number,
  fromListing?: boolean,
  productFullDetails?: any,
  msg?: string,
) => {
  const { ecomx_variant_id = 1 } = nullToObject(productFullDetails);

  const getCartIdFromLocal = localStorage.getItem("ecommerceCartId");
  if (!getCartIdFromLocal) {
    //no cartId in local generate new one
    const responseCartId = await getCartId(secondaryArgs); //get cartId
    const { data: { data: { addProductToCart: { cartId = "", statusCode = 0 } = {} } = {} } = {} } =
      nullToObject(responseCartId);
    if (statusCode === 200) {
      localStorage.setItem("ecommerceCartId", cartId);
      const res = await addToCartProcess(
        cartId,
        productId,
        cartQuantity,
        secondaryArgs,
        fromListing,
        ecomx_variant_id,
      ); //add to cartProcess
      return res;
    } else {
      ToastService.failToast(msg);
    }
  } else {
    const res = await addToCartProcess(
      getCartIdFromLocal,
      productId,
      cartQuantity,
      secondaryArgs,
      fromListing,
      ecomx_variant_id,
    ); //add to cartProcess
    return res;
  }
};

export const getProductDetails = (
  secondaryArgs: any,
  rows: string | number,
  start: string | number,
  value: string[],
  key: string,
  fromListing = false,
) => {
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const getLocalData = localStorage.getItem("ecommerceQuery");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    searchTerm = "",
    tags = [],
    ecommerceRequest: { filter = [] } = {},
  }: any = getLocalData ? JSON.parse(JSON.parse(getLocalData)) : {};
  const attributevalue = value.map((item) => {
    if (item.includes("#", 0)) {
      return item.replace("#", "%23");
    }
    return item;
  });
  let queryparam;
  const obj1: String = `{pagination:{start:${start},rows:${rows}},searchTerm:${JSON.stringify(
    searchTerm,
  )},tags:${JSON.stringify(
    tags,
  )},filter:Ecommerce,isSuggestive:false,ecommerceRequest:{filter:${JSON.stringify(
    filter,
  )},attributes:[{key:${JSON.stringify(key)},value:${JSON.stringify(attributevalue)}}]}}`;

  const obj2: String = `{pagination:{start:${start},rows:${rows}},searchTerm:${JSON.stringify(
    searchTerm,
  )},tags:${JSON.stringify(
    tags,
  )},filter:Ecommerce,isSuggestive:false,ecommerceRequest:{filter:${JSON.stringify(filter)}`;

  if (fromListing) {
    queryparam = obj2;
  } else {
    queryparam = obj1;
  }
  return getRestApiCall(
    `${deliveryEndPoint}api/v1/web/en/delivery/getEcomProducts?queryParam=${queryparam}`,
    language,
    sitename,
  );

  //Use for local testing.
  // return getRestApiCall(
  //   `https://dev.delivery.hcl-x.com/platform-x/api/v1/web/en/delivery/getEcomProducts?queryParam=${queryparam}`,
  //   "en",
  //   "delhiuniversity",
  // );
};

/**
 * cartId based get full details
 */
export const ecomCartIdBasedGetItem = (ele: any) => {
  const { secondaryArgs = {}, cartId = "" } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `query { getCartItems(cartId:${JSON.stringify(cartId)}) } `,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 * productId based get product fill details
 * post call
 */
export const getProductDetailsApiCall = (
  productId: string,
  secondaryArgs: any,
  filterAttr: Array<any>,
) => {
  const filterArray: any = nullToArray(filterAttr).length > 0 ? JSON.stringify(filterAttr) : [];
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    secondaryArgs;
  const payload = JSON.stringify({
    query: `query {fetchEcomProductDetails(productId:${JSON.stringify(
      productId,
    )},filterAttr:${JSON.stringify(filterArray)})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, payload, language, sitename);
};

/**
 * shipping address
 * @param ele object
 * @returns object
 */
export const proceedToShippingAddress = (ele: any) => {
  const { secondaryArgs = {}, newObj = {} } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const {
    city = "",
    // state = "",
    email = "",
    cartId = "",
    pincode = "",
    address = "",
    landmark = "",
    lastName = "",
    firstName = "",
    alterNumber = "",
    contactNumber = "",
  } = nullToObject(newObj);
  const additionalAddressInfoData = landmark + " " + alterNumber;
  const addressObj = `{ title: ${JSON.stringify(firstName)}, last_name: ${JSON.stringify(
    lastName,
  )}, street_name: ${JSON.stringify(address)}, postal_code: ${JSON.stringify(
    pincode,
  )}, city: ${JSON.stringify(city)}, state: ${JSON.stringify(
    "Alabama",
  )}, country: "US", mobile: ${JSON.stringify(contactNumber)}, email: ${JSON.stringify(
    email,
  )}, additional_address_info: ${JSON.stringify(additionalAddressInfoData)} }`;
  const data = JSON.stringify({
    query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
      cartId,
    )}, address: {shipping_address:${addressObj}}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

// place order
export const placeOrder = async (ele: any) => {
  const { secondaryArgs = {}, cartId = "", userId = "", total_price = "" } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);
  if (userId && total_price) {
    const data = JSON.stringify({
      query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
        cartId,
      )}, user_id: ${JSON.stringify(userId)}, cart_total: ${JSON.stringify(
        total_price,
      )}, place_order: true })}`,
    });
    return await postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
  } else {
    const data = JSON.stringify({
      query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
        cartId,
      )}, place_order: true })}`,
    });
    return await postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
  }
};

export const addPaymentMethod = async (ele: any) => {
  const { secondaryArgs = {}, cartId = "" } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
      cartId,
    )}, payment_method:"COD" })}`,
  });
  return await postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 * productId based get reward points
 */
export const getProductDetailsRewardpoints = (amt: string, secondaryArgs: any) => {
  const { prelemBaseEndpoint: { loyaltyPortalEndPoint = "" } = {} } = nullToObject(secondaryArgs);
  return getRestApiCall(`${loyaltyPortalEndPoint}v1/campaign/getCampaignPoints?amount=${amt}`);
};

export const proceedToBillingAddress = (ele: any) => {
  const { secondaryArgs = {}, newObj = {} } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename = "" } =
    nullToObject(secondaryArgs);

  const {
    city = "",
    // state = "",
    email = "",
    cartId = "",
    pincode = "",
    address = "",
    lastName = "",
    firstName = "",
    contactNumber = "",
    additionalAddressInfoData = "",
  } = nullToObject(newObj);
  const addressObj = `{ title: ${JSON.stringify(firstName)}, last_name: ${JSON.stringify(
    lastName,
  )}, street_name: ${JSON.stringify(address)}, postal_code: ${JSON.stringify(
    pincode,
  )}, city: ${JSON.stringify(city)}, state: ${JSON.stringify(
    "Alabama",
  )}, country: "US", mobile: ${JSON.stringify(contactNumber)}, email: ${JSON.stringify(
    email,
  )}, additional_address_info: ${JSON.stringify(additionalAddressInfoData)} }`;
  const data = JSON.stringify({
    query: `mutation { addProductToCart(input: { cart_id: ${JSON.stringify(
      cartId,
    )}, address: {billing_address:${addressObj}}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

export const updateQuantityOfCartItem = (ele: any) => {
  const { secondaryArgs = {}, cartId = "", lineItemId = "", quantity } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation {updateLineItem(input:{cart_id:${JSON.stringify(
      cartId,
    )}, line_item_id:${JSON.stringify(lineItemId)}, quantity:${quantity}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

export const removeCartItem = (ele: any) => {
  const { secondaryArgs = {}, cartId = "", lineItemId = "" } = nullToObject(ele);
  const { prelemBaseEndpoint: { deliveryEndPoint = "", language = "en" } = {}, sitename } =
    nullToObject(secondaryArgs);

  const data = JSON.stringify({
    query: `mutation {removeLineItem(input:{cart_id:${JSON.stringify(
      cartId,
    )}, line_item_id:${JSON.stringify(lineItemId)}})}`,
  });
  return postRestApiCall(`${deliveryEndPoint}delivery-engine`, data, language, sitename);
};

/**
 *
 * @param lineItems object
 * @returns boolean
 */
export const lineItemsOutOfStockCheck = (lineItems: any) => {
  let inStock = true;
  lineItems.forEach((lineItem: any) => {
    if (!JSON.parse(lineItem?.ecomx_in_stock)) {
      inStock = false;
    }
  });
  return inStock;
};

export const IMPRESSIONS = {
  NA: "NA",
  ZERO: 0,
};

export const stringifyLineItem = (arr: any = []) => {
  const modifiedArray = arr.map((item: any) => {
    return {
      name: item?.ecomx_name,
      quantity: item?.ecomx_quantity,
      price: item?.ecomx_list_price,
    };
  });
  return JSON.stringify(modifiedArray);
};
