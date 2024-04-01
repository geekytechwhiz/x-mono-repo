import { CreateHeader } from "@platformx/content";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { t } from "i18next";
import { Box, Button, Divider, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useTagStyle } from "./Tags.style";
import { capitalizeFirstLetter } from "@platformx/utilities";
import { fetchTagListing } from "@platformx/authoring-apis";
import { SYSTEM_TAGS } from "./constant";

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

  useEffect(() => {
    if (category) {
      fetchTag();
    }
  }, []);

  return (
    <>
      <CreateHeader
        createText={capitalizeFirstLetter(category || "")}
        handleReturn={() => {
          navigate("/site-setting/tags");
        }}
        isQuiz
        hasPublishButton={false}
        hasPreviewButton={false}
        hasSaveButton={false}
        saveText={`${t("create")} ${t("tag")}`}
        handelPreview={() => {
          /* your function code */
        }}
        handlePublish={() => {}}
        handleSaveOrPublish={() => {}}
        previewText='Preview'
        showPreview={false}
        toolTipText='Unable to preview please add required details'
        saveVariant='contained'
        category={"content"}
        subCategory={"quiz"}
        isFeatured={false}
        //isdeleteicon={true}
        // issearchicon={true}
      />
      <Divider />
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.gridbt}>
            <Box className={classes.beforecreatebtn}>
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
