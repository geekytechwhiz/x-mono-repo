import { Box, Divider, Grid, RadioGroup } from "@mui/material";
import {
  AutoTextArea,
  CATEGORY_CONTENT,
  CommonBoxWithNumber,
  DuplicateContentPopup,
  PlateformXDialog,
  RadioControlLabel,
  ShowToastSuccess,
  TextBox,
  TitleSubTitle,
  XLoader,
} from "@platformx/utilities";
import { DamContentGallery, XImageRender } from "@platformx/x-image-render";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateHeader } from "../../../../components/CreateHeader/CreateHeader";
import { ContentType } from "../../../../enums/ContentType";
import useQuestion from "../../../../hooks/useQuestion/useQuestion";
import { onBackButtonEvent, unloadCallback } from "../../../../utils/Helper";
import { useCustomStyle } from "../../quiz.style";
import AnswerContent from "./AnswerContent";

const AddQuestion = ({ setAddQuestion, saveQuestionCallBack, qusUnsavedChanges, questionId }) => {
  const { t } = useTranslation();
  const [addImage, setAddImage] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([
    { id: "1", option: "", image: "", status: true },
    { id: "2", option: "", image: "", status: false },
  ]);
  const [addQuestionInfo, setAddQuestionInfo] = useState<any>({
    questionId: "",
    questionType: "Single",
    queBackgroundImg: "",
    question: "",
    shortDesc: "",
    isImg: true,
    backgroundColor: "",
  });
  const galleryType = useRef<string>("Images");
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [key, setKey] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [exitPopUp, setExitPopUp] = useState(false);
  const { isLoading, onSaveQuestion } = useQuestion(
    setAnswers,
    setAddImage,
    setAddQuestionInfo,
    saveQuestionCallBack,
    setOpenPageExistModal,
    addQuestionInfo,
    answers,
    addImage,
    setExitPopUp,
    questionId,
  );

  const getDuplicateTitle = () => {
    const newVal = `${t("copy_of")} ${addQuestionInfo.Title}`.trim();
    const duplicateQuestionTitle = newVal.length > 100 ? newVal.slice(0, 100) : newVal;
    return duplicateQuestionTitle.trim();
  };

  const handleRefresh = () => {
    setAddQuestionInfo({
      ...addQuestionInfo,
      queBackgroundImg: "",
      isImg: true,
      backgroundColor: "",
    });
  };

  const handleColorPallete = (color) => {
    qusUnsavedChanges.current = true;
    setAddQuestionInfo({
      ...addQuestionInfo,
      queBackgroundImg: "",
      isImg: false,
      backgroundColor: color,
    });
  };

  const handleChange = (event) => {
    qusUnsavedChanges.current = true;
    setAddQuestionInfo({
      ...addQuestionInfo,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "questionType" && event.target.value === "Multiple") {
      let lastAnswerID = 0;
      if (answers.length > 0) {
        lastAnswerID = parseInt(answers[answers.length - 1].id);
      }
      if (answers.length < 3) {
        const temp = Array.from(Array(3 - (answers.length + 1) + 1).keys())
          .map((x) => x + (lastAnswerID + 1))
          .map((val) => {
            return { id: `${val}`, option: "", image: "", status: false };
          });
        setAnswers([...answers, ...temp]);
      }
      if (addImage) {
        setAddImage(false);
      }
    }
    if (event.target.name === "questionType" && event.target.value === "Single") {
      if (answers.length > 2) {
        const temp = answers.filter((x, k) => x.option === "" && parseInt(k) > 1).map((y) => y.id);
        setAnswers([...answers.filter((val) => !temp.includes(val.id))]);
      }
    }
  };

  const showGallery = (gType, keyName, id?: any) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    setKey(keyName);
    if (id) {
      setAnswerId(id);
    }
  };

  const OnBackClick = () => {
    if (qusUnsavedChanges.current === true) {
      setExitPopUp(true);
    } else {
      setAddQuestion(false);
    }
  };
  const onHandleCloseButton = () => {
    setExitPopUp(false);
    setAddQuestion(false);
    qusUnsavedChanges.current = false;
  };
  const onHandleCrossButton = () => {
    setExitPopUp(false);
  };

  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    onSaveQuestion(true);
  };

  const pageExistCloseHandle = () => {
    setOpenPageExistModal(false);
  };

  const onClickClose = () => {
    setShowDuplicateModal(false);
  };

  const navigateTo = () => {
    setAddQuestion(false);
    qusUnsavedChanges.current = false;
  };

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
  };

  const handleSelectedImage = (image, keyName) => {
    qusUnsavedChanges.current = true;
    if (keyName === "answers") {
      setAnswers(
        answers.map((answer) =>
          answer.id === answerId ? { ...answer, image: image?.Thumbnail } : answer,
        ) as [],
      );
    }
    ShowToastSuccess(`${t("image")} ${t("added_toast")}`);
  };

  useEffect(() => {
    if (qusUnsavedChanges.current === true) {
      window.history.pushState(null, "", window.location.pathname + window.location?.search);
      window.addEventListener("beforeunload", (e) => unloadCallback(e, qusUnsavedChanges.current));
      window.addEventListener("popstate", (e) =>
        onBackButtonEvent(e, qusUnsavedChanges.current, setExitPopUp, navigateTo),
      );
    }
    return () => {
      window.removeEventListener("beforeunload", (e) =>
        unloadCallback(e, qusUnsavedChanges.current),
      );
      window.removeEventListener("popstate", (e) =>
        onBackButtonEvent(e, qusUnsavedChanges.current, setExitPopUp, navigateTo),
      );
    };
  }, [qusUnsavedChanges.current]);

  const updateField = (updatedPartialObj) => {
    setAddQuestionInfo({
      ...addQuestionInfo,
      queBackgroundImg: { ...updatedPartialObj },
      isImg: true,
      backgroundColor: "",
    });
    qusUnsavedChanges.current = true;
  };

  const classes = useCustomStyle();
  return (
    <>
      <DamContentGallery
        handleImageSelected={handleSelectedImage}
        toggleGallery={toggleGallery}
        assetType={"Image"}
        keyName={key}
        isCrop={false}
        dialogOpen={galleryState}
      />
      <Box>
        {isLoading && <XLoader type='linear' />}
        <Box>
          <Box>
            <CreateHeader
              hasPreviewButton
              createText={
                questionId !== "" ? `${t("add")} ${t("quiz_question_head")}` : t("add_questions")
              }
              handleReturn={OnBackClick}
              isQuiz
              hasPublishButton={false}
              hasSaveButton={false}
              handleSaveOrPublish={onSaveQuestion}
              saveText={questionId !== "" ? t("update") : t("done")}
              previewText='Preview'
              showPreview={false}
              toolTipText='Unable to preview please add required details'
              saveVariant='contained'
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Quiz}
              isFeatured={false}
            />
            <Divider></Divider>
          </Box>
          <Box
            sx={{
              position: "relative",
              height: { sm: "calc(100vh - 125px)", xs: "calc(100vh - 42px)" },
              maxWidth: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            id='scrollableDiv'
            className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='01'
              title={t("quiz_question_content")}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t("subhead")}>
              <Grid container>
                <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                  <TitleSubTitle
                    title={t("quiz_question_type")}
                    subTitle={t("quiz_question_type_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} className='textFiled'>
                  <Box>
                    <RadioGroup
                      name='questionType'
                      value={addQuestionInfo.questionType}
                      onChange={handleChange}
                      row>
                      <RadioControlLabel value='Single' label={t("quiz_sigle_choise")} />
                      <RadioControlLabel value='Multiple' label={t("quiz_multi_choise")} />
                    </RadioGroup>
                  </Box>
                </Grid>
              </Grid>
              <Grid container rowSpacing={1}>
                <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                  <TitleSubTitle
                    title={`${t("quiz_question_head")}*`}
                    subTitle={t("quiz_addqus_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                  <TextBox
                    name='question'
                    placeHolder={t("qus_placeholder")}
                    handleChange={handleChange}
                    maxCharLength={120}
                    state={addQuestionInfo.question}
                  />
                </Grid>
                <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                  <TitleSubTitle
                    title={t("quiz_addqus_description")}
                    subTitle={t("quiz_addqus_subdes")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} className='textFiled'>
                  <AutoTextArea
                    name='shortDesc'
                    placeHolder={t("quiz_description_placeholder")}
                    handleChange={handleChange}
                    maxCharLength={400}
                    state={addQuestionInfo.shortDesc}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
                  <TitleSubTitle
                    title={t("quiz_addqus_image_title")}
                    subTitle={t("quiz_addqus_image_subtitle")}
                    titleVariant='h6medium'
                    subTitleVariant='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
                  <XImageRender
                    callBack={updateField}
                    editData={{
                      original_image: addQuestionInfo.queBackgroundImg.original_image,
                      published_images: addQuestionInfo.queBackgroundImg.published_images,
                      isImg: addQuestionInfo.isImg,
                      colorCode: addQuestionInfo.backgroundColor,
                    }}
                    isColorPallete={true}
                    handleRefresh={handleRefresh}
                    handleColorPallete={handleColorPallete}
                  />
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
            <AnswerContent
              showGallery={showGallery}
              answers={answers}
              setAnswers={setAnswers}
              addImage={addImage}
              setAddImage={setAddImage}
              questionType={addQuestionInfo.questionType}
              qusUnsavedChanges={qusUnsavedChanges}
            />
          </Box>
        </Box>
      </Box>
      {showDuplicateModal ? (
        <DuplicateContentPopup
          titledata={`${getDuplicateTitle()}`}
          isDialogOpen={showDuplicateModal}
          closeButtonHandle={onClickClose}
          doneButtonHandle={() => {
            onSaveQuestion(true);
          }}
          contentType='Question'
        />
      ) : null}
      {openPageExistModal ? (
        <PlateformXDialog
          isDialogOpen={openPageExistModal}
          title={`${t("quiz")} ${t("duplicate_exists")}`}
          subTitle={t("conformation")}
          closeButtonText={t("no")}
          confirmButtonText={t("yes")}
          closeButtonHandle={pageExistCloseHandle}
          confirmButtonHandle={pageExistYesButtonHandle}
          crossButtonHandle={pageExistCloseHandle}
          modalType=''
        />
      ) : null}
      {exitPopUp ? (
        <PlateformXDialog
          isDialogOpen={exitPopUp}
          title={t("save_warn_title")}
          subTitle={t("save_warn_subtitle")}
          closeButtonText={t("take_me_out")}
          confirmButtonText={t("done")}
          closeButtonHandle={onHandleCloseButton}
          confirmButtonHandle={onSaveQuestion}
          crossButtonHandle={onHandleCrossButton}
          modalType='unsavedChanges'
        />
      ) : null}
    </>
  );
};
export default AddQuestion;
