import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, Typography } from "@mui/material";
import { handleDialog } from "@platformx/authoring-state";
import { iconsList } from "@platformx/content";
import { ShowToastError, WarningIcon, dateTimeFormat } from "@platformx/utilities";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { TaskPage } from "../taskPages/TaskPages.type";
import { useStyles } from "./TaskRow.styles";

const Tasks = ({
  created_by,
  creation_date,
  description,
  document_path,
  document_title,
  document_type,
  last_modified_by,
  task_status,
  title,
  changeStatus,
  edit,
  objData,
}: TaskPage) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleconfirmReject = () => {
    changeStatus({
      last_modified_by,
      title,
      status: "Rejected",
    });
  };

  const handleconfirmAccept = () => {
    changeStatus({
      last_modified_by,
      title,
      status: "Accepted",
    });
  };

  const handleReject = () => {
    const dialogContent = {
      imageIcon: WarningIcon,
      isOpen: true,
      title: t("Reject_Task"),
      subTitle: t("reject_subtitle"),
      rightButtonText: t("Yes"),
      leftButtonText: t("No"),
      handleCallback: handleconfirmReject,
    };
    dispatch(handleDialog(dialogContent));
  };

  const handleEdit = () => {
    task_status.toLowerCase() === "accepted"
      ? edit(
          {
            ContentType: document_type,
            page: document_path.split("/").pop(),
          },
          objData,
        )
      : ShowToastError("Accept the task before redirect");
  };

  return (
    <Box className={classes.Tasklistbox}>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", em: "center" },
        }}>
        <Grid xs={12} md={12} lg={6}>
          <Box
            sx={{
              display: { xs: "flex", em: "none" },
              padding: " 19px 0px",
              minWidth: { xs: "auto", em: "170px" },
              minHeight: { xs: "20px", em: "40px" },
            }}>
            <Box className={classes.BoxReview}>
              <Typography variant='h7medium' sx={{ padding: "3px 4px", whiteSpace: "nowrap" }}>
                Ready for review
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "0px 10px 0 0",

              justifyContent: "space-between",
              paddingBottom: { md: "20px", em: "0px" },
            }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                className={classes.BoxImage}
                sx={{
                  marginRight: { xs: "10px", md: "20px" },
                  display: { xs: "flex" },
                }}>
                <img
                  src={iconsList[document_type?.toLowerCase()]}
                  style={{ width: "100%", objectFit: "cover" }}
                  alt=''
                />
              </Box>
              <Box
                sx={{
                  maxWidth: { md: "575px", em: "376px", lg: "630px" },
                  display: "flex",
                  justifyItems: "center",
                  flexDirection: "column",
                }}>
                <Typography
                  className={classes.Title}
                  variant='h5semibold'
                  sx={{
                    marginBottom: "2px",
                  }}
                  onClick={handleEdit}>
                  {document_title}
                </Typography>
                <Box
                  sx={{
                    display: { xs: "none", lg: "inline-block" },
                    flexWrap: { xs: "wrap", em: "inherit" },
                    alignItems: { xs: "flex-start", em: "center" },
                    flexDirection: { xs: "row", em: "row" },
                  }}>
                  <Typography
                    className={classes.Description}
                    variant='h6regular'
                    sx={{
                      order: { xs: 2, em: 1 },
                    }}>
                    {description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: {
                      em: "flex",
                      lg: "none",
                    },
                    padding: {
                      xs: "0 10px 0 0",
                      md: "0 15px 0 0",
                    },
                    minWidth: { xs: "auto", em: "170px" },
                    minHeight: { xs: "20px", em: "40px" },
                    alignItems: "center",
                  }}>
                  <Typography variant='h7regular'>{created_by}</Typography>
                  <Box className={classes.Blackdot}></Box>
                  <Typography variant='h7regular' sx={{ paddingLeft: "10px" }}>
                    {dateTimeFormat(creation_date)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex", em: "none" },
                justifyContent: "flex-end",
                color: "#89909A",
              }}>
              {task_status === "Accepted" ? (
                <Box
                  sx={{
                    justifyContent: "center",
                    display: { xs: "none", md: "flex", em: "none" },
                    width: " 135px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}>
                  <Button variant='contained' onClick={handleEdit} className={classes.reviewButton}>
                    Review
                  </Button>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex", em: "none" },
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}>
                    <Button
                      variant='contained'
                      onClick={() => handleconfirmAccept()}
                      sx={{
                        maxHeight: "40px",
                        minWidth: "79px !important",
                        borderRadius: "5px",
                      }}>
                      Accept
                    </Button>
                  </Box>
                  <Box
                    onClick={() => handleReject()}
                    className={classes.CrossIcon}
                    sx={{
                      display: { xs: "none", md: "flex", em: "none" },
                    }}>
                    <CloseIcon fontSize='small' />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={12} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-end", em: "flex-end" },
            }}>
            <Box
              className='d-flex align-items-center justify-content-end'
              sx={{
                display: { xs: "none", em: "flex" },
                padding: {
                  xs: "0 10px",
                  em: "0 15px",
                },
                minWidth: { xs: "auto", em: "145px" },
                borderLeft: {
                  xs: "1px solid #CED3D9",
                  em: "1px solid #CED3D9",
                },
                borderRight: {
                  xs: "1px solid #CED3D9",
                  em: "0",
                },
                minHeight: { xs: "20px", em: "40px" },
              }}>
              <Box className={classes.BoxReview}>
                <Typography variant='h7regular' sx={{ padding: "3px 12px", whiteSpace: "nowrap" }}>
                  Ready for review
                </Typography>
              </Box>
            </Box>
            <Box
              className='webdatetime'
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                flexDirection: "column",
                padding: {
                  xs: "0 10px 0 0",
                  md: "0 15px 0 0",
                  em: "0 15px",
                },
                minWidth: { xs: "auto", em: "190px" },
                maxWidth: { xs: "auto", em: "190px" },
                marginRight: { xs: "15px" },
                minHeight: { xs: "20px", em: "40px" },
                borderLeft: { xs: "0", em: "1px solid #CED3D9" },
                borderRight: "1px solid #CED3D9;",
              }}>
              <Box>
                <Typography variant='p4medium' component='div'>
                  {created_by}
                </Typography>
              </Box>
              <Box>
                <Typography variant='h7regular' component='div'>
                  {dateTimeFormat(creation_date)}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                color: "#89909A",
              }}>
              {task_status === "Accepted" ? (
                <Box
                  sx={{
                    justifyContent: "center",
                    display: { xs: "none", em: "flex" },
                    cursor: "pointer",
                  }}>
                  <Button variant='contained' onClick={handleEdit} className={classes.reviewButton}>
                    Review
                  </Button>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: { xs: "none", em: "flex" },
                      alignItems: "center",
                    }}>
                    <Button
                      variant='contained'
                      onClick={() => handleconfirmAccept()}
                      sx={{
                        maxHeight: "40px",
                        minWidth: "79px !important",
                        borderRadius: "5px",
                      }}>
                      Accept
                    </Button>
                  </Box>
                  <Box
                    onClick={() => handleReject()}
                    className={classes.CrossIcon}
                    sx={{
                      display: {
                        xs: "none",
                        em: "flex",
                      },
                    }}>
                    <CloseIcon fontSize='small' />
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box
            className={classes.Button}
            sx={{
              display: { xs: "flex", md: "none" },
              paddingRight: { md: "250px" },
            }}>
            {task_status === "Accepted" ? (
              <Button variant='contained' onClick={handleEdit} className={classes.reviewButton}>
                Review
              </Button>
            ) : (
              <>
                <Button
                  variant='contained'
                  onClick={() => handleconfirmAccept()}
                  sx={{
                    maxHeight: "40px",
                    minWidth: "79px !important",
                    borderRadius: "5px",
                  }}>
                  Accept
                </Button>
                <Button
                  variant='outlined'
                  sx={{
                    maxHeight: "40px",
                    minWidth: "79px !important",
                    borderRadius: "5px",
                  }}>
                  Reject
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tasks;
