import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import useImagesStyle from "../pages/Images.style";

const FolderSkelaton = ({ size }) => {
  const classes = useImagesStyle();

  return (
    <>
      {size.map((val) => (
        <Grid
          key={val}
          container
          item
          xs={12}
          sm={6}
          md={6}
          em={4}
          lg={3}
          className={classes.floatleft}>
          <Box className={classes.skelaton1}>
            <Box className={classes.folderskelaton}>
              <Skeleton variant='rectangular' width='100%' height='100%' />
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default FolderSkelaton;
