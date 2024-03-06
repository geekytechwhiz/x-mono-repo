import {
  Box,
  Grid,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TitleSubTitle, CommonBoxWithNumber, Loader } from "@platformx/utilities";
import { CreateHeader } from "@platformx/content";
import { useState } from "react";
import { useTagStyle } from "./Tags.style";

export const CreateTags = () => {
  const classes = useTagStyle();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const { t } = useTranslation();
  const [, setAge] = useState("");

  const handleBlur = () => {
    if (textFieldValue.trim() !== "") {
      setShowButton(true);
    }
  };

  const handleClick = () => {
    // Reset the text field value and hide the button
    setTextFieldValue("");
    setShowButton(false);
  };

  // eslint-disable-next-line require-await
  const onSaveClick = async () => {
    setIsLoading(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <CreateHeader
        createText={t("Create New")}
        handleReturn={() => {
          navigate("/dashboard");
        }}
        isQuiz
        hasPublishButton={true}
        hasPreviewButton={false}
        hasSaveButton={false}
        saveText={t("update")}
        handelPreview={() => {
          /* your function code */
        }}
        handlePublish={onSaveClick}
        handleSaveOrPublish={onSaveClick}
        previewText='Preview'
        showPreview={false}
        toolTipText='Unable to preview please add required details'
        saveVariant='contained'
        category={"content"}
        subCategory={"quiz"}
        isFeatured={false}
      />
      <Divider />
      <Box className={classes.pageContainer} id='scrollableDiv'>
        <Box className={classes.contentContainer}>
          {isLoading && <Loader />}
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
                <FormControl fullWidth>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    placeholder='Select or Create Category'
                    onChange={handleChange}>
                    <MenuItem value={10}>Sports</MenuItem>
                    <MenuItem value={20}>Bollywood</MenuItem>
                    <MenuItem value={30}>Fashion</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CommonBoxWithNumber>
          <CommonBoxWithNumber
            number='02'
            title={t("Create Tags")}
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
                  placeholder='please type your text here'
                  value={textFieldValue}
                  onChange={(e) => setTextFieldValue(e.target.value)}
                  onBlur={handleBlur}
                />
                {showButton && (
                  <Button
                    className={classes.tagsbtn}
                    variant='contained'
                    color='primary'
                    onClick={handleClick}>
                    {textFieldValue}
                  </Button>
                )}
              </Grid>
            </Grid>
          </CommonBoxWithNumber>
        </Box>
      </Box>
    </>
  );
};
