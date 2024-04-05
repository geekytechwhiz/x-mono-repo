import { useLazyQuery } from "@apollo/client";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { MiniHeader } from "@platformx/utilities";
import {
  fetchPrelemContent,
  fetchPrelemValidation,
  addPrelemFunc,
} from "@platformx/authoring-apis";
import { RootState } from "@platformx/authoring-state";
import { SearchCardObjecType } from "../utils/prelemTypes";
import PreviewTabsButton from "../PreviewTabsButton/PreviewTabsButton";
import { useStyles } from "./Header.styles";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ handleChange, value }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { page } = useSelector((state: RootState) => state);
  const location = useLocation();
  const [runFetchContentQuery] = useLazyQuery(fetchPrelemContent);
  const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);
  const prelemMetaInfo = location.state as SearchCardObjecType;

  const theme = useTheme();
  const noWeb = useMediaQuery(theme.breakpoints.down("sm"));
  const ifTab = useMediaQuery(theme.breakpoints.up("sm"));
  const getBreakPoint = () => {
    return ifTab;
  };
  const onClickAddPrelem = () => {
    addPrelemFunc(
      dispatch,
      prelemMetaInfo,
      runFetchContentQuery,
      runFetchValidationQuery,
      navigate,
      page?.insertPrelemAt,
    );
  };
  const onClickBack = () => {
    // eslint-disable-next-line no-restricted-globals
    history.go(-1);
  };
  return (
    <Box className={classes.prelemPreviewHeader}>
      <Box className={classes.backbtn}>
        <Button startIcon={<KeyboardBackspaceIcon />} onClick={onClickBack}>
          {" "}
          {ifTab && t("back")}
        </Button>
      </Box>
      <PreviewTabsButton
        handleChange={handleChange}
        value={value}
        previewStatus={true}
        iconDisabled={false}
      />
      {getBreakPoint() && (
        <Box className={classes.rightBox}>
          <Button variant='contained' sx={{ whiteSpace: "nowrap" }} onClick={onClickAddPrelem}>
            {t("add_prelem")}
          </Button>
          <Box className='headerAvatarIcon'>
            <MiniHeader showUserDetails={false} />
          </Box>
        </Box>
      )}
      {noWeb && (
        <Box className={classes.mobButtonsAdd}>
          <Button variant='contained' sx={{ whiteSpace: "nowrap" }} onClick={onClickAddPrelem}>
            {t("add_prelem")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
