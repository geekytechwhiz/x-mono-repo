import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Drag,
  DragAndDrop,
  DeleteIcon,
  Drop,
  ShowToastError,
  getRandomNumber,
  Icon,
} from "@platformx/utilities";

export const Options = ({ addImage, showGallery, answers, setAnswers, qusUnsavedChanges }) => {
  const { t } = useTranslation();
  const [, setOperationType] = useState<string>("replace");
  const [isDeleteDisable, setIsDeleteDisable] = useState(true);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result) => {
    const { type, source, destination } = result;
    if (!destination) return;
    // Reordering categories
    if (type === "droppable-category") {
      const updatedAnswers = reorder(answers, source.index, destination.index);
      setAnswers(updatedAnswers as []);
    }
  };

  const handleChange = (event) => {
    qusUnsavedChanges.current = true;
    const temp = answers.map((answer) =>
      answer.id === event.target.name ? { ...answer, option: event.target.value } : answer,
    ) as [];
    setAnswers(temp);
  };

  const onUploadClick = (type, id) => {
    qusUnsavedChanges.current = true;
    showGallery(type, "answers", id);
    setOperationType(type);
  };

  const onAddOption = () => {
    qusUnsavedChanges.current = true;
    if (answers.length < 10) {
      setAnswers([
        ...answers,
        { id: `${getRandomNumber(answers, 1, 200)}`, option: "", image: "" },
      ]);
    } else {
      ShowToastError(t("options_limit_toast"));
    }
  };

  useEffect(() => {
    if (answers.length <= 2) {
      setIsDeleteDisable(true);
    } else {
      setIsDeleteDisable(false);
    }
  }, [answers]);

  const onDeleteOption = (id) => {
    qusUnsavedChanges.current = true;
    setAnswers(answers.filter((item) => item.id !== id));
  };

  return (
    <>
      <DragAndDrop onDragEnd={handleDragEnd}>
        <Drop id='droppable' type='droppable-category'>
          {answers.map((answer, answerIndex) => {
            return (
              <Drag
                className='draggable-category'
                key={answer.id}
                id={answer.id}
                index={answerIndex}>
                <Grid container className='category-container'>
                  {addImage && (
                    <Grid
                      item
                      xs={2.25}
                      sm={1.5}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      {answer.image ? (
                        <Box
                          sx={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            position: "relative",
                          }}>
                          <img
                            style={{
                              width: "inherit",
                              height: "inherit",
                              objectFit: "cover",
                              borderRadius: "inherit",
                            }}
                            src={answer.image}
                            alt=''
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: "0",
                              width: "inherit",
                              height: "inherit",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              borderRadius: "inherit",
                            }}>
                            <Box sx={{ display: "flex" }}>
                              <Box
                                sx={{ cursor: "pointer" }}
                                onClick={() => onUploadClick("Images", answer.id)}>
                                <Box
                                  sx={{
                                    borderRadius: "50%",
                                    width: "25px",
                                    height: "25px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "auto",
                                  }}>
                                  <ReplayIcon sx={{ color: "#fff" }} />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          onClick={() => onUploadClick("Images", answer.id)}
                          sx={{
                            width: "48px",
                            height: "48px",
                            border: "solid 1px #ced3d9",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}>
                          <img src={Icon} alt='Icon' />
                        </Box>
                      )}
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={addImage ? 9 : 11.25}
                    sm={addImage ? 10.25 : 11.75} //sm={9.25}
                    sx={{ padding: "0px 5px 0px 5px" }}>
                    <TextField
                      variant='outlined'
                      size='small'
                      name={answer.id}
                      className='titlefield'
                      placeholder={t("anwer_palceholder")}
                      value={answer.option}
                      inputProps={{
                        maxLength: 50,
                        readOnly: false,
                      }}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={0.75} sm={0.25} sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip
                      title={
                        isDeleteDisable ? "Unable to delete minimum two answers is required!" : ""
                      }
                      placement='left'>
                      <Box
                        sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                        onClick={() => onDeleteOption(answer.id)}>
                        <img
                          src={DeleteIcon}
                          style={{
                            objectFit: "cover",
                            opacity: isDeleteDisable ? "0.4" : "1",
                          }}
                          alt='Delete Icon'
                        />
                      </Box>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Drag>
            );
          })}
        </Drop>
      </DragAndDrop>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
          margin: { sm: "10px 10px 10px 0px", xs: "10px 10px 10px -4px" },
          "&:hover": {
            color: "#4B9EF9",
          },
        }}
        onClick={onAddOption}>
        <AddIcon />
        <Typography
          variant='h7regular'
          sx={{
            color: "#2d2d39",
            pl: "8px",
            textTransform: "capitalize",
            "&:hover": {
              color: "#4B9EF9",
            },
          }}>
          {t("add_answer")}
        </Typography>
      </Box>
    </>
  );
};
