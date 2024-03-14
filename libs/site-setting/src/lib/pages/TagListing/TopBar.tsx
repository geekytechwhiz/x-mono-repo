import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Topbar.css";

const TopBar = ({ returnBack, handlePublish, onSave, category, value, publishUrl }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const noWeb = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box className='createtaghead'>
      <Grid item xs={2} md={5} em={4} sm={12} sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant='text'
          disableRipple
          disableFocusRipple
          startIcon={<ArrowBack />}
          sx={{
            minWidth: "0px",
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={returnBack}>
          {!noWeb && (
            <Typography variant='h4bold'>
              {t("create")} {t("tag")}
            </Typography>
          )}
        </Button>
      </Grid>
      <Box>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          container
          alignItems='flex-end'
          direction='row'
          sx={{
            display: { xs: "none", em: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Button
            onClick={onSave}
            disabled={!(category && value)}
            variant='secondaryButton'
            sx={{ marginRight: "12px", marginLeft: "12px" }}
            className='sm'>
            {t("save_as_draft")}
          </Button>
          <Button
            disabled={!publishUrl}
            variant='primaryButton'
            className='sm'
            onClick={handlePublish}>
            {t("publish")}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default TopBar;
