import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import SpaceListingHeader from "./components/SpaceListingHeader";
import SpaceListingCard from "./components/SpaceListingCard";
import { useStyles } from "./Space.styles";
import { getSpacesList } from "./utils/SpacesHelper";
import {
  ShowToastError,
  ShowToastSuccess,
  ContentListLoader,
  NoSearchResult,
} from "@platformx/utilities";
import { useMutation } from "@apollo/client";
import {
  DELETE_SPACE,
  INVITE_MEMBERS_TO_SPACE,
  JOIN_SPACE,
  LEAVE_SPACE,
} from "@platformx/authoring-apis";

export default function Space() {
  const { t } = useTranslation();
  const defaultRow = 20;
  const [deleteSpace] = useMutation(DELETE_SPACE);
  const [leaveSpace] = useMutation(LEAVE_SPACE);
  const [joinSpace] = useMutation(JOIN_SPACE);
  const [inviteMembersToSpace] = useMutation(INVITE_MEMBERS_TO_SPACE);
  const [spaceList, setSpaceList] = useState<any>([]);
  const [isNext, setIsNext] = useState(true);
  const classes = useStyles();
  const [isInvited, setIsInvited] = useState(false);
  const [invitedLoading, setInvitedLoading] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    start: 0,
    searchTerm: "",
  });
  const didMount = useRef(false);
  const isSearch = useRef(false);
  const assignSpacestoStateLogic = async (searchTermsData: any) => {
    try {
      const spaceListResponse = await getSpacesList(searchTermsData);
      if (spaceListResponse.length < 20) {
        setIsNext(false);
      } else {
        setIsNext(true);
      }
      if (isSearch.current) {
        setSpaceList(spaceListResponse);
      } else {
        setSpaceList((prevState: any) => {
          return [...prevState, ...spaceListResponse];
        });
      }
    } catch (err) {
      ShowToastError(t("api_error_toast"));
    }
    isSearch.current = false;
  };
  const reFetchSpaceListing = () => {
    isSearch.current = true;
    setSearchTerms((prevState) => {
      return {
        ...prevState,
        start: 0,
      };
    });
  };
  const deleteSpaceHandler = async (id: string, title: string) => {
    try {
      const response = await deleteSpace({
        variables: {
          id: id,
        },
      });
      if (response) {
        reFetchSpaceListing();
        ShowToastSuccess(`${title} ${t("deleted_toast")}`);
      }
    } catch (error: any) {
      ShowToastError(error?.graphQLErrors[0]?.message || t("api_error_toast"));
    }
  };

  const leaveSpaceHandler = async (id: string) => {
    try {
      const response = await leaveSpace({
        variables: {
          id: id,
        },
      });
      if (response) {
        reFetchSpaceListing();
        ShowToastSuccess(t("left_toast"));
      }
    } catch (error: any) {
      ShowToastError(error?.graphQLErrors[0]?.message || t("api_error_toast"));
    }
  };

  const joinSpaceHandler = async (id: string) => {
    try {
      const response = await joinSpace({
        variables: {
          id: id,
        },
      });
      if (response) {
        reFetchSpaceListing();
        ShowToastSuccess(t("join_toast"));
      }
    } catch (error: any) {
      ShowToastError(error?.graphQLErrors[0]?.message || t("api_error_toast"));
    }
  };
  const inviteMembersHandler = async (
    id: string,
    removeMembers: any,
    inviteMembers: any,
    cancleMembers: any,
  ) => {
    try {
      setInvitedLoading(true);
      const response = await inviteMembersToSpace({
        variables: {
          spaceId: id,
          removeMembers: removeMembers,
          inviteMembers: inviteMembers,
          cancelMembers: cancleMembers,
        },
      });
      if (response) {
        reFetchSpaceListing();
        setIsInvited(true);
      }
    } catch (error: any) {
      ShowToastError(error?.graphQLErrors[0]?.message || t("api_error_toast"));
    } finally {
      setInvitedLoading(false);
    }
  };

  const pagination = () => {
    setSearchTerms((prevState) => {
      return {
        ...prevState,
        start: prevState.start + defaultRow,
      };
    });
  };

  const handleSearch = useCallback((data: string) => {
    isSearch.current = true;
    setSearchTerms((prevState) => {
      return {
        ...prevState,
        start: 0,
        searchTerm: data,
      };
    });
  }, []);

  useEffect(() => {
    const runAsyncFunction = async () => {
      await assignSpacestoStateLogic(searchTerms);
    };
    if (didMount.current) {
      runAsyncFunction();
    } else {
      didMount.current = true;
    }
  }, [searchTerms]);

  return (
    <Box className={`${classes.container} main-container`}>
      <Box className='spaceHeader'>
        <SpaceListingHeader title='space' handleSearch={handleSearch} />
      </Box>
      <Box id='scrollableDiv' className='spaceListing'>
        {isNext || spaceList?.length > 0 ? (
          <InfiniteScroll
            next={pagination}
            dataLength={spaceList?.length || 0}
            loader={<ContentListLoader />}
            scrollableTarget='scrollableDiv'
            style={{ overflowX: "hidden" }}
            hasMore={isNext}>
            <Box className='spacelistCard'>
              <Box>
                {spaceList?.map((item: any, index) => (
                  <SpaceListingCard
                    key={`${item?.id} ${index.toString()}`}
                    dataList={item}
                    dataType='Space'
                    deleteSpace={deleteSpaceHandler}
                    leaveSpace={leaveSpaceHandler}
                    joinSpace={joinSpaceHandler}
                    inviteMembers={inviteMembersHandler}
                    isInvited={isInvited}
                    setIsInvited={setIsInvited}
                    invitedLoading={invitedLoading}
                  />
                ))}
              </Box>
            </Box>
          </InfiniteScroll>
        ) : (
          <NoSearchResult />
        )}
      </Box>
    </Box>
  );
}
