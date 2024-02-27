import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import { useStyles } from "./GroupHeader.styles";

type groupHeaderProps = {
  returnBack: () => void;
  buttonText: string;
  onSave: () => void;
  arrowText: string;
};
const GroupHeader = ({ buttonText, returnBack, onSave, arrowText }: groupHeaderProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.logoContainer}>
        <Box className={classes.logo}>
          <ArrowBackIcon onClick={returnBack} />
        </Box>
        <Typography variant='h3medium'>{arrowText}</Typography>
      </Box>
      <Box>
        <Button onClick={onSave} variant='primaryButton' className='sm'>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default GroupHeader;
