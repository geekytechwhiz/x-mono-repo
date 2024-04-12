import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, Box, Button, Chip, TextField, Typography } from "@mui/material";
import {
  RootState,
  updateContentForCard,
  updatePageSettings,
  updateSeoEnable,
} from "@platformx/authoring-state";
import {
  BasicSwitch,
  ShowToastSuccess,
  ThemeConstants,
  siteLevelSchema,
  usePlatformAnalytics,
} from "@platformx/utilities";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../BackButton/BackButton";
import { descriptionLength, nameLength, previewNameLength } from "../utils/constants";
import { PageSeoInformation } from "../utils/editTypes";
import "./PageSettings.css";
import { useCustomStyle } from "./SEOBasics.style";

const SEOBasics = ({ setPageId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state);
  const { SeoTitle, SeoDescription, SeoKeywords, PageName, PageDescription, PageTags, PageURL } =
    page.pageSettings;
  const { SeoEnable } = page.pageModel;
  const initialSeoInfo = useRef<PageSeoInformation>({
    SeoTitle: "",
    SeoDescription: "",
    SeoKeywords: [],
    PageURL: "",
    SeoBlockIndexing: true,
  });
  const [seoInfo, setSeoInfo] = useState<PageSeoInformation>(initialSeoInfo.current);
  const [handleImpression] = usePlatformAnalytics();
  const classes = useCustomStyle();
  useEffect(() => {
    if (page?.pageSettings) {
      initialSeoInfo.current = {
        SeoTitle:
          SeoTitle !== undefined
            ? SeoTitle
            : PageName === undefined
              ? ""
              : `${PageName} | ${siteLevelSchema.siteName}`,
        SeoDescription:
          SeoDescription !== undefined
            ? SeoDescription
            : PageDescription === undefined
              ? ""
              : PageDescription,
        SeoKeywords:
          SeoKeywords !== undefined
            ? [...page.pageSettings.SeoKeywords]
            : PageTags === undefined
              ? []
              : [...PageTags],
        PageURL: PageURL !== undefined ? PageURL : "",
        SeoBlockIndexing: SeoEnable !== undefined ? SeoEnable : true,
      };
      setSeoInfo(initialSeoInfo.current);
    }
  }, [page?.pageSettings]);

  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    setSeoInfo({ ...seoInfo, [fieldType]: event.target.value });
  };
  // Function to handle switch changes
  const handleControlsChange = (event) => {
    setSeoInfo({ ...seoInfo, SeoBlockIndexing: event.target.checked });
  };

  const saveSeoBasics = () => {
    dispatch(updateSeoEnable({ SeoEnable: seoInfo.SeoBlockIndexing }));
    page?.prelemMetaArray?.map((item, index) => {
      dispatch(
        updateContentForCard({
          selectedPrelemIndex: index,
          sectionToUpdate: "SeoEnabled",
          data: seoInfo.SeoBlockIndexing,
          index: undefined,
        }),
      );
    });
    dispatch(updatePageSettings({ pageInfo: seoInfo }));
    const pageDataObj = {
      eventType: "SEOBasics PageSetting Saved",
      SeoBasicsSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
    ShowToastSuccess(`${t("seo_info_toast")} ${t("saved_toast")}`);
  };

  return (
    <Box className='pageSettingmainWp'>
      <BackButton setPageId={setPageId} Title={t("page_seo_basic")} />
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_search_preview")}
        </Typography>
        <Box className='seobasicBox'>
          <Typography variant='p4regular'>{seoInfo.PageURL}</Typography>
          <Typography variant='p4regular' mb='5px' color='#4B9EF9'>
            {seoInfo.SeoTitle.substring(0, previewNameLength)}
            {seoInfo.SeoTitle.length > previewNameLength && <span>...</span>}
          </Typography>
          <Typography variant='h7regular'>{seoInfo.SeoDescription}</Typography>
          <Typography variant='h7regular'>{seoInfo.SeoKeywords}</Typography>
        </Box>
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_search_title")}
        </Typography>
        <TextField
          size='small'
          multiline
          value={seoInfo.SeoTitle}
          onChange={(e) => handleDataChange(e, "SeoTitle")}
          variant='outlined'
          placeholder={t("page_search_title_placeholder")}
          inputProps={{ maxLength: nameLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_search_description")}
        </Typography>
        <TextField
          size='small'
          multiline
          value={seoInfo.SeoDescription}
          onChange={(e) => handleDataChange(e, "SeoDescription")}
          variant='outlined'
          placeholder={t("page_search_description_placeholder")}
          inputProps={{ maxLength: descriptionLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_search_keywords")}
        </Typography>
        <Autocomplete
          multiple
          id='tags-filled'
          value={[...seoInfo.SeoKeywords]}
          options={[]}
          onChange={(event: object, value) => {
            const result = value.filter((str) => str.trim().length !== 0);
            setSeoInfo({ ...seoInfo, SeoKeywords: result });
          }}
          freeSolo
          renderTags={(value: string[], getTagProps) =>
            value.map(
              (option: string, index: number) =>
                option && (
                  <Box key={index} mt={1}>
                    <Chip
                      variant='outlined'
                      label={option}
                      deleteIcon={<DeleteIcon sx={{ color: "#2d2d39" }} />}
                      sx={{
                        ".Platform-x-Chip-deleteIcon": {
                          color: "#000",
                        },
                      }}
                      {...getTagProps({ index })}
                    />
                  </Box>
                ),
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              placeholder={t("page_info_tags_placeholder")}
            />
          )}
          sx={{
            "& .Platform-x-InputBase-root": {
              flexWrap: "wrap",
              width: "auto",
            },
            ".Platform-x-Autocomplete-tag": {
              margin: "0 5px 5px 0",
            },
            "& .Platform-x-InputBase-input": {
              width: 0,
              minWidth: "150px",
            },
          }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className={`${classes.switchBoxContainer} switchbox`} variant='p4regular'>
          {t("page_search_seokey")}
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            onChange={(e: any) => handleControlsChange(e)}
            checked={seoInfo.SeoBlockIndexing}
            basicSwitchRootClassName='switchRootClass'
          />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={initialSeoInfo.current === seoInfo}
          onClick={saveSeoBasics}
          sx={{ width: "100%" }}>
          {t("done")}
        </Button>
      </Box>
    </Box>
  );
};
export default SEOBasics;
