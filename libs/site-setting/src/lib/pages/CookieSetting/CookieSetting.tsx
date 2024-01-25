import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { tagInlineCss } from '../../../components/Common/tags/TagCommonCss';
import {
  fetchCookiePolicy,
  fetchCountries,
  mutateCookiePolicy,
  publishCookiePolicy
} from '@platformx/authoring-apis';
import CookieFormControl from './CookieFormControl';
import { useStyles } from './CookieSetting.style';
import {
  consentCookieSkeletonList,
  formConfig,
  informativeCookieSkeletonList,
} from '../../components/CookieSettingConstant';
import { CommonBoxWithNumber, Loader, TitleSubTitle, MultiSelect, PlateformXDialog, useUserSession, PlateformXDialogSuccess,  } from '@platformx/utilities';
import { CreateHeader } from "@platformx/content";
import { useLazyQuery } from '@apollo/client/react/hooks/useLazyQuery';
// import { fetchContentByPath } from '../../../services/contentTypes/contentTypes.api';

export const CookieSetting = () => {
  const [consentList, setConsentList] = useState<any>([]);
  const [informativeList, setInformativeList] = useState<any>([]);
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [coutryList, setCoutryList] = useState<any>([]);
  const informativeFormRef = useRef<HTMLElement>(null);
  const consentFormRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
//   const [runFetchContentByPath, { loading }] = useLazyQuery(fetchContentByPath);
  const classes = useStyles();
  const originalApiResult = useRef<any>(null);
  const [isNotificationToast, setIsNotificationToast] =
    useState<boolean>(false);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const crossButtonHandle = () => {
    setIsNotificationToast(false);
  };
  const navigate = useNavigate();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  const fetchAndUpdateData = async () => {
    const [cookiePolicyForm, countryList] = await Promise.all([
      fetchCookiePolicy({
        pagePath: 'cookie-item',
      }),
      fetchCountries({
        start: 0,
        rows: 1000,
        searchCategory: 'country',
      }),
    ]);
    const { authoring_getCookiePolicy: apiResult = {} } = cookiePolicyForm;
    const countries = countryList?.authoring_getTagsList[0]?.tags;
    const cloneForm = form;
    cloneForm.forEach((control) => {
      control.value = apiResult[control.name];
    });

    setCoutryList(countries);
    setConsentList(
      apiResult.consent_cookie_country_list
        ? apiResult.consent_cookie_country_list.split('|')
        : []
    );
    setInformativeList(
      apiResult.informative_cookie_country_list
        ? apiResult.informative_cookie_country_list.split('|')
        : []
    );
    originalApiResult.current = apiResult;
    setForm([...cloneForm]);
  };

  useEffect(() => {
    // handleScroll();
    // window.addEventListener('scroll', handleScroll);
    fetchAndUpdateData();
    return () => {
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const multiSelectChange = (e, name) => {
    setConsentList((preState) =>
      preState.includes(name)
        ? preState.filter((c) => c !== name)
        : [...preState, name]
    );
  };
  const initForm = () => {
    return formConfig.map((config) => ({
      value: config.defaultValue || '',
      errorMessage: '',
      ...config,
      title: t('cookie_policy'),
      //   validations: config.validations,
      //   ref: config.ref,
    }));
  };
  const [form, setForm] = useState(initForm());
  const handleInputChange = useCallback((event) => {
    const { target: { name = '', value = '' } = {} } = event;
    const control = form.find((control) => name === control.name);
    if (!control) return;
    control.value = value;
    setForm([...form]);
  }, []);

  const getFormValue = () => {
    const formValue: any = {};
    form.forEach((control) => {
      formValue[control.name] = control.value;
    });
    formValue.informative_cookie_country_list = informativeList.join('|');
    formValue.consent_cookie_country_list = consentList.join('|');
    return formValue;
  };

  const renderListControlFromArr = (list) =>
    list.map((config, index) => (
      <Fragment key={`control${index + 1}`}>
        <CookieFormControl
          name={config.name}
          type={config.type}
          maxLength={config.maxLength}
          placeHolder={config.placeHolder}
          title={config.title}
          subTitle={config.subTitle}
          titleVarient={config.titleVarient}
          subTitleVarient={config.subTitleVarient}
          value={config.value}
          skeleton={config.skeleton}
          skeletonTitle={config.skeletonTitle}
          handleChange={handleInputChange}
          isShowPreview={isShowPreview}
          index={index}
        />
      </Fragment>
    ));

    const publisheaderSetting = () => {
      const input = {
        input: {
          page: "cookie-item",
          status: "publish",
          is_schedule: false,
          schedule_date_time: ""
        }
      };
      publishCookiePolicy(input)
      .then((response) => {
        setIsNotificationToast(true);
      })
      .catch((err) => {
        throw err;
      });
    };

  const onSaveClick = async () => {
    setIsLoading(true);
    const formResult = getFormValue();
    delete originalApiResult.current.__typename;
    const params = {
      input: {
        CommonFields: {
          page: 'cookie-item',
          createdby: username,
          lastmodifiedby: username,
          lastmodifieddate: '',
        },
        ObjectFields: {
          ...formResult,
          consent_cookie_policy_link: formResult.cookie_policy_cta_link,
        },
      },
    };

    mutateCookiePolicy(params)
      .then(() => {
        setIsLoading(false);
        publisheaderSetting();
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;

      });

  };

  return (
    <>
      {/* <style>{tagInlineCss}</style> */}
      <CreateHeader
              //   previewButton= {false}
              createText={t("cookie_policy")}
              handleReturn={() => {
                  navigate("/dashboard");
              } }
              isQuiz
              handlePublish={onSaveClick}
              handleSaveOrPublish={onSaveClick}
              saveText={t("update")}
              previewText='Preview'
              showPreview={false}
              toolTipText='Unable to preview please add required details'
              saveVariant='contained'
              category={"content"}
              subCategory={"quiz"}
              isFeatured={false} hasPreviewButton={false}/>
      <Divider></Divider>
      <Box
            sx={{
              position: "relative",
              height: {
                sm: "100%",
                xs: "100%",
              },
            //   overflowY: loading ? "hidden" : "scroll",
              overflowX: "hidden",
            }}
           >
            {/* removed sidescroll as per discussion with UX team */}
              {/* <Box
                className={classes.globalnewcontain}>
                <QuizPageScroll
                  icons={iconImages}
                  parentToolTip={parentToolTip}
                  srollToView={srollToView}
                />
              </Box> */}

      <Box className={classes.pageContainer} id='scrollableDiv'>
        <Box className={classes.contentContainer}>
          <Box id='informativecookiesetting' ref={informativeFormRef}>
          {isLoading && <Loader />}
            <CommonBoxWithNumber
              number='01'
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t('subhead')}
              title={t("informative_cookie_setting")} // contentContainerSx={{ padding: '20px' }}
            >
              <Box className={classes.informativeContentContainer}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sm={8}
                    lg={8}
                    className={classes.informativeLeft}
                  >
                    <Grid container rowSpacing={1}>
                      {renderListControlFromArr(form.slice(0, 5))}
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.leftGridItem}
                      >
                        <TitleSubTitle
                          title={`${t('enter_cookie_country_list')}`}
                          subTitle={t('')}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.rightGridItem}
                      >
                        <MultiSelect
                          containerStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            borderRadius: '4px',
                            minHeight: '48px',
                          }}
                          list={coutryList}
                          onPickerChange={(e, name) => {
                            setInformativeList((preState) =>
                              preState.includes(name)
                                ? preState.filter((c) => c !== name)
                                : [...preState, name]
                            );
                          }}
                          defaultAmountOfItem={8}
                          mobileAmountOfItem={5}
                          value={informativeList}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sm={4}
                    lg={4}
                    className={classes.informativeSkeleton}
                  >
                    <Box className={classes.informativeSkeletonContainer}>
                      {informativeCookieSkeletonList.map((skeleton, index) => (
                        <Box
                          sx={{ marginTop: index > 0 ? '35px' : '0' }}
                          key={`skeleton${index + 1}`}
                        >
                          <Typography
                            className={classes.informativeSkeletonTitle}
                          >
                            {t(skeleton.title)}
                          </Typography>
                          {skeleton.component}
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CommonBoxWithNumber>
          </Box>

          <Box id='consentcookiesetting' ref={consentFormRef}>
            <CommonBoxWithNumber
              number='02'
              title={t('consent_cookie_setting')}
              subTitle={t('subhead')}
              panelStyle={{ marginTop: '30px' }}
              titleVarient='p3semibold'
              subTitleVarient='p4regular' >
              <Box className={classes.consentPanel}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sm={8}
                    lg={8}
                    className={classes.informativeLeft}
                  >
                    <Grid container rowSpacing={1}>
                      {renderListControlFromArr(form.slice(5, form.length))}

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.leftGridItem}
                      >
                        <TitleSubTitle
                          title={`${t('enter_cookie_country_list')}`}
                          subTitle={t('')}
                          titleVariant='h6medium'
                          subTitleVariant='h7regular'
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.rightGridItem}
                      >
                        <MultiSelect
                          list={coutryList}
                          onPickerChange={multiSelectChange}
                          defaultAmountOfItem={8}
                          mobileAmountOfItem={5}
                          value={consentList}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sm={4}
                    lg={4}
                    className={classes.informativeSkeleton}
                  >
                    <Box className={classes.informativeSkeletonContainer}>
                      {consentCookieSkeletonList.map((skeleton, index) => (
                        <Box
                          sx={{ marginTop: index > 0 ? '35px' : '0' }}
                          key={`skeleton${index + 1}`}
                        >
                          <Typography
                            className={classes.informativeSkeletonTitle}
                          >
                            {t(skeleton.title)}
                          </Typography>
                          {skeleton.component}
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CommonBoxWithNumber>
          </Box>
        </Box>
      </Box>
      </Box>
      {isNotificationToast && (
        <PlateformXDialogSuccess
          isDialogOpen={isNotificationToast}
          title={t('congratulations')}
          subTitle={`${t('cookie_settings_success')}`}
          confirmButtonText={t('go_to_dashboard')}
          confirmButtonHandle={() => navigate('/dashboard')}
          modalType='publish'
          crossButtonHandle={crossButtonHandle}
          closeButtonHandle={crossButtonHandle}
          closeIcon={<CreateRoundedIcon />}
        />
      )}
    </>
  );
};
