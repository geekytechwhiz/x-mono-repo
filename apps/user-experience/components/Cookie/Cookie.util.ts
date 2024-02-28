export const defaultDataProp = {
  cookie_policy_cta_link: "https://hcl-x.com/en/cookiepolicy",
  non_essential_cookie_description:
    "These cookies allow us to analyse our site’s usage and improve the site’s functionality. These cookies also allow us to partner with companies to serve you ads relevant to your interests.",
  cookie_manage_setting_consent_button: "Accept All",
  cookie_button_text: "OK",
  non_essential_cookie_title: "Non-Essential Cookie",
  manage_save_setting_consent_button: "Save & Close",
  essential_cookie_description:
    "These cookies are required for the basic site functionality and cannot be switched off in our systems. The website cannot function properly without these cookies. They remember the choices you make to ensure the website runs smoothy. Finally they also assist in out own security and conforming to regulations.",
  consent_cookie_button: "Accept & Clsoe",
  manage_setting_description:
    "The website uses cookies to ensure you get the best experience on the website. By using our website you agree to use of cookies as described in our Cookie Policy",
  consent_cookie_title: "we value your privacy",
  manage_setting_cookie_button: "Manage Cookies",
  cookie_description:
    "The website uses cookies to ensure you get the best experience on the website. By using our website you agree to use of cookies as described in our Cookie Policy",
  cookie_manage_setting_title: "Cookie Preferences",
  essential_cookie_title: "Essential Cookie",
  consent_cookie_description:
    "The website uses cookies to ensure you get the best experience on the website. By using our website you agree to use of cookies as described in our Cookie Policy",
  cookie_policy_cta_text: "Cookie Policy",
  cookie_title: "Cookies Policy",
  consent_cookie_policy_link: "https://platx-publish-dev.fanuep.com/copyofcookie-policy12",
  informative_cookie_policy_link: "https://platx-publish-dev.fanuep.com/copyofcookie-policy12",
  consent_cookie_country_list: "Korea, North|Algeria",
  informative_cookie_country_list: "Barbados|Korea, North",
  cookie_consent_expiry_time: "",
  cookie_informative_expiry_time: "",
};

export const reopenCookieManagement = (context) => {
  context.dispatch(
    context.actions.reopenManageCookie({
      showPanel: "consent",
      isOpenManageCookie: true,
    }),
  );
};
