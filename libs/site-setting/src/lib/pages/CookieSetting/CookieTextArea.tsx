import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookieSkeletonStyle } from './CookieSkeleton.style';
import { AutoTextArea,  convertToLowerCase  } from '@platformx/utilities';

interface CookieTextAreaProps {
  name?: any;
  placeHolder?: any;
  handleChange?: any;
  maxCharLength?: any;
  state?: any;
  handleOnBlur?: any;
  isDisabled?: any;
  minRows?: number;
  maxRows?: number;
}
const CookieTextArea = ({
  name,
  placeHolder,
  handleChange,
  maxCharLength,
  state,
  handleOnBlur,
  isDisabled,
  minRows = 6,
}: CookieTextAreaProps) => {
  const { t } = useTranslation();
  const classes = useCookieSkeletonStyle();

  const [restOfChar, setRestOfChar] = useState({
    lengthOfState: 0,
    restOfLength: 0,
    reachLimit: false,
  });
  const { restOfLength = 0, reachLimit = false } = restOfChar;

  const handleLength = (valueData = '') => {
    if (maxCharLength) {
      const lengthOfChar = convertToLowerCase(valueData).length;
      const rest = valueData ? maxCharLength - lengthOfChar : 0;

      setRestOfChar({
        ...restOfChar,
        restOfLength: rest,
        lengthOfState: lengthOfChar,
        reachLimit: maxCharLength === lengthOfChar ? true : false,
      });
    }
  };

  const onChange = (event: any = {}) => {
    if (handleChange) {
      handleChange(event);
    }
    const { target: { value = '' } = {} } = event;
    handleLength(value);
  };

  useEffect(() => {
    if (
      state //&& isEdit
    ) {
      const x: any = document.querySelector(`#${name}`);
      // if (!x?.value) {
      x.value = state;
      handleLength(state);
      // }
    } else {
      const x: any = document.querySelector(`#${name}`);
      x.value = state;
      handleLength(state);
    }
  }, [state]);

  return (
    <Box>
      <AutoTextArea
        aria-label='minimum height'
        minRows={minRows}
        handleOnBlur={handleOnBlur}
        handleChange={handleChange}
        maxCharLength={150}
        name={name}
      />
      {maxCharLength ? (
        <Typography
          variant='h7regular'
          className={classes.cookieTextAreaTypo}
        >
          {reachLimit ? (
            <>0 {`${t('characters')} ${t('left')}`}</>
          ) : (
            <>
              {restOfLength
                ? `${restOfLength} ${t('characters')} ${t('left')} `
                : `${maxCharLength} ${t('characters')} ${t('max')}`}
            </>
          )}
        </Typography>
      ) : null}
    </Box>
  );
};
export default CookieTextArea;
