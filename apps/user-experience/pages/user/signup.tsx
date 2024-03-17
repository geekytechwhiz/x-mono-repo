import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import { registerUserApiCall } from "../../components/User/helperUser";
import { getDomainUrl, nullToObject, prelemBaseEndpointObj } from "../../utils/helperFunctions";
import {
  showToastError,
  ShowToastSuccess,
} from "../../components/toastNotification/ToastNotification";
import getConfig from "next/config";
import { MESSAGE_API_ERROR } from "../../constants/CommonConstants";
import { snowplowTrackingHook } from "../../components/Common/customHook/snowplowTrackingHook";

const { publicRuntimeConfig = {} } = getConfig() || {};
export async function getServerSideProps(context) {
  const { query = {}, locale = "", resolvedUrl = "", req } = context;
  const host = req.headers.host || "";
  const { id = "" } = await query;

  return {
    props: {
      pageData: {},
      route: { ...query, locale: locale, query: id, pageUrl: resolvedUrl, host },
      site_host: host,
    },
  };
}

const Signup = (props: any) => {
  const { pageProps = {} } = props;
  const { route = {}, site_host } = pageProps;
  const { locale = "", host = "" } = route;
  const router = useRouter();
  const { userRegisterImpression } = snowplowTrackingHook();
  const onLogin = () => {
    const loginUrl = `${publicRuntimeConfig?.NEXT_AUTH}${getDomainUrl(host)}${locale}`;
    window?.location.replace(loginUrl);
  };

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  const userDetailsPass = async (ele) => {
    const { validate = false } = ele;
    const { emailID = "" } = ele;

    if (validate) {
      const response = await registerUserApiCall({
        secondaryArgs: prelemBaseEndpoint,
        userDetails: ele,
      });
      const { data: { data = {}, errors = [] } = {} } = nullToObject(response);
      const { createUser = {} } = nullToObject(data);
      const { message = "" } = nullToObject(createUser);
      if (message) {
        userRegisterImpression(emailID, site_host);
        const { PublishEndPoint = "", language = "" } = prelemBaseEndpoint;
        const url = PublishEndPoint + language;
        ShowToastSuccess(message);
        setTimeout(() => {
          router.push(url);
        }, 1000);
      } else {
        showToastError(errors?.length > 0 ? errors[0]?.message : MESSAGE_API_ERROR);
      }
    }
  };

  const SignUp: any = dynamic(
    () => import(`@platformx/x-prelems-library`).then((mod) => mod.SignUp),
    {
      ssr: false,
    },
  );

  return (
    <Box>
      <ErrorBoundary>
        <SignUp
          userDetailsPass={userDetailsPass}
          redirectToLoginPage={onLogin}
          secondaryArgs={{ prelemBaseEndpoint }}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default Signup;
