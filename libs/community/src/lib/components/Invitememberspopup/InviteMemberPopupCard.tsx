import { Box, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { format } from "date-fns";
import { useStyles } from "./InviteMemberPopupCard.styles";
import { XCheckbox } from "@platformx/utilities";

const InviteMemberPopupCard = ({
  image,
  setSelectedMembers,
  item,
  setGlobalCheckBoxStatus,
  memberList,
  setFilteredArray,
}) => {
  const {
    full_name: fullName = "",
    checked = false,
    email = "",
    created_date: DateTime,
    user_name = "",
  } = item;
  const createdDateTime = format(new Date(+DateTime), "LLL dd, yyyy | H:mm");
  const handleCheckedStatusChange = () => {
    const updatedItems = memberList.map((currentValue) =>
      currentValue?.user_name === user_name
        ? { ...currentValue, checked: !currentValue.checked }
        : currentValue,
    );
    setFilteredArray((prevValue) => {
      const updatedFilteredItems = prevValue.map((currentValue) =>
        currentValue?.user_name === user_name
          ? { ...currentValue, checked: !currentValue.checked }
          : currentValue,
      );
      return updatedFilteredItems;
    });
    setSelectedMembers(updatedItems);
    setGlobalCheckBoxStatus(updatedItems.every((currentValue) => currentValue.checked));
  };
  const classes = useStyles();
  return (
    <Box className={`${classes.container} main-container`}>
      <Grid container className='d-flex align-items-center'>
        <Grid item xs={11} em={8}>
          <Box className='d-flex align-items-center'>
            <Box>
              <XCheckbox
                checked={checked}
                onChange={handleCheckedStatusChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
            <Box className='member-image'>
              {image ? (
                <img src={image} style={{ width: "100%", objectFit: "cover" }} alt='user' />
              ) : (
                <Avatar src='/broken-image.jpg' variant='rounded' />
              )}
            </Box>
            <Box>
              <Box className='d-flex align-items-center'>
                <Typography variant='h5semibold'>{fullName}</Typography>
              </Box>

              <Box
                className='d-flex'
                sx={{
                  flexWrap: { xs: "wrap", em: "inherit" },
                  alignItems: "center",
                }}>
                <Box display='flex'>
                  <Typography variant='h7regular' sx={{ order: { xs: 2, em: 1 } }}>
                    {email}
                  </Typography>
                </Box>

                <Typography variant='h7regular' className='date-time-mobile'>
                  {createdDateTime}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1} em={4}>
          <Box className='d-flex align-items-center justify-content-end'>
            <Box className='date-time-web'>
              <Typography variant='h7regular' component='div'>
                {createdDateTime}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InviteMemberPopupCard;
