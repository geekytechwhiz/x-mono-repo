import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useImagesStyle } from "./Images.style";
import { ModalHeader } from "./ModalHeader";
import { MorevertassetIcon, Folder, NewfolderIcon } from "@platformx/utilities";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
};

export default function PlateformXFolderDialog({ isDialogOpen, closeButtonHandle }: DialogList) {
  const classes = useImagesStyle();

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [filterMenu, setFilterMenu] = useState<null | HTMLElement>(null);

  const handleClick = (event) => {
    event.stopPropagation();
    // setAnchorEl(event.currentTarget);
    // setFilterMenu(event.currentTarget);
  };

  const mockAssetimagesData = [
    {
      id: "AFG",
      value: "Fifa in sea",
      text: "feb, 9 2023 | 17:08",
    },
    {
      id: "AGO",
      value: "Ronaldo",
      text: "23 files .Feb 9, 2023| 17:08",
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
              <Typography variant='h5bold'>Choose Folder</Typography>
            </Box>
            <Box>
              <Typography variant='h7regular' className={classes.textupload}>
                Upload the File JPG,PNG,GIF,MOV,MP4,Doc
              </Typography>
            </Box>
            <Box className={classes.modalboxnew}></Box>
            <ModalHeader navigateTo={"/images-upload"} isBreadcrumb={true} />
            <Grid container className={classes.imagecontainers}>
              <Grid item xs={12} sm={6} md={6} em={4} lg={3}>
                <Box className={classes.folderadd}>
                  <Box className={classes.folderlisting}>
                    <img className={classes.foldericon} src={NewfolderIcon} alt='foldericon' />
                    <Box className={classes.typeoexisttest}>
                      <Typography variant='h5bold' className={classes.modaltypoin}>
                        Create new folder
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              {mockAssetimagesData.map((transaction) => (
                <Grid item xs={12} sm={6} md={6} em={4} lg={3} key={`${transaction.id}`}>
                  <Box className={classes.folderadd}>
                    <Box className={classes.folderlisting}>
                      <Box>
                        <img className={classes.foldericon} src={Folder} alt='foldericon' />
                      </Box>
                      <Box className={classes.typeoexisttest}>
                        <Typography className={classes.modaltypoin} variant='h6semibold'>
                          {transaction.value}
                        </Typography>
                        <Typography className={classes.modaltypoin} variant='h7medium'>
                          {transaction.text}
                        </Typography>
                      </Box>
                    </Box>
                    <Box onClick={handleClick} className={classes.boxassetstep}>
                      <IconButton
                        aria-label='settings'
                        id='long-button'
                        aria-haspopup='true'
                        onClick={handleClick}>
                        <img src={MorevertassetIcon} alt='' />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
