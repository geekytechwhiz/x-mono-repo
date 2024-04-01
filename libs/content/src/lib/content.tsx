/* eslint-disable no-debugger */
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab } from "@mui/material";
import { CATEGORY_CONTENT, CONTENT_TYPES } from "@platformx/authoring-apis";
import { capitalizeFirstLetter, makeCreateContentPath, useAccess } from "@platformx/utilities";
import { useLocation, useNavigate } from "react-router-dom";
import ContListingContainer from "./components/ContentListingContainer/ContentListingContainer";

export default function Content() {
  const { canAccessAction } = useAccess();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  let contentType: string = capitalizeFirstLetter(lastSegment);
  contentType = contentType?.toLocaleLowerCase() === "search-results" ? "ALL" : contentType;
  const navigate = useNavigate();

  const createContentNew = () => {
    const navigateTo: string = makeCreateContentPath(contentType);
    navigate(navigateTo, {
      state: contentType?.trim()?.toLowerCase(),
    });
  };

  return (
    <>
      <Box>
        <ContListingContainer contentType={contentType} />
      </Box>
      <Box
        sx={{
          display: { sm: "none" },
          position: "fixed",
          bottom: 0,
          right: 0,
        }}>
        <Box
          classes={!canAccessAction(CATEGORY_CONTENT, CONTENT_TYPES, "Create") && "disable"}
          sx={{
            margin: "0 15px 24px 0",
          }}
          onClick={createContentNew}>
          <Fab size='large' color='primary' aria-label='add'>
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </>
  );
}
