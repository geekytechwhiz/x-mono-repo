import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useImagesStyle } from "./Images.style";
import { Assetmodalicon, FileUploadicon } from "@platformx/utilities";
import AssetBreadsum from "./AssetBreadscum";
import Progressbar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
};

export default function PlateformXAssetDialog({ isDialogOpen, closeButtonHandle }: DialogList) {
  const classes = useImagesStyle();
  const navigate = useNavigate();

  const routeChange = (event) => {
    event.preventDefault();
    navigate("/create_asset");
  };

  const mockAssetmodalData = [
    {
      id: "AFG",
      value: "Encaurzing Gen Z",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "AGO",
      value: "image 2",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "ALB",
      value: "image 3",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "BHS",
      value: "image 4",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "BIH",
      value: "image 4",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
    {
      id: "BLZ",
      value: "image 5",
      text: "7.8mb . image",
      img: Assetmodalicon,
    },
  ];

  return (
    <Box className='socialsharemodal'>
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        className={classes.dialograpper}>
        <Box
          sx={{
            display: { xs: "flex", md: "flex" },
          }}>
          <Box className={classes.modalbox} onClick={closeButtonHandle}>
            <CloseIcon className={classes.closeicon} />
          </Box>
          <Box className={classes.modalboxone}>
            <Box>
              <Typography variant='h5bold'>Upload Assests</Typography>
            </Box>
            <Box>
              <Typography variant='h7regular' className={classes.textupload}>
                Upload the File JPG,PNG,GIF,MOV,MP4,Doc
              </Typography>
            </Box>
            <Box className={classes.modalboxnew}></Box>
            <Grid container className={classes.modalcontainer}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Box className={classes.assetmodalback}>
                  <Box>
                    <img className={classes.fileuploadicon} src={FileUploadicon} alt='' />
                    <Typography className={classes.modaltypo} variant='h5bold'>
                      Choose Your File
                    </Typography>
                    <Button sx={{ textTransform: "none" }} className={classes.btnmodal}>
                      Browse to Upload
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.assetmodalbox}>
                  <Box className={classes.modalbread}>
                    <AssetBreadsum />
                  </Box>
                  <Divider></Divider>
                  <Box className={classes.boxover}>
                    {mockAssetmodalData.map((transaction) => (
                      <Box key={""} className={classes.modalassetbox}>
                        <Box key={transaction.id} className={classes.boxcloseinnercontain}>
                          <img src={transaction.img} alt='' />
                          <Box className={classes.modalboxtypo}>
                            <Typography variant='h6semibold'>{transaction.value}</Typography>
                            <Typography sx={{ color: "#6E7191" }}>{transaction.text}</Typography>
                          </Box>
                          <Box className={classes.closeiconreop}>
                            <CloseIcon />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Divider></Divider>
                  <Box className={classes.modalnecontain}>
                    <Box className={classes.beofrecircul}>
                      <Progressbar />
                      <Typography variant='h6semibold' className={classes.modaltyponew}>
                        Uploading 1/50
                      </Typography>
                    </Box>
                    <Box className={classes.beofrecircul}>
                      <Button
                        className={`${classes.modalbtn} sm`}
                        variant='primaryButton'
                        onClick={routeChange}>
                        Next
                      </Button>
                    </Box>
                  </Box>
                  {/* <Box className={classes.assetboxone}>
                    <img src={AssetChooseUploadIcon} alt='' />s
                  </Box>
                  <Typography className={classes.modaltypo} variant='h5bold'>
                    There are no files here
                  </Typography>
                  <Typography className={classes.modaltypo} variant='h6medium'>
                    Please Upload the files
                  </Typography> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
