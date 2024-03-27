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
        <Box>
          <Box className={classes.modalbox} onClick={closeButtonHandle}>
            <CloseIcon className={classes.closeicon} />
          </Box>
          <Box className={classes.modalcontain}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={6} className={classes.step2margin}>
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
                  <Box className={classes.step5boxh}>
                    {/* using InputAdornment to add email name */}
                    <TextField
                      placeholder='Enter Email ID'
                      {...inputProps}
                      variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Button className={classes.step5addbtn} variant='contained'>
                              Add
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {/* using mock data to show the name id and remove functionality */}
                    {mockDatastep.map((transaction) => (
                      <>
                        <Grid container className={classes.step5contain} key={transaction.id}>
                          <Grid item xs={8} sm={8} md={10} lg={10}>
                            <Grid container>
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography variant='h6bold'>{transaction.value}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography>{transaction.name}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={4} sm={4} md={2} lg={2} className={classes.step5margin}>
                            <Typography className={classes.step5typoxcat}>
                              {transaction.Cat}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Box className={classes.accordianborder}></Box>
                      </>
                    ))}
                  </Grid>

                  <Box className={classes.btnbox}>
                    <Box className={classes.skipbtn}>
                      <Typography className={classes.skipbtncolor}>Skip</Typography>
                      <ArrowForwardIosIcon className={classes.skipbtncolor} />
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
                <Box className={classes.step5imgtag}>
                  <img className={classes.imgtag} src={Step5img} alt='icon' />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
