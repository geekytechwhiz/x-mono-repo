import { useLazyQuery, useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckIcon from "@mui/icons-material/Check";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Divider, Fab, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { delete_menu, fetch_menu_list, publish_menu, update_menu } from "@platformx/authoring-apis";
import { RootState, updateInitialState } from "@platformx/authoring-state";
import { Category, ContentAction } from "@platformx/content";
import {
  CommonPlateformXDialog,
  ErrorTooltip,
  Loader,
  SettingIcon,
  ShowToastError,
  ShowToastSuccess,
  ThemeConstants,
  useAccess,
  useUserSession,
} from "@platformx/utilities";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavMenuDialog from "./MobileViewPages/NavMenuDialog";
import RenameDialog from "./MobileViewPages/RenameDialog";
import { Drag, DragAndDrop, Drop } from "./drag-and-drop";
import { updateMainMenuScoreAndReorder } from "./helper";
import "./styles.css";
import { MenulistProps } from "./utils/types";

export default function MobileLeftSideMenu({
  handleSelectedType,
  setOpenGuideline,
  setOpenFirstPage,
  setEditData,
  clickConfirm,
}) {
  const { t } = useTranslation();
  const searchPageUrl = new URL(window.location.href);
  const [, setSelectedType] = useState<string>(
    searchPageUrl.searchParams.get("searchCat")
      ? (searchPageUrl.searchParams.get("searchCat") as string)
      : "All",
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { navTreeArray } = useSelector((state: RootState) => state.menu);

  const [leftSideBarContent, setLeftSideContent] = useState(navTreeArray);
  const [currentButton] = React.useState(null);
  const [name, setName] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [menuParentId, setMenuParentId] = useState(false);

  const [mutateDeleteMenu] = useMutation(delete_menu);
  const [updatemutate] = useMutation(update_menu);
  const [runFetchMenuList] = useLazyQuery(fetch_menu_list);
  const [publishmutate] = useMutation(publish_menu);
  const [row, setRow] = useState(navTreeArray?.length);
  const [selectedMenu, setSelectedMenu] = useState<MenulistProps>();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const { canAccessAction } = useAccess();
  const [menus, setMenus] = useState<any>();
  const reorderMenu: any = JSON.parse(JSON.stringify(leftSideBarContent));
  const newMenu = useRef<any>([]);

  const menuCount = useRef(0);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const Transition = React.forwardRef(function Transition(
    props: {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  const handleListClick = (event: React.MouseEvent<HTMLElement>, itemList) => {
    event.stopPropagation();
    setSelectedMenu(itemList);
    if (itemList.ParentId === "0") {
      for (let i = 0; i < leftSideBarContent.length; i++) {
        if (leftSideBarContent[i].ParentId === itemList.Menu_Id) {
          menuCount.current++;
        }
      }
    }
  };

  const onButtonClicked = (id, val) => {
    setIsOpen(true);
    setName(val);
  };
  React.useEffect(() => {
    setLeftSideContent(navTreeArray);
  }, [navTreeArray]);
  useEffect(() => {
    const fetchMenuList = async () => {
      const menuList: any = await runFetchMenuList({
        variables: {
          pagePath: "",
        },
      });
      const { data } = menuList;
      setMenus(data?.authoring_getNavigation);

      const menu = data?.authoring_getNavigation.menu_content;
      const filteredMenus =
        menu &&
        menu
          .filter(
            (item: any, index, self) => index === self.findIndex((x) => x.Label === item.Label),
          )
          ?.sort((prev: any, cur: any) => prev.Score - cur.Score);
      dispatch(updateInitialState(filteredMenus));
    };
    fetchMenuList().catch(() => {
      // console.log(JSON.stringify(err, null, 2));
    });
  }, [row, name, menuParentId, clickConfirm]);
  const navigate = useNavigate();
  const handlePageList = (item) => {
    handleSelectedType(item);
  };
  const handlePagesType = (item) => {
    setSelectedType(item.name);
    handlePageList(item);
  };

  const handleReorderMenu = async () => {
    const { created_by: createdBy } = menus;
    const menuToUpdate = {
      lastModifiedBy: username,
      createdBy,
      menu_content: reorderMenu,
    };

    const menuReOrderRes = await updatemutate({
      variables: {
        input: menuToUpdate,
      },
    });
    return menuReOrderRes;
  };
  const handlePublish = async () => {
    const defaultTimeZone = `${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    const menuPublishRes = await publishmutate({
      variables: {
        input: {
          timeZone: defaultTimeZone,
        },
      },
    });
    return menuPublishRes;
  };
  const handleDeleteMenu = () => {
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    const itemToDelete = tempArr.filter(
      (value) =>
        value.Menu_Id !== selectedMenu?.Menu_Id && value.ParentId !== selectedMenu?.Menu_Id,
    );
    const { last_modified_by: lastModifiedBy, created_by: createdBy } = menus;
    const menuToUpdate = {
      lastModifiedBy,
      createdBy,
      menu_content: itemToDelete,
    };
    setIsDeleteOpen(false);

    mutateDeleteMenu({
      variables: {
        input: menuToUpdate,
      },
    })
      .then(() => {
        setRow(row - 1);
        ShowToastSuccess(`${t("menu")} ${t("deleted_toast")}`);
      })
      .catch(() => {
        ShowToastError(t("api_error_toast"));
      });
  };
  const handleCloseMenu = () => {
    setIsSubMenu(false);
    // setIsOpen(false);
  };

  const handleDragEnd = (result) => {
    const { type, source, destination } = result;
    if (!destination) return;
    const sourceleftSideBarContentId = source.droppableId;
    const destinationleftSideBarContentId = destination.droppableId;
    // Reordering items
    if (type === "droppable-item") {
      if (sourceleftSideBarContentId === destinationleftSideBarContentId) {
        const updatedCategories = updateMainMenuScoreAndReorder(
          leftSideBarContent,
          source?.index,
          destination?.index,
        );
        if (updatedCategories) {
          setLeftSideContent(updatedCategories);
          const menu = [
            {
              Menu_Id: updatedCategories[source?.index].Menu_Id,
              Score: updatedCategories[source?.index].Score,
              ParentId: updatedCategories[source?.index].ParentId,
            },
            {
              Menu_Id: updatedCategories[destination?.index].Menu_Id,
              Score: updatedCategories[destination?.index].Score,
              ParentId: updatedCategories[destination?.index].ParentId,
            },
          ];
          newMenu.current.value = menu;
        }
        reorderMenu.forEach((value, i) => {
          if (value.Menu_Id === newMenu.current.value[i]?.Menu_Id) {
            reorderMenu[i].Score = newMenu.current.value[i].Score;
            reorderMenu[i].ParentId = newMenu.current.value[i].ParentId;
          }
        });
      }
    }
    // Reordering categories
    if (type === "droppable-category") {
      const updatedCategories = updateMainMenuScoreAndReorder(
        leftSideBarContent,
        source?.index,
        destination?.index,
      );
      if (updatedCategories) {
        setLeftSideContent(updatedCategories);
        const menu = [
          {
            Menu_Id: updatedCategories[source?.index].Menu_Id,
            Score: updatedCategories[source?.index].Score,
            ParentId: updatedCategories[source?.index].ParentId,
          },
          {
            Menu_Id: updatedCategories[destination?.index].Menu_Id,
            Score: updatedCategories[destination?.index].Score,
            ParentId: updatedCategories[destination?.index].ParentId,
          },
        ];
        newMenu.current.value = menu;
      }
      reorderMenu.forEach((value, i) => {
        if (value.Menu_Id === newMenu.current.value[i]?.Menu_Id) {
          reorderMenu[i].Score = newMenu.current.value[i].Score;
          reorderMenu[i].ParentId = newMenu.current.value[i].ParentId;
        }
      });
    }
  };

  // const handleDragEnd = (result) => {
  //   const { type, source, destination } = result;
  //   if (!destination) return;

  //   if (type === 'droppable-category' || type === 'droppable-item') {
  //     const updatedCategories = updateMainMenuScoreAndReorder(
  //       leftSideBarContent,
  //       source?.index,
  //       destination?.index
  //     );
  //     if (updatedCategories) {
  //       setLeftSideContent(updatedCategories);
  //     }
  //   }
  // };
  useEffect(() => {
    const fetchMenuList = async () => {
      const menuList: any = await runFetchMenuList({
        variables: {
          pagePath: "",
        },
      });
      const { data } = menuList;
      setMenus(data?.authoring_getNavigation);
      const menusData = data?.authoring_getNavigation.menu_content;
      const filteredMenus =
        menusData &&
        menusData
          .filter(
            (item: any, index, self) => index === self.findIndex((x) => x.Label === item.Label),
          )
          ?.sort((pre: any, cur: any) => pre.Score - cur.Score);
      setLeftSideContent(filteredMenus);
    };
    fetchMenuList().catch(() => {
      // console.log(JSON.stringify(err, null, 2));
    });
  }, []);
  const publishMenu = async () => {
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    const isHomePage = tempArr.find((val) => {
      if (val.HomePage === true) {
        return true;
      } else {
        return false;
      }
    });
    if (isHomePage) {
      setIsLoaded(true);

      const reOrderResponse: any = await handleReorderMenu().catch((err) => {
        if (err) {
          ShowToastError(t("api_error_toast"));
        }
      });

      if (reOrderResponse && !reOrderResponse?.errors) {
        const publishedResponse: any = await handlePublish().catch((err) => {
          if (err) {
            ShowToastError(t("api_error_toast"));
          }
        });
        if (publishedResponse?.data && !publishedResponse.errors) {
          ShowToastSuccess(`${t("menu")} ${t("published_toast")}`);
        }
      }
      setIsLoaded(false);
    } else {
      ShowToastError("Please select Home Page");
    }
  };

  const onAddHandle = () => {
    setEditData("");
    setOpenFirstPage(true);
  };
  const onRename = (label) => {
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    const isItemExist = tempArr.find((val) => {
      return val ? val.Label.toLowerCase() === label.toLowerCase() : "";
    });
    if (isItemExist) {
      ShowToastError(t("menu_exist"));
    } else {
      tempArr.forEach((value, i) => {
        if (value.Menu_Id === selectedMenu?.Menu_Id) {
          tempArr[i].Label = label;
        }
      });

      const { created_by: createdBy } = menus;
      const menuToUpdate = {
        lastModifiedBy: username,
        createdBy,
        menu_content: tempArr,
      };

      updatemutate({
        variables: {
          input: menuToUpdate,
        },
      })
        .then(() => {
          setName("");
          ShowToastSuccess(`${t("menu")} ${t("updated_toast")}`);
        })
        .catch((error) => {
          if (error.graphQLErrors[0]) {
            ShowToastError(error.graphQLErrors[0].message);
          } else {
            ShowToastError(t("api_error_toast"));
          }
        });
    }
  };
  const onSetSubMenu = (parent_Id) => {
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));

    tempArr.forEach((value, i) => {
      if (value.Menu_Id === selectedMenu?.Menu_Id) {
        tempArr[i].ParentId = parent_Id;
      }
    });

    const { created_by: createdBy } = menus;
    const menuToUpdate = {
      lastModifiedBy: username,
      createdBy,
      menu_content: tempArr,
    };

    updatemutate({
      variables: {
        input: menuToUpdate,
      },
    })
      .then(() => {
        setMenuParentId(!menuParentId);
        ShowToastSuccess(`${t("menu")} ${t("updated_toast")}`);
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          ShowToastError(error.graphQLErrors[0].message);
        } else {
          ShowToastError(t("api_error_toast"));
        }
      });
  };
  return (
    <>
      {isLoaded && <Loader />}
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            flexDirection: "column",
            position: "relative",
          },
        }}>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            overflow: "hidden",
          }}>
          {/* <Slide direction="right" in={isSideMenuOpen} timeout={300}>
            <Box
              sx={{
                backgroundColor: '#fff',
                zIndex: 100,
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: 0,
              }}
            >
              <PageLeftSidebar
                handleSelectedType={handleSelectedType}
                setIsSideMenuOpen={setIsSideMenuOpen}
              />
            </Box>
          </Slide> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // margin: '0px 40% 0px 0%',
              padding: "15px",
            }}>
            <ArrowBackIosIcon
              sx={{ width: "20px", height: "20px" }}
              onClick={() => {
                navigate("/page-list");
              }}
            />
            <Typography
              variant='h4medium'
              sx={{
                ml: "10px",
              }}>
              Navigation
            </Typography>
            <Box
              sx={{
                // position: 'absolute',
                // right: '8%',
                display: "flex",
                alignItems: "center",
                ml: "10px",
              }}>
              <InfoIcon
                // sx={{ margin: '0px 0 0px 15px' }}
                onClick={() => setOpenGuideline(true)}
              />
            </Box>
          </Box>
          <Divider />
          <Box className='navTreeMenuBox' sx={{ overflowY: "auto", height: "calc(100vh - 210px)" }}>
            <DragAndDrop onDragEnd={handleDragEnd}>
              <Drop id='droppable' type='droppable-category'>
                {leftSideBarContent?.length > 0 &&
                  leftSideBarContent?.map((item, index) => {
                    return (
                      <>
                        {item.ParentId === "0" && (
                          <Drag
                            className='draggable-category'
                            key={item.Menu_Id + item.Score}
                            id={item.Menu_Id + item.Score}
                            index={index}>
                            <div className='category-container'>
                              <Box
                                sx={{
                                  boxShadow: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  position: "relative",
                                }}>
                                <Typography variant='h6regular'>{item.Label}</Typography>
                                <Box className='NavTreeHomeIcon'>
                                  {item.HomePage === true ? (
                                    <HomeOutlinedIcon
                                      sx={{
                                        color: ThemeConstants.BLUE_COLOR,
                                        fontSize: ThemeConstants.FONTSIZE_H3,
                                      }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Box>
                                <Box
                                  id={String(index)}
                                  onClick={(event) => handleListClick(event, item)}
                                  className='NavTreeSettingIcon'>
                                  <img
                                    src={SettingIcon}
                                    alt='Setting Icon'
                                    onClick={() => onButtonClicked(index, item.Label)}
                                  />
                                </Box>
                              </Box>
                              <Drop
                                key={index.toString()}
                                id={index.toString()}
                                type='droppable-item'>
                                {leftSideBarContent?.length > 0 &&
                                  leftSideBarContent?.map((item1, index1) => {
                                    return (
                                      <>
                                        {item1.ParentId === item.Menu_Id && (
                                          <Drag
                                            className='draggable'
                                            key={item1.Label + item1.Menu_Id}
                                            id={item1.Label + item1.Menu_Id}
                                            index={index1}>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                cursor: "pointer",
                                                position: "relative",
                                                width: "100%",
                                                flexDirection: "row",
                                                marginRight: "-5px",
                                              }}
                                              onClick={() => handlePagesType(item)}>
                                              <Typography
                                                variant='subtitle2'
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}>
                                                {item1.Label}
                                              </Typography>
                                              <Box
                                                id={String(index)}
                                                onClick={(event) => handleListClick(event, item1)}
                                                sx={{
                                                  width: "21.2px",
                                                  height: "20px",
                                                  right: 0,
                                                  position: "absolute",
                                                  cursor: "pointer",
                                                  color:
                                                    currentButton === index ? "#fd0c0d" : "#2d2d39",
                                                }}>
                                                <img
                                                  src={SettingIcon}
                                                  alt='Setting Icon'
                                                  onClick={() =>
                                                    onButtonClicked(index, item1.Label)
                                                  }
                                                />
                                                {/* <MoreHorizIcon
                                                onClick={() => onButtonClicked(index, item1.Label)}
                                              /> */}
                                              </Box>
                                            </Box>
                                            {/* </Box> */}
                                          </Drag>
                                        )}
                                      </>
                                    );
                                  })}
                              </Drop>
                            </div>
                          </Drag>
                        )}
                        {/* {item.ParentId == '0' && <Divider />} */}
                      </>
                    );
                  })}
              </Drop>
            </DragAndDrop>

            <Box
              sx={{
                display: { xs: "block", md: "none", lg: "none", sm: " none" },
              }}>
              <ErrorTooltip
                component={
                  <Fab
                    sx={{
                      position: "fixed",
                      bottom: "13%",
                      right: "4%",
                      zIndex: 99,
                      backgroundColor: "transparent",
                      border: "1.5px solid #2d2d39",
                      boxShadow: "none",
                      color: "#000",
                    }}
                    size='medium'
                    aria-label='add'
                    disabled={!canAccessAction(Category.Menu, "", ContentAction.Publish)}
                    onClick={publishMenu}>
                    <CheckIcon />
                  </Fab>
                }
                doAccess={!canAccessAction(Category.Menu, "", ContentAction.Publish)}
              />
              <ErrorTooltip
                component={
                  <Fab
                    sx={{
                      position: "fixed",
                      bottom: "4%",
                      right: "4%",
                      zIndex: 99,
                      boxShadow: "none",
                    }}
                    size='medium'
                    color='primary'
                    aria-label='add'
                    disabled={!canAccessAction(Category.Menu, "", ContentAction.Create)}>
                    <AddIcon onClick={onAddHandle} />{" "}
                  </Fab>
                }
                doAccess={!canAccessAction(Category.Menu, "", ContentAction.Create)}
              />
            </Box>
          </Box>
          {isOpen && (
            <NavMenuDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              name={name}
              setIsDeleteOpen={setIsDeleteOpen}
              setIsRenameOpen={setIsRenameOpen}
              setIsSubMenu={setIsSubMenu}
              setOpenFirstPage={setOpenFirstPage}
              selectedMenu={selectedMenu}
              setEditData={setEditData}
              menuCount={menuCount}
            />
          )}
          {/* {isDeleteOpen && (
          <DeleteDialog
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
            name={name}
            setIsOpen={setIsOpen}
            handleDeleteMenu={handleDeleteMenu}
          />
        )} */}
          {isDeleteOpen && (
            <CommonPlateformXDialog
              isDialogOpen={isDeleteOpen}
              title={t("delete_title")}
              subTitle={`${t("delete_confirm")} ${t("menu_item")}? ${t("process_undone")}`}
              closeButtonText={t("no_keep_it")}
              closeButtonHandle={() => {
                setIsOpen(true);
                setIsDeleteOpen(false);
              }}
              confirmButtonText={t("yes_delete_it")}
              confirmButtonHandle={handleDeleteMenu}
              modalType='delete'
            />
          )}
          {isRenameOpen && (
            <RenameDialog
              isRenameOpen={isRenameOpen}
              setIsRenameOpen={setIsRenameOpen}
              name={name}
              setIsOpen={setIsOpen}
              onRename={onRename}
            />
          )}

          {isSubMenu && (
            <Dialog
              sx={{
                display: { sm: "none" },
                ".Platform-x-Dialog-paper": {
                  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
                  borderRadius: "10px 10px 0 0",
                  width: "100%",
                  margin: 0,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              }}
              open={isSubMenu}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseMenu}
              aria-describedby='alert-dialog-slide-description'>
              <DialogTitle sx={{ marginLeft: "13px" }}>Select main menu item</DialogTitle>
              <Divider />
              {leftSideBarContent.map(
                (val) =>
                  val.ParentId === "0" &&
                  val.Menu_Id !== selectedMenu?.Menu_Id &&
                  val.Menu_Id !== selectedMenu?.ParentId && (
                    <Box
                      key={val.Menu_Id}
                      onClick={() => {
                        onSetSubMenu(val.Menu_Id);
                        handleCloseMenu();
                      }}
                      sx={{ display: "flex", marginLeft: "23px", p: "15px" }}>
                      <Box sx={{ fontSize: "16px" }}>{val.Label}</Box>
                    </Box>
                  ),
              )}
            </Dialog>
          )}
        </Box>
      </Box>
    </>
  );
}
