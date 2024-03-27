import PrelemBox from "./PrelemBox";
import { useStyles } from "./PrelemList.styles";
import { Box } from "@mui/material";
import { Mapping } from "@platformx/x-prelems-library";
import React from "react";
import { SearchCardListProps } from "../utils/prelemTypes";

//mapping dynamic instance
const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(() =>
    import(`@platformx/x-prelems-library`).then((module) => ({
      default: module[Mapping[item]],
    })),
  );
  return mappingDynamicInstance;
});

const PrelemList = ({ searchCardList }: SearchCardListProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.listBox}>
      {searchCardList.length > 0 &&
        searchCardList.map((item, key) => {
          return <PrelemBox key={key} item={item} />;
        })}
    </Box>
  );
};

export default PrelemList;
