import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { t } from "i18next";
import { Box, Button, Divider, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useTagStyle } from "./Tags.style";
import { ShowToastError, ShowToastSuccess, capitalizeFirstLetter } from "@platformx/utilities";
import { deleteTag, fetchTagListing } from "@platformx/authoring-apis";
import { SYSTEM_TAGS } from "./constant";
import TopBar from "./TopBar";
import Skeleton from "@mui/material/Skeleton";

export const CategoryDetail = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const classes = useTagStyle();
  const [tags, setTags] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>({});

  const toggleSelection = (item) => {
    if (item.type === SYSTEM_TAGS) return;

    const updatedSelectedItems = selectedItems.tag_name === item.tag_name ? {} : item;
    setSelectedItems(updatedSelectedItems);
  };

  const fetchTag = async () => {
    try {
      const { authoring_getTagItems = [] }: any = await fetchTagListing({
        searchCategory: category,
        searchString: "",
        start: 0,
        rows: 1000,
      });
      if (authoring_getTagItems?.length > 0) {
        setTags(authoring_getTagItems);
      }
    } catch (error) {
      setTags([]);
    }
  };

  const deleteHandle = async () => {
    setTags([]);
    try {
      //const res =
      await deleteTag({
        tagName: selectedItems.doc_path,
        category: selectedItems.category,
      });
      setSelectedItems({});
      ShowToastSuccess(`${t("tag")} ${t("deleted_toast")}`);
      fetchTag();
    } catch (error) {
      ShowToastError(t("api_error_toast"));
    }
  };

  useEffect(() => {
    if (category) {
      fetchTag();
    }
  }, []);

  return (
    <>
      <TopBar
        createText={capitalizeFirstLetter(category || "")}
        returnBack={() => navigate("/site-setting/tags")}
        selectedItems={selectedItems}
        deleteHandle={deleteHandle}
        isCategoryDetail
      />
      <Divider />
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.gridbt}>
            <Box className={classes.beforecreatebtn}>
              {tags?.length === 0 &&
                Array(8)
                  .fill(1)
                  .map((val, i) => (
                    <Skeleton
                      key={i}
                      sx={{ paddingLeft: "20px" }}
                      animation='wave'
                      width={100}
                      height={52}
                    />
                  ))}
              {tags?.length > 0 &&
                tags.map((tag) => (
                  <Box
                    className={`${classes.createbtn} ${
                      selectedItems.tag_name === tag.tag_name ? classes.selected : classes.txtcolor
                    }`}
                    onClick={() => toggleSelection(tag)}
                    key={tag.tag_name}>
                    <Button
                      disabled={tag.type === SYSTEM_TAGS}
                      className={classes.textTransform}
                      endIcon={selectedItems.tag_name === tag.tag_name ? <DeleteIcon /> : ""}
                      color={selectedItems.tag_name === tag.tag_name ? "error" : "primary"}>
                      {tag.tag_name}
                    </Button>
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
