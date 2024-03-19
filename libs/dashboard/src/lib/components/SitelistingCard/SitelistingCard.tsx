import { Box, Button, Grid, Typography } from "@mui/material";
import { memo } from "react";
import Header from "../../components/header/Header";
import { useStyles } from "./Sitelistingcard.style";
import { TaskCardProps } from "./SitelistingCard.types";
import { Checkicon } from "@platformx/utilities";

const SitelistingCard = ({ title, titleVariant, linkText, children }: TaskCardProps) => {
  const classes = useStyles();

  const mockDatadash = [
    { id: 1, value: "Create a doamin", Cat: "done" },
    { id: 2, value: "Edit your website", Cat: "done" },
    { id: 3, value: "Publish your site", Cat: "done" },
    { id: 4, value: "Create a article", Cat: "done" },
    { id: 5, value: "Site theme", Cat: "done" },
    { id: 6, value: "Add admin", Cat: "done" },
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
              <Button sx={{ backgroundColor: "#D7ECFD" }}>Not published</Button>
            </Box>
            <Box sx={{ marginTop: "8px" }}>
              <Typography className={classes.typocolor}>Domain</Typography>
            </Box>
            <Typography className={classes.righttypobox}>
              https://www.figma.com/file/yDruE8wQJSmCqS5cJO97jw
            </Typography>
            <Box className={classes.leftboxtype}>
              <Box>
                <Typography className={classes.typocolor}>Storage Type</Typography>
                <Typography sx={{ color: "#4B9EF9" }}>Shared</Typography>
              </Box>
              <Button variant='outlined'>Edit</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={8} lg={8}>
          <Box className={classes.innercontainb}>
            <Typography variant='h5bold'>Setup your website</Typography>

            <Box className={classes.scrollbox}>
              {mockDatadash.map((transaction) => (
                <Box className={classes.contentbox} key={transaction.id}>
                  <Box className={classes.boxhead}>
                    <img src={Checkicon} alt='' />
                    <Typography className={classes.typocolor}>{transaction.value}</Typography>
                  </Box>

                  <Typography className={classes.typocolor}>{transaction.Cat}</Typography>
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
