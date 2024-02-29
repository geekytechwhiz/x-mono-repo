import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import TimerIcon from '../../assets/svg/timerIcon.svg';
import Image from "next/image";

const Timer = ({ lastmodifiedDate }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} mr={2}>
      <Image src={TimerIcon} alt='' />
      <Typography variant='p4regular' ml={1}>
        Last edited: {lastmodifiedDate ? format(new Date(lastmodifiedDate), 'hh:mm a') : null}
      </Typography>
    </Box>
  );
};
export default Timer;
