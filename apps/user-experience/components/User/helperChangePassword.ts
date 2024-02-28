/* eslint-disable */
import axios from "axios";
import { nullToObject } from "../../utils/helperFunctions";

export const changePasswordServiceCall = (ele: any) => {
  const { secondaryArgs = {}, userDetails = {} } = nullToObject(ele);
  const {
    prelemBaseEndpoint: { language = "en", deliveryEndPoint = "", PublishEndPoint = "" } = {},
  } = nullToObject(secondaryArgs);

  const data = {
    currentPassword: "1",
    newPassword: "2",
  };
  // try {
  // const headers = new Headers();

  try {
    axios
      .put("https://dev.delivery.hcl-x.com/platform-x/user/change-password", data, {
        headers: {
          sitename: "platform-x",
        },
        withCredentials: true,
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response, "response");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error, "error");
      });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error, "catch");
  }
  // axios
  //   .put("https://dev.delivery.hcl-x.com/platform-x/user/change-password", data, {
  //     headers: headers,
  //   })
  //   .then((response) => {
  //     console.log(response, "response");
  //   })
  //   .catch((error) => {
  //     console.log(error, "error");
  //   });
  // } catch (err: any) {
  //   // const { } = err.response;
  //   // ToastService.failToast(errorRequest);
  //   return err?.response;
  // }
  // return putRestApiCall(
  //   `https://dev.delivery.hcl-x.com/platform-x/user/change-password`,
  //   data,
  //   language,
  //   PublishEndPoint,
  // );
};
