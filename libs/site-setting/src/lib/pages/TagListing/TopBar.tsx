import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Topbar.css";
import { useNavigate, useParams } from "react-router-dom";

type TopBarProp = {
  createText: string;
  returnBack: () => void;
  handlePublish?: () => void;
  onSave?: () => void;
  category?: string;
  value?: string;
  publishUrl?: string;
  isCategoryDetail: boolean;
  selectedItems?: any;
  deleteHandle?: () => void;
};

const TopBar = ({
  createText,
  returnBack,
  handlePublish,
  onSave,
  category,
  value,
  publishUrl,
  isCategoryDetail,
  selectedItems,
  deleteHandle,
}: TopBarProp) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { docPath } = useParams();
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
          {!noWeb && <Typography variant='h4bold'>{createText}</Typography>}
        </Button>
      </Grid>
      <Box>
        {isCategoryDetail ? (
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
            {selectedItems.doc_path ? (
              <Button variant='primaryButton' className='sm' onClick={deleteHandle}>
                {t("done")}
              </Button>
            ) : (
              <Button
                variant='primaryButton'
                className='sm'
                onClick={() => navigate("/site-setting/create-tags")}>
                {t("create")} {t("tag")}
              </Button>
            )}
          </Grid>
        ) : (
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
              disabled={docPath ? false : !publishUrl}
              variant='primaryButton'
              className='sm'
              onClick={handlePublish}>
              {t("publish")}
            </Button>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default TopBar;
