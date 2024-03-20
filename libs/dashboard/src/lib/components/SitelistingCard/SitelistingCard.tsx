import { Box, Button, Grid, Typography } from "@mui/material";
import { memo } from "react";
import Header from "../../components/header/Header";
import { useStyles } from "./Sitelistingcard.style";
import { TaskCardProps } from "./SitelistingCard.types";
import { Checkicon, Doticon, Crossnewicons } from "@platformx/utilities";
import { Progressbar } from "../../../../../sites/src/lib/pages/SiteListing/Progressbar";

const SitelistingCard = ({ title, titleVariant, linkText, children }: TaskCardProps) => {
  const classes = useStyles();

  const mockDatadash = [
    { id: 1, value: "Create a domain", Cat: "Done" },
    { id: 2, value: "Edit your website", Cat: "Done" },
    { id: 3, value: "Publish your site", Cat: "Publish now" },
    { id: 4, value: "Create a article", Cat: "Create now" },
    { id: 5, value: "Site theme", Cat: "Done" },
    { id: 6, value: "Add admin", Cat: "Done" },
  ];
  return (
    <Box className={classes.head}>
      <Header title={title} titleVariant={titleVariant} linkText={linkText} />
      <Box className={classes.body}>{children}</Box>
      <Grid container>
        <Grid item xs={6} sm={6} md={4} lg={4} borderRight={"1px solid #D9DBE9"}>
          <Box className={classes.mainbox}>
            <Box className={classes.boxtypo}>
              <Typography variant='h5bold'>Website info</Typography>
              <Button sx={{ backgroundColor: "#D7ECFD", textTransform: "none" }}>
                {<img style={{ padding: "5px" }} src={Doticon} alt='' />}Not published
              </Button>
            </Box>
            <Box>
              <Typography className={classes.typocolor}>Domain</Typography>
            </Box>
            <Typography className={classes.righttypobox}>
              https://www.figma.com/file/yDruE8wQJSmCqS5cJO97jw
            </Typography>
            <Box className={classes.leftboxtype}>
              <Box>
                <Typography className={classes.typocolor}>Storage Type</Typography>
                <Typography className={classes.typocolor2}>Shared</Typography>
              </Box>
              <Button variant='outlined'>Edit</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={8} lg={8}>
          <Box className={classes.innercontainb}>
            <Box className={classes.innercontainerbox1}>
              <Typography variant='h5bold'>Setup your website</Typography>
              <Box className={classes.innercontainerbox2}>
                <Box>
                  <Typography variant='h5bold'>2/5</Typography>
                </Box>
                <Box className={classes.innertypo}>
                  <Progressbar progress={20} />
                </Box>
              </Box>
            </Box>

            <Box className={classes.scrollbox}>
              {mockDatadash.map((transaction) => (
                <Box className={classes.contentbox} key={transaction.id}>
                  <Box className={classes.boxhead}>
                    {transaction.Cat === "Done" ? (
                      <img src={Checkicon} alt='' />
                    ) : (
                      <img style={{ width: "21px", height: "18px" }} src={Crossnewicons} alt='' />
                    )}

                    <Typography className={classes.typocolor}>{transaction.value}</Typography>
                  </Box>
                  {transaction.Cat === "Done" ? (
                    <Typography sx={{ marginRight: "6px" }} className={classes.typocolor}>
                      {transaction.Cat}
                    </Typography>
                  ) : (
                    <Button variant='outlined'>{transaction.Cat}</Button>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(SitelistingCard);
