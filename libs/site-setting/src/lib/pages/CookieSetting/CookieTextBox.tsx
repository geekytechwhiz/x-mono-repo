import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCookieSkeletonStyle } from "./CookieSkeleton.style";

type TextBoxProps = {
  name?: any;
  type?: string;
  placeHolder?: any;
  handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
  error?: any;
  helperText?: any;
  borderColor?: any;
  isEmailExist?: any;
  isDisabled?: boolean;
  textBoxStyle?: any;
  label?: string;
  placeHolderStyle?: any;
};

const CookieTextBox = ({
  name,
  type,
  placeHolder,
  handleChange,
  maxCharLength,
  state,
  handleOnBlur,
  error,
  label,
  helperText,
  borderColor,
  isEmailExist,
  isDisabled,
  textBoxStyle,
  placeHolderStyle,
}: TextBoxProps) => {
  const { t } = useTranslation();
  const textPlaceHolder = placeHolder ? placeHolder : t("write_your_text_here");
  const textBoxType =
    name === "cookie_informative_expiry_time" || name === "cookie_consent_expiry_time"
      ? "number"
      : "text";
  const [restOfChar] = useState({
    lengthOfState: 0,
    restOfLength: 0,
    reachLimit: false,
  });
  const { restOfLength = 0, reachLimit = false } = restOfChar;

  const onChange = (event: any = {}) => {
    if (handleChange) {
      handleChange(event);
    }
  };

  const classes = useCookieSkeletonStyle();
  return (
    <>
      <style>{`.Platform-x-FormControl-root.Platform-x-FormControl-fullWidth.Platform-x-TextField-root{
      shadow-box:none
    }`}</style>
      <TextField
        className={classes.cookieTextfield}
        name={name}
        type={textBoxType}
        label={textPlaceHolder}
        variant='filled'
        disabled={isDisabled}
        error={error}
        size='small'
        fullWidth
        value={state}
        onChange={(event) => onChange(event)}
        inputProps={{ maxLength: maxCharLength }}
        onBlur={(e) => handleOnBlur && handleOnBlur(e)}
      />

      {error && helperText && (
        <Typography variant='h7regular' className={classes.cookieTypo}>
          {helperText}
        </Typography>
      )}

      {!error && name !== "site_address" && maxCharLength && (
        <Typography variant='h7regular' className={classes.cookietextboxtypo}>
          {reachLimit ? (
            <>0 {`${t("characters")} ${t("left")}`}</>
          ) : (
            <>
              {restOfLength
                ? `${restOfLength} ${t("characters")} ${t("left")} `
                : `${maxCharLength} ${t("characters")} ${t("max")}`}
            </>
          )}
        </Typography>
      )}
    </>
  );
};
export default CookieTextBox;
