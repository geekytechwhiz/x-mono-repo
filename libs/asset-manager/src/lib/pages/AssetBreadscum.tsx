import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { useImagesStyle } from "./Images.style";

export default function AssetBreadsum() {
  const classes = useImagesStyle();
  const [searchParams] = useSearchParams();
  const path = searchParams.get("path");
  const pathArray = path ? path.split("|") : [];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator='›' aria-label='breadcrumb' className={classes.breadcrumbsFont}>
        {pathArray?.[0] && (
          <Link
            className={classes.breadcum}
            underline='none'
            key='2'
            color='#14142B'
            // href='/material-ui/getting-started/installation/'
            // onClick={handleClick}
          >
            <FolderOutlinedIcon className={classes.folderouticon} />
            <Typography className={classes.breadcumtypo}>{pathArray[0]}</Typography>
          </Link>
        )}
        {pathArray?.slice(1)?.map((name) => (
          <Box className={classes.breadcum} key={name}>
            <FolderOutlinedIcon className={classes.folderouticon} />
            <Typography className={classes.breadcumtypo}>{name}</Typography>
          </Box>
        ))}
      </Breadcrumbs>
    </Stack>
  );
}
