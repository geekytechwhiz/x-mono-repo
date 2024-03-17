import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RootState, updatePageTitle, updatePageSettings } from "@platformx/authoring-state";
import { ThemeConstants, getSubDomain, BasicSwitch, ShowToastSuccess } from "@platformx/utilities";
import { descriptionLength, nameLength } from "../utils/constants";
import { PageInformation } from "../utils/editTypes";
import BackButton from "../BackButton/BackButton";
import "./PageSettings.css";
import { useDispatch, useSelector } from "react-redux";

const PageInfo = ({ setPageId }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state);
  const { PageName, PageDescription, PageTags, PageURL, PageViewer, PageMobileFriendly } =
    page.pageSettings;
  const initialPageInfo = useRef<PageInformation>({
    PageName: "",
    PageDescription: "",
    PageTags: [],
    PageURL: `${getSubDomain()}/${i18n.language}/${page?.pageModel.Page}`,
    PageViewer: "",
    PageCaching: true,
    PageMobileFriendly: false,
  });
  const [pageInfo, setPageInfo] = useState<PageInformation>(initialPageInfo.current);
  const [handleImpression] = usePlatformAnalytics();

  const handlePageViewerChangeDropDown = (event) => {
    setPageInfo({ ...pageInfo, PageViewer: event.target.value });
  };
  // Function to handle switch changes
  const handleControlsChange = (event) => {
    setPageInfo({ ...pageInfo, PageMobileFriendly: event.target.checked });
  };
  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    setPageInfo({ ...pageInfo, [fieldType]: event.target.value });
  };

  const getDisabledState = () => {
    return pageInfo.PageName === "" || pageInfo.PageName.trim().length === 0;
  };

  // Function to save page information
  const savePageInfo = () => {
    dispatch(updatePageTitle({ Title: pageInfo.PageName }));
    dispatch(updatePageSettings({ pageInfo: pageInfo }));
    const pageDataObj = {
      eventType: "Pageinfo PageSetting Saved",
      pageInfoSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
    ShowToastSuccess(`${t("page_info_toast")} ${t("saved_toast")}`);
  };

  useEffect(() => {
    if (page?.pageSettings) {
      initialPageInfo.current = {
        PageName: PageName !== undefined ? PageName : "",
        PageDescription: PageDescription !== undefined ? PageDescription : "",
        PageTags: PageTags !== undefined ? PageTags : [],
        PageURL:
          PageURL !== undefined
            ? PageURL
            : `${getSubDomain()}/${i18n.language}/${page?.pageModel.Page}`,
        PageViewer: PageViewer !== undefined ? PageViewer : "free",
        PageCaching: true,
        PageMobileFriendly: PageMobileFriendly !== undefined ? PageMobileFriendly : false,
      };
      setPageInfo(initialPageInfo.current);
    }
  }, [page?.pageSettings]);

  return (
    <Box className='pageSettingmainWp'>
      <BackButton setPageId={setPageId} Title='Page Info' />
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_info_title")}
        </Typography>
        <TextField
          size='small'
          multiline
          value={pageInfo.PageName}
          onChange={(e) => handleDataChange(e, "PageName")}
          variant='outlined'
          placeholder={t("page_info_title_placeholder")}
          inputProps={{ maxLength: nameLength }}
        />
        {getDisabledState() && (
          <Typography
            variant='h7regular'
            sx={{
              color: ThemeConstants.NOTIFICATION_ERROR,
            }}>
            {t("page_info_title_warning")}
          </Typography>
        )}
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_info_about")}
        </Typography>
        <TextField
          multiline
          value={pageInfo.PageDescription}
          onChange={(e) => handleDataChange(e, "PageDescription")}
          variant='outlined'
          size='small'
          placeholder={t("page_info_about_placeholder")}
          inputProps={{ maxLength: descriptionLength }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_info_tags")}
        </Typography>
        <Autocomplete
          size='small'
          multiple
          id='tags-filled'
          value={[...pageInfo?.PageTags]}
          options={[]}
          onChange={(event: object, value) => {
            const result = value.filter((str) => str.trim().length !== 0);
            setPageInfo({ ...pageInfo, PageTags: result });
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
                      deleteIcon={<DeleteIcon sx={{ color: ThemeConstants.PRIMARY_MAIN_COLOR }} />}
                      sx={{
                        ".Platform-x-Chip-deleteIcon": {
                          color: ThemeConstants.BLACK_COLOR,
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
              variant='outlined'
              {...params}
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
        <Typography className='labelbox' variant='p4regular'>
          {t("page_info_url")}
        </Typography>
        <TextField
          size='small'
          multiline
          value={pageInfo.PageURL}
          onChange={(e) => handleDataChange(e, "PageURL")}
          variant='outlined'
          placeholder='Write a page URL here'
          sx={{
            ".Platform-x-OutlinedInput-root": { color: "#1a0db1" },
          }}
          inputProps={{ readOnly: true }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t("page_info_view")}
        </Typography>
        <FormControl fullWidth>
          <Select
            size='small'
            value={pageInfo.PageViewer}
            variant='outlined'
            onChange={(e) => handlePageViewerChangeDropDown(e)}>
            <MenuItem value='free'>{t("page_info_free")}</MenuItem>
            <MenuItem value='behindlogin'>{t("page_info_behindlogin")}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t("page_info_friendly")}
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            onChange={(e: any) => handleControlsChange(e)}
            checked={pageInfo.PageMobileFriendly}
          />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          onClick={savePageInfo}
          disabled={getDisabledState() || initialPageInfo.current === pageInfo}
          sx={{ width: "100%" }}>
          {t("done")}
        </Button>
      </Box>
    </Box>
  );
};
export default PageInfo;
