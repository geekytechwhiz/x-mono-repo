import { useEffect, useRef, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import Header from "./components/Header/Header";
import {
  Loader,
  convertToLowerCase,
  nullToObject,
  ShowToastError as showToastError,
  CommonPlateformXDialog as PlateformXDialog,
} from "@platformx/utilities";
import SpaceAccess from "./components/SpaceAccess/SpaceAccess";
import SpaceDetails from "./components/SpaceDetails/SpaceDetails";
import InviteMembers from "./components/InviteMembers/InviteMembers";
import { getSpacesDetailsBasedId } from "./utils/SpacesHelper";
import { CREATE_SPACE, UPDATE_SPACE } from "@platformx/authoring-apis";
import {
  checkStateChanges,
  dataToReceiveMapper,
  dataToSendMapper,
} from "./components/Utils/helper";
import { Types } from "./components/Utils/Constants";
import { Constants } from "./components/SpaceDetails/Constants";
import { RegistrationConstants } from "./components/SpaceAccess/Constants";

const CreateSpace = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "";
  const spaceId = searchParams.get("id");
  const { t } = useTranslation();
  const [createSpace] = useMutation(CREATE_SPACE);
  const [updateSpace] = useMutation(UPDATE_SPACE);
  const [readOnly, setReadOnly] = useState(false);
  const [spaceType, setSpaceType] = useState("create");
  const [stateSpace, setStateSpace] = useState({
    displayName: "",
    description: "",
    template: Constants[0],
    hidden: false,
    registration: RegistrationConstants[0],
    invitedMembers: [],
  });
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const unsavedChanges = useRef<boolean>(false);
  const loading = false;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const getSpaceDetailsById = async (idOfSpace = "") => {
    try {
      setIsLoading(true);
      const res = await getSpacesDetailsBasedId(idOfSpace);
      const { authoring_getExoContentList = {} } = nullToObject(res);
      if (nullToObject(Object.keys(authoring_getExoContentList)).length > 0) {
        const spaceDetails = dataToReceiveMapper(authoring_getExoContentList);
        setStateSpace((prevState) => {
          return {
            ...prevState,
            ...spaceDetails,
          };
        });
      }
    } catch (error: any) {
      if (error?.graphQLErrors[0]) {
        showToastError(error?.graphQLErrors[0].message);
      } else {
        showToastError(t("api_error_toast"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createUpdateHandler = async () => {
    if (stateSpace.displayName === "") {
      showToastError(`${t("name")} ${t("is_required")}`);
      return;
    }
    if (type === Types?.EDIT) {
      try {
        setIsLoading(true);
        const res = await updateSpace({
          variables: {
            input: dataToSendMapper(stateSpace),
            template: stateSpace.template.toLowerCase(),
            id: spaceId,
          },
        });
        if (res?.data?.authoring_updateSpace) {
          unsavedChanges.current = false;
          setShowPublishConfirm(true);
        }
      } catch (error: any) {
        if (error.graphQLErrors[0]) {
          showToastError(error?.graphQLErrors[0].message);
        } else {
          showToastError(t("api_error_toast"));
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const res = await createSpace({
          variables: {
            input: dataToSendMapper(stateSpace),
            template: stateSpace.template.toLowerCase(),
          },
        });
        if (res?.data?.authoring_createSpace) {
          unsavedChanges.current = false;
          setShowPublishConfirm(true);
        }
      } catch (error: any) {
        if (error.graphQLErrors[0]) {
          showToastError(error?.graphQLErrors[0].message);
        } else {
          showToastError(t("api_error_toast"));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const returnBack = () => {
    if (unsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      navigate("/community/space");
    }
  };

  const handleConfirm = () => {
    setShowExitWarning(false);
    unsavedChanges.current = false;
    navigate("/community/space");
  };

  useEffect(() => {
    if (checkStateChanges(stateSpace) || type === Types?.VIEW) {
      unsavedChanges.current = false;
    } else {
      unsavedChanges.current = true;
    }
  }, [stateSpace, type]);

  useEffect(() => {
    if ([Types?.EDIT, Types?.VIEW].includes(type) && spaceId !== null) {
      setSpaceType(type);

      if (convertToLowerCase(type) === Types?.VIEW) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }

      getSpaceDetailsById(spaceId);
    }
  }, [spaceId, type]);

  return (
    <Box>
      {isLoading && <Loader />}

      <Box>
        <Box>
          <Header
            returnBack={returnBack}
            type={`${t(spaceType)} ${t("space")}`}
            createUpdateHandler={createUpdateHandler}
            disableButton={readOnly}
          />
          <Divider></Divider>
        </Box>

        <Box
          sx={{
            backgroundColor: "#f7f7f7",
            padding: { sm: "15px", xs: "15px 0px 0px 0px" },
            position: "relative",
            height: {
              sm: "calc(100vh - 75px)",
              xs: "calc(100vh - 65px)",
            },
            overflowY: loading ? "hidden" : "scroll",
            overflowX: "hidden",
          }}
          id='scrollableDiv'>
          <SpaceDetails
            stateSpace={{ ...stateSpace, readOnly: readOnly }}
            setStateSpace={setStateSpace}
          />
          <SpaceAccess
            stateSpace={{ ...stateSpace, readOnly: readOnly }}
            setStateSpace={setStateSpace}
          />
          {![Types?.EDIT, Types?.VIEW].includes(type) && (
            <InviteMembers
              stateSpace={{ ...stateSpace, readOnly: readOnly }}
              setStateSpace={setStateSpace}
            />
          )}
        </Box>
      </Box>
      <PlateformXDialog
        isDialogOpen={showExitWarning}
        title={t("save_warn_title")}
        subTitle={t("save_warn_subtitle")}
        closeButtonText={t("take_me_out")}
        confirmButtonText={t("stay_here")}
        closeButtonHandle={handleConfirm}
        confirmButtonHandle={() => setShowExitWarning(false)}
        crossButtonHandle={() => {
          setShowExitWarning(false);
        }}
        modalType='unsavedChanges'
      />
      {showPublishConfirm ? (
        <PlateformXDialog
          isDialogOpen={showPublishConfirm}
          title={t("congratulations")}
          subTitle={type === Types?.EDIT ? t("space_update_popup") : t("space_create_popup")}
          confirmButtonText={t("go_to_listing")}
          confirmButtonHandle={() => navigate("/community/space")}
          modalType='publish'
          closeButtonHandle={() => setShowPublishConfirm(false)}
        />
      ) : null}
    </Box>
  );
};

export default CreateSpace;
