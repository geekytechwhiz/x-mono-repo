import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MultiSelect,
  TitleSubTitle,
  TextBox,
  AutoTextArea,
  AssetcatIcon,
  Assetmedia,
  CommonBoxWithNumber,
} from "@platformx/utilities";
import { Button, Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useCreateAssestsStyle } from "./CreateAssets.style";
import { CreateHeader } from "@platformx/content";
import { useTranslation } from "react-i18next";
import PlateformXFolderDialog from "./ChooseFolderModal";
import { assetsApi } from "@platformx/authoring-apis";

export const CreateAsset = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isShowPreview] = useState<boolean>(false);
  const [folderValue, setFolderValue] = useState(false);
  const [languageOptionList] = useState<any>([]);
  const classes = useCreateAssestsStyle({ isShowPreview })();
  // const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleFilterClose = () => {
    // setAnchor(null);
  };

  const handlePublish = async () => {
    try {
      //const res =
      await assetsApi.publishAsset({
        uuid: "6316f598-7cd3-4d69-beaa-a42d6b4aac23",
        status: "publish",
        uploadId: 3890,
        metadata: {
          title: "test-deposit7",
          description: "test deposit api",
          type: "Image",
          author: "Harsh",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CreateHeader
        createText={t("create_asset")}
        handleReturn={() => {
          navigate("/dashboard");
        }}
        isQuiz
        hasPublishButton={true}
        hasPreviewButton={false}
        hasSaveButton={false}
        saveText={t("publish")}
        handelPreview={() => {
          /* your function code */
        }}
        handleSaveOrPublish={handlePublish}
        previewText={t("preview")}
        showPreview={false}
        toolTipText={t("preview_tooltip")}
        saveVariant='contained'
        category='content'
        subCategory='quiz'
        isFeatured={false}
      />
      <Divider></Divider>
      <Box className={classes.assetscrollbox}>
        <Box className={classes.topalertbox}>
          <Typography className={classes.toptypo}>{t("asset_alert")}</Typography>
          <CloseIcon className={classes.closebar} />
        </Box>
        <Divider></Divider>
        <Box className={classes.pageContainer}>
          <Box className={classes.erroroutbox}>
            <Box className={classes.boxwrapper}>
              <Box className={classes.boxwrapper1}>
                <Box className={classes.boxwrapper2}>
                  <img src={Assetmedia} alt='' />
                </Box>
                <Box className={classes.commonboxtext}>
                  <Typography>common metadata</Typography>
                </Box>
              </Box>

              <Box className={classes.createimage}>
                <img src={AssetcatIcon} alt={""} className='' />
              </Box>
              <Box className={classes.createimage}>
                <img src={AssetcatIcon} alt={""} className='' />
              </Box>
              <Box className={classes.createimage}>
                <img src={AssetcatIcon} alt={""} className='' />
              </Box>
              <Box className={classes.createimage}>
                <img src={AssetcatIcon} alt={""} className='' />
              </Box>
              <Box className={classes.createimage}>
                <img src={AssetcatIcon} alt={""} className='' />
              </Box>

              <Box className={classes.createimage1}>
                <img src={AssetcatIcon} alt={""} className='' />
              </Box>
              <Button
                variant='primaryButton'
                sx={{ position: "absolute" }}
                className={classes.wrapperbutton}>
                {t("view_more")}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.erroroutbox}>
          <ErrorOutlineIcon className={classes.erroricon} />
          <Typography>{t("alert_heading")}</Typography>
        </Box>

        <Box className={classes.pageContainer}>
          <Box className={classes.contentContainer}>
            <Box></Box>
            <Box>
              <CommonBoxWithNumber
                number='01'
                title={t("asset_details")}
                subTitle={t("subhead")}
                titleVarient='p3semibold'
                subTitleVarient='p4regular'>
                <Grid container marginTop={"15px"}>
                  <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                    <TitleSubTitle
                      title={t("asset_type")}
                      titleVariant='h6medium'
                      subTitleVariant='h7regular'
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'></InputLabel>
                      <Select labelId='demo-simple-select-label' id='demo-simple-select'>
                        <MenuItem></MenuItem>
                      </Select>

                      <Box component='span' className={classes.inputbox}></Box>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                    <TitleSubTitle
                      title={t("upload_assets")}
                      subTitle={t("upload_subhead")}
                      titleVariant='h6medium'
                      subTitleVariant='h7regular'
                    />
                  </Grid>
                </Grid>
              </CommonBoxWithNumber>
            </Box>
            <Box>
              <CommonBoxWithNumber
                number='02'
                title={t("title_head")}
                subTitle={t("subhead")}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
                panelStyle={{ marginTop: "30px" }}>
                <Grid container marginTop={"15px"}>
                  <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                    <TitleSubTitle
                      title={t("title")}
                      subTitle={t("title_subhead")}
                      titleVariant='h6medium'
                      subTitleVariant='h7regular'
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                    <TextBox
                      name='short_title'
                      placeHolder={t("event_short_title_placeholder")}
                      maxCharLength={60}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                    <TitleSubTitle
                      title={`${t("description")}*`}
                      subTitle={t("description_subhead")}
                      titleVariant='h6medium'
                      subTitleVariant='h7regular'
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={7} className='textFiled'>
                    <AutoTextArea
                      name='description'
                      placeHolder={t("event_desciption_placeholder")}
                      maxCharLength={1000}
                    />
                  </Grid>
                </Grid>
              </CommonBoxWithNumber>
            </Box>
            <Box>
              <CommonBoxWithNumber
                number='03'
                title={t("custom_meta_data")}
                subTitle={t("subhead")}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
                panelStyle={{ marginTop: "30px" }}>
                <Grid container marginTop={"15px"}>
                  <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                    <TitleSubTitle
                      title={t("mega_pixels")}
                      titleVariant='h6medium'
                      subTitleVariant='h7regular'
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                    <TextBox name='first_name' placeHolder={t("first_name_placeholder")} />
                  </Grid>
                </Grid>
                <Grid container marginTop={"30px"}>
                  <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                    <TitleSubTitle
                      title={t("image_resolution")}
                      titleVariant='h6medium'
                      subTitleVariant='h7regular'
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                    <TextBox name='first_name' placeHolder={t("first_name_placeholder")} />
                  </Grid>
                </Grid>
                <Grid container marginTop={"30px"}>
                  <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                    <TitleSubTitle
                      title={t("category")}
                      titleVariant='h6medium'
                      subTitleVariant='h7regular'
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                    <TextBox name='first_name' placeHolder={t("first_name_placeholder")} />
                  </Grid>
                </Grid>
                <Grid container marginTop={"30px"}>
                  <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                    <TitleSubTitle
                      title={t("color_type")}
                      titleVariant='h6medium'
                      subTitleVariant='h7regular'
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                    <TextBox name='first_name' placeHolder={t("first_name_placeholder")} />
                    <Typography>.. view more</Typography>
                  </Grid>
                </Grid>
              </CommonBoxWithNumber>
            </Box>
            <Box>
              <CommonBoxWithNumber
                number='04'
                title={t("choose_folder")}
                subTitle={t("subhead")}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
                panelStyle={{ marginTop: "30px" }}>
                <Grid container>
                  <Grid item xs={12} sm={5} md={5} lg={5}>
                    <Box>
                      <TitleSubTitle
                        title={`${t("folder")}*`}
                        titleVariant='h6medium'
                        subTitleVariant='h7regular'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7} lg={7} className={classes.boxfolder}>
                    <Box>Football</Box>
                    <Box
                      onClick={() => {
                        setFolderValue(true);
                        handleFilterClose();
                      }}>
                      <KeyboardArrowRightIcon />
                    </Box>
                  </Grid>
                  <PlateformXFolderDialog
                    isDialogOpen={folderValue}
                    closeButtonHandle={() => setFolderValue(false)}
                  />
                </Grid>
              </CommonBoxWithNumber>
            </Box>
            <Box>
              <CommonBoxWithNumber
                number='05'
                title={t("choose_tags_asset")}
                subTitle={t("subhead")}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
                panelStyle={{ marginTop: "30px" }}>
                <Grid container>
                  <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftForm}>
                    <MultiSelect
                      title={t("tags")}
                      list={languageOptionList}
                      defaultAmountOfItem={10}
                      mobileAmountOfItem={5}
                      onPickerChange={undefined}
                    />
                  </Grid>
                </Grid>
              </CommonBoxWithNumber>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
