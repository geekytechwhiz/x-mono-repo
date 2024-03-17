/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unescaped-entities */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { PlatXLogo, Step5img } from "@platformx/utilities";
import { useCreatesiteStepStyle } from "./Createstep.style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Progressbar } from "../SiteListing/Progressbar";

export type DialogList = {
  isDialogOpen: boolean;
  closeButtonHandle: any;
  handlenextbutton: any;
  handlebackbutton: any;
  props: any;
};

export default function PlateformXCreatestep5Dialog({
  isDialogOpen,
  closeButtonHandle,
  handlenextbutton,
  handlebackbutton,
  props,
}: DialogList) {
  const classes = useCreatesiteStepStyle();
  const { onClick, ...inputProps } = props;
  const handleFilterClose = () => {
    // setAnchor(null);
  };

  const mockDatastep = [
    { id: 1, value: "vikalp saxena", name: "vikalpraisaxena@hcl.com", Cat: "Remove" },
    { id: 2, value: "vikalp saxena", name: "vikalpraisaxena@hcl.com", Cat: "Remove" },
    { id: 3, value: "vikalp saxena", name: "vikalpraisaxena@hcl.com", Cat: "Remove" },
    { id: 4, value: "vikalp saxena", name: "vikalpraisaxena@hcl.com", Cat: "Remove" },
  ];

  // Function to handle click on image box
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
          <Box className={classes.modalcontain}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={6} marginTop={"20px"}>
                <Box className={classes.platxlogo}>
                  <Box className={classes.xlogo}>
                    <img src={PlatXLogo} alt='logo' />
                  </Box>
                  <Box className={classes.progrebar}>
                    <Progressbar progress={100} />
                  </Box>
                  <Box className={classes.textmargin}>
                    <Typography variant='h7regular'>Step 5 out of 5</Typography>
                    <Typography variant='h2bold'>Add Admin</Typography>
                    <Typography className={classes.step2typo} variant='h5medium'>
                      You can the team administrator here. it is capable of runnig whole website.
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "15px" }}>
                    <TextField
                      placeholder='Enter Email ID'
                      {...inputProps}
                      variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Button
                              sx={{ backgroundColor: "#4B9EF9", color: "#FFF " }}
                              variant='contained'>
                              Add
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Grid item xs={6} sm={4} md={12} lg={12}>
                    {mockDatastep.map((transaction) => (
                      <Box
                        sx={{
                          marginTop: "17px",
                          display: "flex",
                          justifyContent: "space-around",
                          gap: "70px",
                        }}
                        key={transaction.id}>
                        <Typography>{transaction.value}</Typography>
                        <Typography>{transaction.name}</Typography>
                        <Typography sx={{ color: "#D32F2F" }}>{transaction.Cat}</Typography>
                      </Box>
                    ))}
                  </Grid>

                  <Box className={classes.btnbox}>
                    <Box className={classes.skipbtn}>
                      <Typography sx={{ color: "#4B9EF9" }}>Skip</Typography>
                      <ArrowForwardIosIcon sx={{ color: "#4B9EF9" }} />
                    </Box>
                    <Box className={classes.backbtn}>
                      <Button
                        className={classes.innercancel}
                        onClick={() => {
                          handlebackbutton({ step5: false });
                          handleFilterClose();
                        }}
                        variant='outlined'>
                        back
                      </Button>
                      <Button variant='primaryButton'>Done</Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.modalgrid}>
                <Box className={classes.createcontainnew}></Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
                  <img src={Step5img} alt='icon' />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
