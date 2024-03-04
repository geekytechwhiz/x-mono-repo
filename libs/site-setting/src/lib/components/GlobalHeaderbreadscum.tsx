import { makeStyles } from "@material-ui/core";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { capitalizeFirstLetter } from "@platformx/utilities";

const useBreadCumStyle = makeStyles(() => ({
  breadcumColor: {
    "&:hover": {
      color: "#4B9EF9",
    },
  },
}));

const GlobalHeaderbreadscum = ({ value }) => {
  const classes = useBreadCumStyle();

  return (
    <Stack spacing={3}>
      <Breadcrumbs separator='›' aria-label='breadcrumb'>
        <Link
          sx={{ display: { xs: "block", sm: "none" } }}
          className={classes.breadcumColor}
          underline='hover'
          key='1'
          color='inherit'>
          :
        </Link>
        {Array.isArray(value) &&
          value?.map((val, key) => {
            return (
              val &&
              val?.breadcrumb && (
                <Link className={classes.breadcumColor} underline='hover' key={key} color='inherit'>
                  {capitalizeFirstLetter(val.breadcrumb)}
                </Link>
              )
            );
          })}
      </Breadcrumbs>
    </Stack>
  );
};
export default GlobalHeaderbreadscum;
