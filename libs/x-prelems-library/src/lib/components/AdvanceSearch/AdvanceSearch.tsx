import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, Input, InputAdornment, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { postRestApiCall } from "@platformx/utilities";
import * as React from "react";
import prelemTypes from "../../globalStyle";
import "./AdvanceSearch.css";
import { useCustomStyle } from "./AdvanceSearch.style";
import { ResultCard } from "./ResultCard";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} style={{ marginTop: "-260px" }} />;
});

export const AdvanceSearchPopup = ({ onClosePopup, secondaryArgs, gcpUrl, bucketName }: any) => {
  const [apiData, setApiData] = React.useState<any>(null);
  const [searchText, setSearchText] = React.useState("");
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const handleClose = () => {
    onClosePopup(false);
  };
  const handleEnter = async () => {
    try {
      const data = JSON.stringify({
        query: `query{getContents(pagination:{start:0, rows:10}searchTerm: ${JSON.stringify(
          searchText,
        )},tags:[]filter:ALL)}`,
        variables: {},
      });
      const response = await postRestApiCall(
        secondaryArgs.deliveryUrl,
        data,
        secondaryArgs.locale,
        secondaryArgs.site_host,
      );
      setApiData(response?.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching data:", error);
      setApiData(null);
    }
  };

  const onTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleEnter();
    }
  };
  return (
    <Box>
      <Dialog
        className={`${classes.advanceSearchWrapper} ${globalClasses.prelemType1} prelem prelemType1 advanceSearch`}
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth='xl'
        aria-describedby='searchsuggestion-popup'
        PaperProps={{
          className: "customAdvanceSearch",
          elevation: 0,
        }}
        sx={{
          top: 0,
          transform: "none",
        }}>
        <Box className='maxContainer'>
          <CloseIcon
            width='25'
            height='25'
            onClick={handleClose}
            sx={{ position: "absolute", right: "16px", top: "16px", cursor: "pointer" }}
          />
          <DialogContent>
            <Typography variant='h4regular' color='textColor1'>
              What are you looking for?
            </Typography>
            <Input
              id='input-with-icon-adornment'
              fullWidth
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon sx={{ fontSize: "32px" }} />
                </InputAdornment>
              }
              sx={{ fontSize: "32px" }}
              onKeyDown={handleKeyDown}
              onChange={onTextChange}
              placeholder='Articles, News, Videos, Matches, Profile etc'
            />
            <Box className='searchResultSection'>
              <Typography variant='h4regular' color='textColor1' className='heading'>
                {apiData?.data?.getContents?.records?.length > 0 ? "Suggested results" : ""}
              </Typography>

              <Grid container spacing={0}>
                <Grid container>
                  {apiData?.data?.getContents?.records.map((card: any) => (
                    <Grid item key={card?.Id} xs={12} sm={6}>
                      <ResultCard
                        item={card}
                        secondaryArgs={secondaryArgs}
                        gcpUrl={gcpUrl}
                        bucketName={bucketName}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};
