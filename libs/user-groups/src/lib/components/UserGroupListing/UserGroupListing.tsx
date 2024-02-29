import { Box, Button, Typography } from "@mui/material";
import { useUserGroupList } from "@platformx/authoring-apis";
import { ContentListDesktopLoader, NoSearchResult } from "@platformx/utilities";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import UserGroupCard from "../UserGroupCard/UserGroupCard";
import { useStyles } from "./UserGroupListing.styles";

const UserGroupListing = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { contents, isLoading, fetchMore } = useUserGroupList({ startIndex: 0 });

  const HandleCreateGroup = () => {
    navigate("/create/user-groups");
  };

  useEffect(() => {
    localStorage.removeItem("groupDetails");
  }, []);

  return (
    <Box>
      <Box className={classes.headContainer}>
        <Box>
          <Typography variant='h3medium'>User Groups</Typography>
        </Box>
        <Box>
          <Button onClick={HandleCreateGroup} variant='primaryButton' className='sm'>
            Create group
          </Button>
        </Box>
      </Box>
      <Box className={classes.cardContainer} id='scrollableDiv'>
        <InfiniteScroll
          dataLength={contents?.length}
          next={fetchMore}
          hasMore={isLoading}
          loader={<ContentListDesktopLoader />}
          scrollableTarget='scrollableDiv'>
          {!isLoading && !contents?.length ? (
            <NoSearchResult />
          ) : (
            contents?.map((content: any) => <UserGroupCard key={content?.id} content={content} />)
          )}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default UserGroupListing;
