import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { fetchCookieSettingModel } from "../../services/Cookie/Cookie.service";
import styles from "./Cookie.module.css";
import { CookieDataType } from "./Cookie.type";
import { useCustomStyle } from "./Cookie.style";

const { publicRuntimeConfig = {} } = getConfig() || {};

const CookieComponent = ({ analyticHandle = () => {} }: any) => {
  const classes = useCustomStyle();
  const cookiesIsAccepted = document.cookie.includes("userConsentCookiePolicy=true");
  const userLocation = useRef<string>("");
  const [data, setData] = useState<CookieDataType>();
  const [showPanel, setShowPanel] = useState("");
  const [isOpenManageCookie, set_isOpenManageCookie] = useState(false);

  const popupRef = useRef<any>(null);
  const [nonEssentialCb, setnonEssentialCb] = useState<boolean>(false);
  const router = useRouter();

  const cookieConsentCheck = (cookieName: string) => {
    const allCookie = document.cookie;
    return allCookie.includes(cookieName);
  };

  const validateCookie = () => {
    if (!userLocation.current) return;

    if (cookieConsentCheck("userConsentCookiePolicy")) {
      return;
    }

    if (
      cookieConsentCheck("userInformativeCookiePolicy") &&
      data?.informative_cookie_country_list.includes(userLocation.current)
    ) {
      return;
    }

    let panel = "consent";
    if (
      data?.informative_cookie_country_list.includes(userLocation.current) &&
      !data?.consent_cookie_country_list.includes(userLocation.current)
    ) {
      panel = "informative";
    }
    if (!popupRef.current && data) {
      setShowPanel(panel);
    }
  };

  const clearAllCookie = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const analyticApiCall = () => {
    // if (Object.keys(instances).length === 0) {
    //   (async () => {
    // const res = await analyticsInstance(Analytics);
    analyticHandle();
    //   })();
    // }
  };

  const setCookie = (isAcceptAll = true) => {
    clearAllCookie();
    if (isAcceptAll) {
      setnonEssentialCb(true);
    }

    const date = new Date();
    let cookieLifeTime;
    if (showPanel === "consent") {
      cookieLifeTime = data?.cookie_consent_expiry_time ? data?.cookie_consent_expiry_time : 180;
    } else {
      cookieLifeTime = data?.cookie_informative_expiry_time
        ? data?.cookie_informative_expiry_time
        : 180;
    }
    date.setTime(date.getTime() + parseInt(cookieLifeTime) * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    const userConsentCookiePolicyValue = isAcceptAll ? `true` : nonEssentialCb?.toString();
    document.cookie =
      showPanel === "informative"
        ? `userInformativeCookiePolicy=true;expires=${expires}`
        : `userConsentCookiePolicy=${userConsentCookiePolicyValue};expires=${expires}`;

    if (showPanel === "consent") {
      const newObj = {
        isCookieConsentChosen: true,
        isNonEssentialCookieChecked: nonEssentialCb,
      };
      if (newObj.isCookieConsentChosen || newObj.isNonEssentialCookieChecked) {
        analyticApiCall();
      }

      //cookies is set removed popUP from UI
      const cookiesCheck = document.cookie.includes("userConsentCookiePolicy=true");
      if (cookiesCheck) {
        setShowPanel("");
      }
    } else {
      setShowPanel("");
    }
  };

  const renderCookie = () => {
    if (!showPanel) {
      return null;
    }
    const cookieButton =
      showPanel === "consent" ? (
        <div className={styles["btn-container"]}>
          <Button
            // type="button"
            variant='tertiaryButton2'
            sx={{
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
            // className={styles["cookie-outline-btn"]}
            data-testid='manage-cookie'
            onClick={() => {
              set_isOpenManageCookie(true);
            }}>
            {data?.manage_setting_cookie_button}
          </Button>
          <Button
            // type="button"
            variant='tertiaryButton1'
            sx={{ fontSize: "14px", mr: "0px", whiteSpace: "nowrap" }}
            //className={styles["cookie-btn"]}
            onClick={() => setCookie()}
            data-testid='accept-and-close'>
            {data?.consent_cookie_button}
          </Button>
        </div>
      ) : (
        <div className={styles["ok-btn-container"]}>
          <Button
            variant='tertiaryButton2'
            onClick={() => setCookie()}
            data-testid='ok'
            sx={{
              fontSize: "14px",
              minWidth: "69px",
              whiteSpace: "nowrap",
            }}>
            {data?.cookie_button_text}
          </Button>
        </div>
      );

    const getCookieHeader = () => {
      let header = "";
      if (showPanel === "consent") {
        header = data?.consent_cookie_title || "";
      }

      if (showPanel === "informative") {
        header = data?.cookie_title || "";
      }

      if (isOpenManageCookie) {
        header = data?.cookie_manage_setting_title || "";
      }
      return header;
    };

    const getDescription = () => {
      if (isOpenManageCookie) {
        return data?.manage_setting_description;
      } else {
        return showPanel === "consent"
          ? data?.consent_cookie_description
          : data?.cookie_description;
      }
    };

    const cookieUi = (
      <div className={`${classes.cookiePolicyWrapper} cookiePolicyBg`} ref={popupRef}>
        <div className={styles["cookie-body"]}>
          <div className={styles["cookie-msg"]}>
            <Typography variant='p3bold' color='tertiaryTitle' sx={{ mb: "6px" }}>
              {getCookieHeader()}
            </Typography>
            <Typography
              variant='p4regular'
              color='tertiaryParagraph'
              //className={styles["cookie-desc"]}
              sx={{ mt: "0px", mb: "12px" }}>
              {`${getDescription()} `}
              <b className={styles["cookie-policy-link"]} data-testid='open-cookie-policy'>
                <u>
                  <a
                    className='link'
                    href={
                      showPanel === "consent"
                        ? data?.cookie_policy_cta_link
                        : data?.informative_cookie_policy_link
                    }>
                    {data?.cookie_policy_cta_text}
                  </a>
                </u>
              </b>
            </Typography>
          </div>
          {!isOpenManageCookie && cookieButton}
        </div>
        {isOpenManageCookie && (
          <div className={styles["cookie_manange-container"]}>
            <div className={styles["cookie_manange-panel"]}>
              <div style={{ display: "flex" }}>
                <input className='checkedColor' type='checkbox' checked={true} disabled={true} />
                <Typography
                  variant='p3semibold'
                  color='tertiaryTitle'
                  sx={{ mt: "0px", mb: "0px" }}>
                  {" "}
                  {data?.essential_cookie_title}
                </Typography>
              </div>
              <Typography variant='p4regular' color='tertiaryParagraph' className='description'>
                {data?.essential_cookie_description}
              </Typography>
            </div>
            <div className={styles["cookie_manange-panel"]}>
              <div style={{ display: "flex" }}>
                <input
                  // style={{ accentColor: "#CED3D9", marginRight: "5px" }}
                  className='checkedColor'
                  id='myCheckbox'
                  type='checkbox'
                  onChange={(e) => {
                    setnonEssentialCb(e.target.checked);
                  }}
                  checked={nonEssentialCb}
                  data-testid='non-essential-cb'
                />
                <Typography
                  //htmlFor='myCheckbox'
                  variant='p3semibold'
                  color='tertiaryTitle'
                  sx={{ mt: "0px", mb: "0px" }}>
                  {" "}
                  {data?.non_essential_cookie_title}
                </Typography>
              </div>
              <Typography variant='p4regular' color='tertiaryParagraph' className='description'>
                {data?.non_essential_cookie_description}
              </Typography>
            </div>
            <div className={styles["cookie_manange-btn"]}>
              <Button
                // type="button"
                variant='tertiaryButton1'
                sx={{
                  fontSize: "14px",
                  margin: { xs: "0px 0px 10px 0px" },
                  whiteSpace: "nowrap",
                }}
                //   className={styles["accept-all"]}
                onClick={() => {
                  setCookie();
                }}
                data-testid='accept-all'>
                {data?.cookie_manage_setting_consent_button}
              </Button>

              <Button
                // type="button"
                variant='tertiaryButton2'
                sx={{
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  margin: { xs: "0px 0px 0px 0px", md: "0px 0px 0px 0px" },
                }}
                // className={styles["save-and-close"]}
                onClick={() => {
                  setCookie(false);
                }}
                data-testid='save-and-close'>
                {data?.manage_save_setting_consent_button}
              </Button>
            </div>
          </div>
        )}
      </div>
    );

    return cookieUi;
  };

  useEffect(() => {
    if (
      showPanel === "consent" &&
      document?.cookie?.length &&
      document?.cookie?.includes("userInformativeCookiePolicy")
    ) {
      clearAllCookie();
    }
  }, [showPanel]);

  useEffect(() => {
    if (cookiesIsAccepted && !nonEssentialCb) {
      //if already cookies accepted
      analyticApiCall();
      setnonEssentialCb(cookiesIsAccepted);
    }
  }, [cookiesIsAccepted]);

  const fetchUserLocation = async () => {
    if (!userLocation.current) {
      try {
        // const { data: { countryCode = "" } = {} } = await axios.get(
        //   "http://ip-api.com/json/?fields=continentCode,country,countryCode,city,lat,lon,timezone,query"
        // );
        // eslint-disable-next-line require-atomic-updates
        //  userLocation.current = countryCode;
        const { data: locationData = {} } = await axios.get(
          `${publicRuntimeConfig.NEXT_GEOLOCATION_API_URL}?apiKey=${publicRuntimeConfig.NEXT_GEOLOCATION_API_KEY}`,
        );
        const { country_name = "" } = locationData;
        // const country_name = await "India";
        // eslint-disable-next-line require-atomic-updates
        userLocation.current = country_name;
        if (
          userLocation.current &&
          data?.informative_cookie_country_list.includes(userLocation.current) &&
          !data?.consent_cookie_country_list.includes(userLocation.current)
        ) {
          analyticApiCall();
          validateCookie();
        } else {
          if (!cookieConsentCheck("userConsentCookiePolicy")) {
            setShowPanel("consent");
          }
        }
      } catch (err) {
        if (!cookieConsentCheck("userConsentCookiePolicy")) {
          setShowPanel("consent");
        }
      }
    } else {
      validateCookie();
    }
  };

  const fetchCookieData = async () => {
    const cookieSettingModelResponse = await fetchCookieSettingModel(router?.locale || "en");
    const cookieData = cookieSettingModelResponse?.data?.data?.fetchMultiSiteCookieSettings;
    setData(cookieData);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      validateCookie();
    }, 3600000);
    fetchCookieData();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (Object.keys(data || {}).length) {
      fetchUserLocation();
    }
  }, [Object.keys(data || {}).length > 0]);

  return <>{renderCookie()}</>;
};

export default React.memo(CookieComponent);
