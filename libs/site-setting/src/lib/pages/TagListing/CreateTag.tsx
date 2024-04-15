import {
  Box,
  Grid,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  RadioGroup,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  TitleSubTitle,
  CommonBoxWithNumber,
  Loader,
  useUserSession,
  RadioControlLabel,
  ShowToastSuccess,
  ShowToastError,
} from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import { useTagStyle } from "./Tags.style";
import TopBar from "./TopBar";
import { createTag, fetchCategory, fetchTagListing, publishTag } from "@platformx/authoring-apis";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const CreateTags = () => {
  const classes = useTagStyle();
  const navigate = useNavigate();
  const { docPath } = useParams();
  const [value, setValue] = useState("");
  const [option, setOption] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [publishUrl, setPublishUrl] = useState(docPath || "");
  const { t } = useTranslation();
  const [category, setCategory] = useState("Choose Category");
  const [radio, setRadio] = useState("choose_category");
  const [isLoading, setIsLoading] = useState(false);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const handleChange = (e) => {
    const str = e.target.value.trimStart().replace("  ", " ");
    if (str.length < 20) {
      setCategory(str);
    }
  };
  const onChange = (e) => {
    const str = e.target.value ? e.target.value.trimStart().replace("  ", " ") : "";
    if (str.length < 24) {
      setValue(str);
    }
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "choose_category") {
      setCategory("Choose Category");
    } else {
      setCategory("");
    }
    setRadio(event.target.value);
  };

  const onSave = async () => {
    setIsLoading(true);
    try {
      const payload = {
        input: {
          CommonFields: {
            page: docPath ? docPath : value,
            createdby: username,
            lastmodifiedby: username,
            lastmodifieddate: "",
          },
          ObjectFields: {
            tag_name: value,
            tag_value: value,
            category: category,
            doc_state: "DRAFT",
          },
        },
      };
      const { authoring_createOrUpdateSiteSettings }: any = await createTag(payload);
      setPublishUrl(authoring_createOrUpdateSiteSettings.name);
      ShowToastSuccess(`${t("tag")} ${t(docPath ? "updated_toast" : "created_toast")}`);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      ShowToastError(t("api_error_toast"));
    }
  };

  const onPublish = async () => {
    setIsLoading(true);
    try {
      //const res =
      await publishTag({
        input: {
          page: docPath ? docPath : publishUrl,
          category: category,
          status: "publish",
          is_schedule: false,
          schedule_date_time: "",
        },
      });
      setIsLoading(false);
      ShowToastSuccess(`${t("tag")} ${t("published_toast")}`);
    } catch (err) {
      setIsLoading(false);
      ShowToastError(t("api_error_toast"));
    }
  };

  const getTag = async () => {
    try {
      const { authoring_getTagItems = [] }: any = await fetchTagListing({
        searchCategory: category,
        searchString: "",
        start: 0,
        rows: 1000,
      });
      if (authoring_getTagItems?.length > 0) {
        setTags(authoring_getTagItems);
      }
    } catch (error) {
      setTags([]);
      ShowToastError(t("api_error_toast"));
    }
  };

  const getTagByPath = async () => {
    try {
      const { authoring_getTagItems = [] }: any = await fetchTagListing({
        searchCategory: "",
        searchString: docPath,
        start: 0,
        rows: 5,
      });
      if (authoring_getTagItems?.length > 0) {
        setValue(authoring_getTagItems[0].tag_name);
        setCategory(authoring_getTagItems[0].category);
      }
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    }
  };

  const getCategory = async () => {
    try {
      const { authoring_getTagItems = [] }: any = await fetchCategory({
        searchCategory: "",
        searchString: "",
        start: 0,
        rows: 100,
      });
      // removing duplicate categories from response
      setOption(
        authoring_getTagItems.filter((obj, index) => {
          return index === authoring_getTagItems.findIndex((o) => obj.category === o.category);
        }),
      );
    } catch (error) {
      setOption([]);
      ShowToastError(t("api_error_toast"));
    }
  };

  useEffect(() => {
    if (docPath) {
      getTagByPath();
    }
    getCategory();
  }, []);

  useEffect(() => {
    if (radio === "choose_category" && category !== "Choose Category" && category.trim()) {
      getTag();
    } else {
      setTags([]);
    }
  }, [category]);

  return (
    <>
      <TopBar
        createText={`${t(docPath ? "update" : "create")} ${t("tag")}`}
        returnBack={() => navigate("/site-setting/tags")}
        handlePublish={onPublish}
        onSave={onSave}
        category={category}
        value={value}
        publishUrl={publishUrl}
        isCategoryDetail={false}
      />
      <Divider />
      {isLoading && <Loader />}
      <Box className={classes.pageContainer} id='scrollableDiv'>
        <Box className={classes.contentContainer}>
          <CommonBoxWithNumber
            number='01'
            title={t("Category Title")}
            titleVarient='p3semibold'
            subTitleVarient='p4regular'
            subTitle={t("subhead")}>
            <Grid container>
              <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                <TitleSubTitle
                  title={`${t("title")}*`}
                  subTitle={t("This will be your category title")}
                  titleVariant='h6medium'
                  subTitleVariant='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                {radio === "choose_category" ? (
                  <FormControl fullWidth>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      placeholder={t("choose_category")}
                      value={category}
                      onChange={handleChange}
                      disabled={!!publishUrl}
                      MenuProps={MenuProps}
                      sx={{
                        color: category === "Choose Category" ? "#ced3d9" : "#2d2d39",
                      }}>
                      <MenuItem value='Choose Category' disabled>
                        {t("choose_category")}
                      </MenuItem>
                      {option?.length > 0 &&
                        option.map((obj) => (
                          <MenuItem key={obj.category} value={obj.category}>
                            {obj.category}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    placeholder={t("create_category")}
                    value={category}
                    onChange={handleChange}
                  />
                )}

                <RadioGroup
                  name='page-radio-buttons-group'
                  value={radio}
                  onChange={handleRadioChange}
                  row>
                  <RadioControlLabel
                    value='choose_category'
                    disabled={!!publishUrl}
                    label={t("choose_category")}
                  />
                  <RadioControlLabel
                    value='create_category'
                    disabled={!!publishUrl}
                    label={t("create_category")}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </CommonBoxWithNumber>
          <CommonBoxWithNumber
            number='02'
            title={`${t("create")} ${t("tag")}`}
            titleVarient='p3semibold'
            subTitleVarient='p4regular'
            subTitle={t("subhead")}>
            <Grid container>
              <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                <TitleSubTitle
                  title={`${t("Tags")}*`}
                  subTitle={t("Create your tags")}
                  titleVariant='h6medium'
                  subTitleVariant='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                <TextField
                  placeholder='Please type your text here'
                  value={value}
                  onChange={onChange}
                />

                <Box className={classes.tagParent}>
                  {value && (
                    <Box className={`${classes.createbtn} ${classes.txtcolor}`}>
                      <Button
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        color='primary'
                        className={classes.textTransform}>
                        {value}
                      </Button>
                    </Box>
                  )}
                  {tags?.length > 0 &&
                    tags.map(
                      (val) =>
                        val.doc_path !== docPath && (
                          <Box
                            className={`${classes.createbtn} ${classes.txtcolor}`}
                            key={val.tag_name}>
                            <Button
                              disableRipple
                              disableFocusRipple
                              disableTouchRipple
                              color='primary'
                              className={classes.textTransform}>
                              {val.tag_name}
                            </Button>
                          </Box>
                        ),
                    )}
                </Box>
              </Grid>
            </Grid>
          </CommonBoxWithNumber>
        </Box>
      </Box>
    </>
  );
};
