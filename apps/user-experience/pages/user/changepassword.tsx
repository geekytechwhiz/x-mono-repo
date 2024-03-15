import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import { prelemBaseEndpointObj } from "../../utils/helperFunctions";
import { changePasswordServiceCall } from "../../components/User/helperChangePassword";

export async function getServerSideProps(context) {
  const { query = {}, locale = "", resolvedUrl = "", req } = context;
  const host = req.headers.host || "";
  const { id = "" } = await query;

  return {
    props: {
      pageData: {},
      route: { ...query, locale: locale, query: id, pageUrl: resolvedUrl },
      site_host: host,
    },
  };
}

const ChangePassword = (props: any) => {
  const { pageProps = {} } = props;
  const { route = {}, site_host } = pageProps;
  const router = useRouter();

  const prelemBaseEndpoint = {
    ...prelemBaseEndpointObj(site_host),
    language: route?.locale,
    query: route?.query,
  };

  const moveToHomePage = () => {
    const { PublishEndPoint = "", language = "" } = prelemBaseEndpoint;
    const url = PublishEndPoint + language;
    router.push(url);
  };

  const passwordDetails = () => {
    const res = changePasswordServiceCall({
      secondaryArgs: prelemBaseEndpoint,
      userDetails: {
        oldPassword: "Snaveen@05",
        newPassword: "Snaveen@051",
      },
    });
    // eslint-disable-next-line no-console
    console.log(res, "res");
  };

  const ChangePsw: any = dynamic(
    () => import(`@platformx/x-prelems-library`).then((mod) => mod.ChangePassword),
    {
      ssr: false,
    },
  );

  return (
    <Box>
      <ErrorBoundary>
        <button type='button' style={{ display: "none" }} onClick={passwordDetails}>
          api check
        </button>
        <ChangePsw
          moveToHomePage={moveToHomePage}
          // passwordDetails={passwordDetails}
          secondaryArgs={{ prelemBaseEndpoint }}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default ChangePassword;
