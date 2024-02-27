import GroupsIcon from "@mui/icons-material/Groups";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { EditIcon } from "@platformx/utilities";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./UserGroupCard.styles";

const UserGroupCard = ({ content }) => {
  const { name = "", description = "", tags = [], groupName = "", label = "", id = "" } = content;
  const navigate = useNavigate();
  const classes = useStyles();

  const HandleEditGroup = () => {
    navigate(`/update/user-groups?name=${name}`, {
      state: {
        id: id,
        groupName: groupName,
        label: label,
        name: name,
        description: description,
        tags: tags === null ? [] : tags,
      },
    });
  };

  return (
    <Box className={classes.container}>
      <Grid container className={classes.innerContainer}>
        <Grid item xs={1} className={classes.groupIconContainer}>
          <GroupsIcon fontSize='large' />
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant='h5bold'
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  wordBreak: "break-all",
                }}>
                {label}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='h7regular'
                sx={{
                  color: "#89909a",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  wordBreak: "break-all",
                  order: { xs: 2, em: 1 },
                }}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          Hcl tech
        </Grid>
        <Grid item xs={1}>
          <IconButton className='hoverIcon' onClick={HandleEditGroup}>
            <img src={EditIcon} alt='Edit Icon' className={classes.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserGroupCard;
