import { Grid } from "@mui/material";
import { useUserGroups } from "@platformx/authoring-apis";
import { handleDialog } from "@platformx/authoring-state";
import {
  AutoTextArea,
  CommonBoxWithNumber,
  ShowToastSuccessMessage,
  SuccessIcon,
  TextBox,
  TitleSubTitle,
} from "@platformx/utilities";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { userGroupCreateMapper, userGroupUpdateMapper } from "../../Utils/helper";
import GroupHeader from "../GroupHeader/GroupHeader";
import MultiTagSelect from "../MultiTagSelect/MultiTagSelect";
import { userGroupsProps } from "./CreateUserGroup.types";

const CreateUserGroup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("name");
  const [locationObj] = useState(JSON.parse(localStorage.getItem("groupDetails") || "{}"));
  const dispatch = useDispatch();
  const { createUserGroup, updateUserGroup } = useUserGroups();
  const [userGroup, setUserGroup] = useState<userGroupsProps>({
    name: "",
    description: "",
    tags: [],
  });
  const [errorState, setErrorState] = useState({
    name: { error: false, message: "Name is required" },
    description: { error: false, message: "Description is required" },
    tags: { error: false, message: "Tags are required" },
  });

  const handleValidation = () => {
    let obj = errorState;
    let emptyFields = true;
    for (const property in userGroup) {
      if (userGroup[property] === "" || !userGroup[property]?.length) {
        emptyFields = false;
        obj = { ...obj, [property]: { ...obj?.[property], error: true } };
      } else {
        obj = { ...obj, [property]: { ...obj?.[property], error: false } };
      }
    }
    setErrorState(obj);
    return emptyFields;
  };

  const returnBack = () => {
    localStorage.removeItem("groupDetails");
    navigate("/community/user-groups");
  };

  const updateGroup = async () => {
    const response: any = await updateUserGroup(userGroupUpdateMapper(userGroup, locationObj));
    if (response?.success) {
      localStorage.setItem(
        "groupDetails",
        JSON.stringify(userGroupUpdateMapper(userGroup, locationObj)),
      );
      ShowToastSuccessMessage(t("Group updated successfully"));
    }
  };

  const createGroup = async () => {
    const response: any = await createUserGroup(userGroupCreateMapper(userGroup));
    if (response?.success) {
      const dialogContent = {
        imageIcon: SuccessIcon,
        isOpen: true,
        title: t("congratulations"),
        subTitle: t("the group has been created successfully"),
        rightButtonText: t("go_to_listing"),
        handleCallback: returnBack,
      };
      dispatch(handleDialog(dialogContent));
    }
  };

  const handleCreateUserGroup = () => {
    if (handleValidation()) {
      code && locationObj ? updateGroup() : createGroup();
    }
  };

  const updateErrorState = (field, state) => {
    setErrorState({
      ...errorState,
      [field]: { ...errorState?.[field], error: state },
    });
  };

  const handleUserGroupState = (event: React.ChangeEvent<HTMLInputElement>, val = []) => {
    if (event.target.name === undefined || event.target.name === "tags") {
      if (val?.length) {
        updateErrorState("tags", false);
      }
      setUserGroup({ ...userGroup, tags: val });
    } else {
      setUserGroup({ ...userGroup, [event.target.name]: event.target.value });
      if (event.target.value === "") {
        updateErrorState(event.target.name, true);
      }
    }
  };

  const handleChangeCallback = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      updateErrorState(event.target.name, false);
    }
  };

  useEffect(() => {
    if (code && Object.keys(locationObj)?.length) {
      const { label = "", description = "", tags = [] } = locationObj;
      setUserGroup({ name: label, description, tags });
    }
  }, [code, locationObj]);

  return (
    <>
      <GroupHeader
        arrowText={code ? "Update Group" : "Create Group"}
        buttonText={code ? "Update" : "Create"}
        returnBack={returnBack}
        onSave={handleCreateUserGroup}
      />
      <CommonBoxWithNumber
        number='01'
        title={t("title_head")}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t("subhead")}>
        <Grid container>
          <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiledLast'>
            <TitleSubTitle
              title={`${t("Name")}*`}
              subTitle={t("Group name")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7} className='textFiledLast'>
            <TextBox
              name='name'
              placeHolder={t("Enter your group name here")}
              maxCharLength={120}
              state={userGroup.name}
              handleOnBlur={handleUserGroupState}
              error={errorState.name.error}
              helperText={errorState.name.error && errorState.name.message}
              handleChange={handleChangeCallback}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={`${t("description")}*`}
              subTitle={t("Tell us about your group")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
            <AutoTextArea
              name='description'
              placeHolder={t("Write your group description here")}
              maxCharLength={1000}
              state={userGroup.description}
              handleOnBlur={handleUserGroupState}
              error={errorState.description.error}
              helperText={errorState.description.message}
              handleChange={handleChangeCallback}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={`${t("choose_tags")}*`}
              subTitle={t("Choose your tags")}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
            <MultiTagSelect
              tags={userGroup.tags}
              handleCallback={handleUserGroupState}
              error={errorState.tags.error}
              errorText={errorState.tags.message}
            />
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
    </>
  );
};

export default CreateUserGroup;
