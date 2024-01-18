import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import DamContentGallery from './damContentGallery/DamContentGallery'
import {
  ArrowUpwardIcon,
  ThemeConstants,
  ShowToastError,
  nullToObject,
  ShowToastSuccess,
} from '@platformx/utilities'
import { useTranslation } from 'react-i18next'
import { usePostImageCrop } from './hooks/usePostImageCrop'
import ImageCrop from './components/ImageCrop'
import CachedIcon from '@mui/icons-material/Cached';
import ImageRender from './components/ImageRender'
import ShowCaseCrops from './components/ShowCaseCrops'

export const XImageRender = () => {
  const { t } = useTranslation()
  const { postRequest, isLoading } = usePostImageCrop()
  const [galleryState, setGalleryState] = useState<boolean>(false)
  const [assetType, setAssetType] = useState<string>('Image')
  const [operationType, setOperationType] = useState<string>('choose')
  const [processing, setProcessing] = useState(false)
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    title: '',
    description: '',
    bitStreamId: '',
  })
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    title: '',
    description: '',
    Url: '',
  })
  const [returnData, setReturnData] = useState({})
  const [manualCropShow, setManualCropShow] = useState(false)
  const [showCropPreview, setShowCropPreview] = useState(false);

  const autoCropCallBack = (data, payload) => {
      const {
        images = [],
        ext,
        original_image_relative_path = '',
        visibility = '',
      } = nullToObject(data)
      if (images?.length > 0) {
        const data = {
          cropped_images: images,
          original_image: {
            thumbnail: payload.url,
            original_image_relative_path,
            bitStreamId: payload.bitstreamId,
            auto: true,
            ext: ext,
            visibility,
            type: 'autocrop'
          },
        }
        setReturnData(data);
        setProcessing(false);
        setGalleryState(false);
        console.info('return data', data)
        ShowToastSuccess(`${t('auto_cropped_successfully')}`);
      } else {
        setProcessing(false);
        setGalleryState(false);
        setManualCropShow(true)
        ShowToastError(`${t('auto_cropping_failed')}`)
      }
  }

  const autoCropFunc = async (selectedImg) => {
    setProcessing(true)
    const payload = {
      url: selectedImg.Thumbnail,
      bitstreamId: selectedImg.bitStreamId,
      visibility: 'public',
    }
    await postRequest(
      'api/v1/assets/image/auto-crop',
      payload,
      autoCropCallBack,
    )
  }

  const handleSelectedImage = async (image) => {
    console.info('selectedImage', image)
    setSelectedImage(image);
    autoCropFunc(image)
  }

  const handleSelectedVideo = async (video) => {
    setSelectedVideo(video)
    console.info('selectedVideo', video)
  }

  const setImageOrVideoToDefault = () => {
    setSelectedImage({
      title: '',
      Thumbnail: '',
      description: '',
      bitStreamId: '',
    })
    setSelectedVideo({
      title: '',
      Thumbnail: '',
      description: '',
      Url: '',
    })
  }

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState)
    if (type == 'cancel') {
      setImageOrVideoToDefault()
    }
  }

  const showGallery = () => {
    window.scrollTo(0, 0)
    setGalleryState(true)
  }

  const onUploadClick = (type) => {
    setOperationType(type);
    showGallery()
  }

  const backTo = () => {
    if (manualCropShow) setManualCropShow(false);
    if (showCropPreview) setShowCropPreview(false);
  };

  const doneCropCompleted = (cropImages = [], ext = '', original_image_relative_path = '', visibility = '') => {
    if (cropImages.length > 0) {
      const data = {
        cropped_images: cropImages,
        original_image: {
          thumbnail: selectedImage.Thumbnail,
          original_image_relative_path,
          bitStreamId: selectedImage.bitStreamId,
          auto: false,
          ext: ext,
          visibility,
          type: 'manualcrop'
        },
      };
      setReturnData(data);
      console.info('return data', data)
    }
    setManualCropShow(false);
  };

  const handleEdit = () => {
    setShowCropPreview(false);
    setManualCropShow(true);
  };

  const changeCrop = () => {
    setShowCropPreview(true);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#FFF',
        }}
      >
        {galleryState && (
          <DamContentGallery
            handleImageSelected={handleSelectedImage}
            handleSelectedVideo={handleSelectedVideo}
            toggleGallery={toggleGallery}
            assetType={assetType}
            processing={processing}
          />
        )}
      </Box>
      {(Object.keys(returnData).length !== 0) ? (
          <Box
          sx={{
            position: 'relative', //height: "91%"
            borderRadius: '15px',
            minHeight: '206px',
            '& picture': {
              height: '206px',
            },
          }}
          mb={2}
        >
            <ImageRender
              data={returnData}
              imgOrder={{
                1440: 'hero',
                1280: 'landscape',
                1024: 'card2',
                768: 'square',
                600: 'card2',
                320: 'card2',
              }}
              changeCrop={changeCrop}
            />
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7470708a',
              borderRadius: '15px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => onUploadClick('replace')}
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    width: '25px',
                    height: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                  }}
                >
                  <CachedIcon sx={{ color: '#626060' }} />
                </Box>
                <Typography
                  mt={1}
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    color: ThemeConstants.WHITE_COLOR,
                    textTransform: 'capitalize',
                  }}
                >
                  {t('replace')}
                </Typography>
              </Box>
            </Box>
          </Box>
          </Box>
      ) : (
          <Box
            sx={{
              borderRadius: '15px',
              cursor: 'pointer',
              height: '206px',
              backgroundColor: '#EFF0F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            onClick={() => onUploadClick('choose')}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              m={1}
            >
              <img src={ArrowUpwardIcon} alt="ArrowUpwardIcon" />
            </Box>
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
              }}
            >
              <Typography variant="h5medium">Choose your image</Typography>
            </Box>
          </Box>
      )}
      {manualCropShow && (
        <ImageCrop
          open={manualCropShow}
          backTo={backTo}
          doneCropCompleted={doneCropCompleted}
          originalImage={selectedImage}
        />
      )}
      {showCropPreview && (
        <ShowCaseCrops
          open={showCropPreview}
          backTo={backTo}
          handleEdit={handleEdit}
          data={returnData}
        />
      )}
    </>
  )
}
