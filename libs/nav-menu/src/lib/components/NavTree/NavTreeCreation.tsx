import { useLazyQuery, useMutation } from '@apollo/client'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, Button, Typography } from '@mui/material'
import {
  delete_menu,
  fetch_menu_list,
  publish_menu,
  update_menu,
} from '@platformx/authoring-apis'
import { updateInitialState } from '@platformx/authoring-state'
import { Category, ContentAction } from '@platformx/content'
import {
  ErrorTooltip,
  GuidelineImage,
  LadyImage,
  SSGuideline,
  ThemeConstants,
  useAccess,
} from '@platformx/utilities'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import CreateMenuPage from './CreateMenuPage'
import NavMenuView from './MobileViewPages/NavMenuView'
import NavTree from './NavTree'

export default function NavTreeCreation() {
  const { t } = useTranslation()
  const handleSelectedType = async (selectedType) => {
    // await searchPageUrl.searchParams.set('searchCat', selectedType.name);
    // await window.history.pushState({}, '', searchPageUrl);
    // await setStartIndex(0);
    // await filterItem(selectedType.name, 0, rows);
  }
  const [isOpen, setIsOpen] = useState(false)
  const [isCreate, setIsCreate] = useState(true)
  const [isPageFinal, setisPageFinal] = useState(false)
  const [openCreateMenu, setOpenCreateMenu] = useState(false)
  const [pageListOpen, setPageListOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const [editDone, setEditDone] = useState(false)
  const [isedit, setisedit] = useState(false)
  const [isConfirm, setisConfirm] = useState(false)
  const { canAccessAction } = useAccess()
  const [runFetchMenuList] = useLazyQuery(fetch_menu_list)
  const [updatemutate] = useMutation(update_menu)
  const [publishmutate] = useMutation(publish_menu)
  const [mutateDeleteMenu] = useMutation(delete_menu)

  const dispatch = useDispatch()
  const [menus, setMenus] = useState<any>()
  const [isCall, setIsCall] = useState(false)
  const onclickGuideline = () => {
    setIsOpen(true)
    setIsCreate(false)
  }
  const onClose = (value) => {
    setIsOpen(false)
    setIsCreate(true)
  }
  const onclickCreateMenu = () => {
    setIsCreate(false)
    setOpenCreateMenu(true)
    setisPageFinal(false)
    setisedit(false)
  }

  const handleOpenCreateMenu = (value) => {
    setIsCreate(value)
    setOpenCreateMenu(false)
  }
  useEffect(() => {
    runFetchMenuList({
      variables: {
        pagePath: '',
      },
    })
      .then((resp) => {
        if (resp?.data?.authoring_getNavigation) {
          setMenus(resp?.data?.authoring_getNavigation)

          dispatch(
            updateInitialState(
              resp?.data?.authoring_getNavigation?.menu_content,
            ),
          )
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2))
      })
  }, [isCall])
  const updateMenu = (menuToUpdate) => {
    return updatemutate({
      variables: {
        input: menuToUpdate,
      },
    })
  }
  const publishMenu = (defaultTimeZone) => {
    return publishmutate({
      variables: {
        input: {
          timeZone: defaultTimeZone,
        },
      },
    })
  }
  const deleteMenu = (menuToUpdate) => {
    return mutateDeleteMenu({
      variables: {
        input: menuToUpdate,
      },
    })
  }
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: {
              xs: 'block',
              sm: 'block',
              md: 'block',
              em: 'none',
              lg: 'none',
            },
            width: { xs: '100%', sm: '100%', md: '100%', em: '0%', lg: '0%' },
          }}
        >
          <NavMenuView handleSelectedType={handleSelectedType} />
        </Box>
        {pageListOpen === false && (
          <Box
            sx={{
              width: {
                sm: '0%',
                xs: '0%',
                md: '0%',
                em: '23%',
                lg: '21%',
                xl: '19%',
              },
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                em: 'block',
                lg: 'block',
              },
              borderRight: '1px solid #ccc',
            }}
          >
            <NavTree
              handleSelectedType={handleSelectedType}
              setEditData={setEditData}
              setOpenCreateMenu={setOpenCreateMenu}
              editDone={editDone}
              setisedit={setisedit}
              isConfirm={isConfirm}
              setIsCreate={setIsCreate}
              isCall={isCall}
              setIsCall={setIsCall}
              menus={menus}
              updateMenu={updateMenu}
              publish={publishMenu}
              deleteMenu={deleteMenu}
            />
          </Box>
        )}
        {/* <Divider orientation='vertical' sx={{height:'550px'}} /> */}
        {openCreateMenu && (
          <CreateMenuPage
            openCreateMenu={openCreateMenu}
            handleOpenCreateMenu={handleOpenCreateMenu}
            isPageFinal={isPageFinal}
            setPageListOpen={setPageListOpen}
            editData={editData}
            setIsCreate={setIsCreate}
            editDone={editDone}
            setEditDone={setEditDone}
            setEditData={setEditData}
            setisedit={setisedit}
            isedit={isedit}
            isConfirm={isConfirm}
            setisConfirm={setisConfirm}
          />
        )}
        {isCreate && (
          <Box
            sx={{
              width: {
                sm: '0%',
                xs: '0%',
                md: '0%',
                em: '77%',
                lg: '79%',
                xl: '81%',
              },
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                em: 'flex',
                lg: 'flex',
              },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                margin: '0',
              }}
            >
              <Box sx={{ margin: '0 auto 10px' }}>
                <img src={LadyImage} width="301px" height="218px"></img>
              </Box>
              <Box>
                <Typography variant="h3medium" sx={{ color: '#89909a' }}>
                  {t('menu_head')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '25px',
                }}
              >
                <ErrorTooltip
                  component={
                    <Button
                      variant="contained"
                      disabled={
                        !canAccessAction(
                          Category.Menu,
                          '',
                          ContentAction.Create,
                        )
                      }
                      disableElevation
                      // onClick = {generateArticle}
                      onClick={onclickCreateMenu}
                    >
                      <AddIcon
                        sx={{ width: '14px', height: '14px', mr: '8px' }}
                      />
                      {t('menu_create_button')}
                    </Button>
                  }
                  doAccess={
                    !canAccessAction(Category.Menu, '', ContentAction.Create)
                  }
                />
                <Button
                  variant="outlined"
                  sx={{
                    marginLeft: '15px',
                    minWidth: 'auto',
                  }}
                  disableElevation
                  onClick={onclickGuideline}
                >
                  <InfoOutlinedIcon sx={{ width: '20px', height: '20px' }} />
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        {isOpen && (
          <Box
            sx={{
              width: {
                sm: '100%',
                xs: '100%',
                md: '100%',
                em: '79%',
                lg: '79%',
                xl: '81%',
              },
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                em: 'block',
                lg: 'block',
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px',
              }}
            >
              <Typography
                variant="h4medium"
                sx={{
                  color: '#2d2d38',
                }}
              >
                {t('menu_guide_button')}
              </Typography>
              <CloseIcon
                sx={{ width: '19.1px', height: '19.1px', cursor: 'pointer' }}
                onClick={onClose}
              />
            </Box>
            <Box
              sx={{
                justifyContent: 'center',
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 167px)',
                display: 'flex',
                padding: '15px',
              }}
            >
              <Box sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    margin: '30px 0 12px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h4medium" sx={{ color: '#2d2d39' }}>
                    {t('menu_creation_step1')}{' '}
                  </Typography>
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      height: { xs: '40px', md: '50px' },
                      margin: { xs: '0 15px', lg: '0 20px' },
                      padding: { xs: '10px 20px', lg: '10px 35px' },
                      '&:hover': {
                        backgroundColor: ThemeConstants.BLACK_COLOR,
                        color: ThemeConstants.WHITE_COLOR,
                      },
                    }}
                    // onClick = {generateArticle}
                    //  onClick={() => onDuplicatePage(false, undefined)}
                  >
                    <AddIcon
                      sx={{ width: '16px', height: '16px', margin: 0.5 }}
                    />{' '}
                    {t('menu_create_button')}
                  </Button>
                  <Typography variant="h4medium" sx={{ color: '#2d2d39' }}>
                    {t('cta_or_button')}{' '}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5regular" sx={{ color: '#89909a' }}>
                    {t('menu_step1_details')}
                  </Typography>
                </Box>
                <Box sx={{ margin: '39px 0 23px', objectFit: 'contain' }}>
                  <img src={GuidelineImage} width="695px" />
                </Box>
                <Box
                  sx={{
                    marginBottom: '14px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h4medium" sx={{ color: '#2d2d39' }}>
                    {t('menu_creation_step2')}
                  </Typography>
                </Box>
                <Box sx={{ maxWidth: '694px' }}>
                  <Typography variant="h5regular" sx={{ color: '#89909a' }}>
                    {t('menu_step2_details')}
                  </Typography>
                </Box>
                <Box sx={{ margin: '17px 0 5px', objectFit: 'contain' }}>
                  <img src={SSGuideline} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {/* </Box>} */}
      </Box>
    </>
  )
}
