import GroupsIcon from "@mui/icons-material/Groups";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { EditIcon } from "@platformx/utilities";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./UserGroupCard.styles";

const UserGroupCard = ({ content }) => {
  const {
    name = "",
    description = "",
    tags = [],
    groupName = "",
    label = "",
    id = "",
    parentId = "",
  } = content;
  const navigate = useNavigate();
  const classes = useStyles();

  const HandleEditGroup = () => {
    const data = {
      id,
      groupName,
      label,
      name,
      description,
      tags: tags === null ? [] : tags,
      parentId,
    };
    localStorage.setItem("groupDetails", JSON.stringify(data));
    navigate(`/update/user-groups?name=${name}`);
  };

  return (
    <Box className={classes.container}>
      <Grid container className={classes.innerContainer}>
        <Grid item xs={1} className={classes.groupIconContainer}>
          <GroupsIcon fontSize='large' />
        </Grid>
        <Grid item xs={6}>
          <Grid container className={classes.labelContainer}>
            <Grid item xs={12}>
              <Typography variant='h5bold' className={classes.label}>
                {label}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h7regular' className={classes.description}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} className={classes.tagsContainer}>
          {tags?.length &&
            tags.slice(0, 2).map((tag) => (
              <Typography key={tag} variant='h7regular' className={classes.tags}>
                {tag}
              </Typography>
            ))}
          {tags?.length > 2 && <Box className={classes.dots}>...</Box>}
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={HandleEditGroup}>
            <img src={EditIcon} alt='Edit Icon' className={classes.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserGroupCard;
