import getConfig from "next/config";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import {
  convertLowerCase,
  defaultSocialImage,
  nullToObject,
  nullToString,
  objOthersHandle,
  stringShort,
} from "../../utils/helperFunctions";

const { publicRuntimeConfig = {} } = getConfig() || {};

type PageHeadProps = {
  pageData: any;
  favIcon?: string;
};
export const PageHead = (props: PageHeadProps) => {
  const { pageData = {}, favIcon = "%PUBLIC_URL%/favicon.ico" } = nullToObject(props);
  const objOthers = objOthersHandle(pageData);
  const { noIndex = "", canonicalURL = "", CanonicalURL = "" } = objOthers;
  const cUrl = canonicalURL ? canonicalURL : nullToString(CanonicalURL);
  const seoEnabled = pageData?.SeoEnable !== undefined ? pageData?.SeoEnable : pageData?.seo_enable;
  const { settings = {} } = nullToObject(pageData);

  const {
    socialog_url = "",
    socialog_title = "",
    seo_keywords = "",
    socialog_image = "",
    SocialOgLocale = "",
    SocialOgSiteName = "",
    socialog_twitter_url = "",
    socialog_description = "",
    socialog_twitter_title = "",
    socialog_twitter_description = "",
  } = nullToObject(settings);

  const structuredData =
    pageData?.StructureData !== undefined ? pageData?.StructureData : pageData?.structure_data;

  let arrStructuredData =
    structuredData && typeof structuredData === "string" ? JSON.parse(structuredData) : [];

  if (arrStructuredData && Array.isArray(arrStructuredData) && arrStructuredData.length) {
    arrStructuredData = arrStructuredData.filter((item: any) => {
      return item && item !== "{}" && item?.trim() !== "";
    });
  } else {
    arrStructuredData = [JSON.stringify(arrStructuredData)];
  }

  if (pageData?.content_type === "Event" && pageData?.blog_settings)
    arrStructuredData = [...arrStructuredData, JSON.parse(pageData?.blog_settings)];

  const description = stringShort(socialog_description, 40) || "";
  const siteName = SocialOgSiteName ? SocialOgSiteName : "";
  const siteTitle = socialog_title ? socialog_title : "";

  const ogImg = socialog_image
    ? `${publicRuntimeConfig?.NEXT_GCP_URL}/${publicRuntimeConfig?.NEXT_BUCKET_NAME}/${socialog_image}`
    : defaultSocialImage;
  const faviconUrl =
    publicRuntimeConfig?.NEXT_GCP_URL + "/" + publicRuntimeConfig?.NEXT_BUCKET_NAME + "/" + favIcon;
  return (
    <>
      {seoEnabled ? (
        <Head>
          {/* Add the favicon link tag */}
          <Link rel='icon' type='image/x-icon' href={faviconUrl} />
          <title>{siteTitle}</title>
          <meta charSet='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0'
          />
          <meta property='keywords' content={seo_keywords} />

          <meta
            name='google-site-verification'
            content={publicRuntimeConfig?.NEXT_GOOGLE_SEARCH_VERIFICATION}
          />

          {noIndex && <meta name='robots' content='noindex' />}

          {cUrl && <Link rel='canonical' href={cUrl} />}

          {/* Facebook Meta Tags  */}
          <meta property='og:site_name' content={siteName} />

          {/* <meta property="twitter:image:src" content={socialog_image} /> */}
          <meta property='twitter:domain' content={socialog_url} />
          <meta name='theme-color' content='#fff' />

          <meta property='og:type' content='website' />
          <meta property='og:title' content={siteTitle} />
          <meta property='title' content={siteTitle} />

          <meta name='description' property='og:description' content={description} />

          <meta property='og:url' content={socialog_url} />

          <meta property='og:image' content={ogImg} />

          {SocialOgLocale && <meta property='og:locale' content={SocialOgLocale} />}

          {socialog_twitter_title && (
            <meta property='twitter:title' content={socialog_twitter_title} />
          )}

          {socialog_twitter_description && (
            <meta property='twitter:description' content={socialog_twitter_description} />
          )}

          {socialog_twitter_url && <meta property='twitter:site' content={socialog_twitter_url} />}

          {arrStructuredData &&
            arrStructuredData?.length &&
            arrStructuredData.map((item: any, key: number) => {
              return (
                <Script
                  id={`SD${key}`}
                  key={convertLowerCase(key + "arrStructuredData")}
                  type='application/ld+json'
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              );
            })}
        </Head>
      ) : (
        <Head>
          {/* Add the favicon link tag */}
          <Link rel='icon' type='image/x-icon' href={favIcon || "%PUBLIC_URL%/favicon.ico"} />
          <meta charSet='UTF-8' />
          <title>{siteTitle}</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0'
          />
        </Head>
      )}
    </>
  );
};
