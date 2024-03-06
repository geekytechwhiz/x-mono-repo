import { CreateHeader } from "@platformx/content";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { t } from "i18next";
import { Box, Button, Divider, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useTagStyle } from "./Tags.style";
import { capitalizeFirstLetter } from "@platformx/utilities";
import { fetchTagList } from "@platformx/authoring-apis";

export const CategoryDetail = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const classes = useTagStyle();
  const [tags, setTags] = useState<string[]>([]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]); // State to store selected items

  const toggleSelection = (item: string) => {
    // Store the updated state value in a variable
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item) // Deselect if already selected
      : [...selectedItems, item]; // Select if not selected

    // Use the variable to set the state
    setSelectedItems(updatedSelectedItems);
  };

  const fetchTag = async () => {
    try {
      const { authoring_getTagItems = [] }: any = await fetchTagList({
        searchCategory: category,
        searchString: "",
      });
      if (
        authoring_getTagItems?.length > 0 &&
        authoring_getTagItems[0] &&
        authoring_getTagItems[0].tags
      ) {
        setTags(authoring_getTagItems[0].tags);
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
        saveText={t("Create New Tag")}
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
                      selectedItems.includes(tag) ? classes.selected : classes.txtcolor
                    }`}
                    onClick={() => toggleSelection(tag)}
                    key={tag}>
                    <Button
                      endIcon={selectedItems.includes(tag) ? <DeleteIcon /> : ""}
                      color={selectedItems.includes(tag) ? "error" : "primary"}>
                      {tag}
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
