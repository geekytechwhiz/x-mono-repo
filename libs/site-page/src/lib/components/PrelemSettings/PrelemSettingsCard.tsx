import { Box } from "@mui/material/";
import {
  RootState,
  updateContentForCard,
  updateDynamicPrelemAssetInfo,
  updateLivestreamPrelemAssetInfo,
} from "@platformx/authoring-state";
import { useTranslation } from "react-i18next";
import { ShowToastError } from "@platformx/utilities";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../BackButton/BackButton";
import { PrelemSettingList } from "../utils/constants";
import PrelemBrightcoveVideo from "./PrelemBrightcoveVideo";
import PrelemEcom from "./PrelemEcom";
import PrelemImages from "./PrelemImages";
import PrelemSEO from "./PrelemSEO";
import PrelemTestimonials from "./PrelemTestimonials";
import PrelemTwitter from "./PrelemTwitter";
import PrelemVideos from "./PrelemVideos";
import PrelemAdvanced from "./prelemAdvanced";
import PrelemAnalytics from "./prelemAnalytics";
import { postRequest } from "@platformx/authoring-apis";

const PrelemSettingsCard = ({ selectedPrelemIndex, pageId, setPageId, updatePrelemContent }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { page } = useSelector((state: RootState) => state);
  const [prelemModelData, setPrelemModelData] = useState(page.prelemMetaArray[selectedPrelemIndex]);

  const handleSave = async (sectionToUpdate, data, index) => {
    if (sectionToUpdate === "EcomHandle") {
      dispatch(
        updateDynamicPrelemAssetInfo({
          selectedPrelemIndex: selectedPrelemIndex,
          sectionToUpdate: sectionToUpdate,
          data: data,
        }),
      );
      page.prelemMetaArray[selectedPrelemIndex].content.ApiEndPoint = data?.apiEndPoint;
      page.prelemMetaArray[selectedPrelemIndex].content.OauthEndPoint = data?.oauthEndPoint;
      page.prelemMetaArray[selectedPrelemIndex].content.Password = data?.password;
      page.prelemMetaArray[selectedPrelemIndex].content.Username = data?.userName;
    } else if (sectionToUpdate === "TwitterHandle") {
      dispatch(
        updateDynamicPrelemAssetInfo({
          selectedPrelemIndex: selectedPrelemIndex,
          sectionToUpdate: sectionToUpdate,
          data: data,
        }),
      );
      page.prelemMetaArray[selectedPrelemIndex].content.TwitterHandle = data;
    } else if (sectionToUpdate === "Testimonials") {
      dispatch(
        updateDynamicPrelemAssetInfo({
          selectedPrelemIndex: selectedPrelemIndex,
          sectionToUpdate: sectionToUpdate,
          data: data,
        }),
      );
      page.prelemMetaArray[selectedPrelemIndex].content.Testimonials = data;
    } else if (sectionToUpdate === "Livestream") {
      dispatch(
        updateLivestreamPrelemAssetInfo({
          selectedPrelemIndex: selectedPrelemIndex,
          sectionToUpdate: sectionToUpdate,
          data: data,
        }),
      );
      page.prelemMetaArray[selectedPrelemIndex].content = {
        ...page.prelemMetaArray[selectedPrelemIndex].content,
        ...data,
      };
    } else if (sectionToUpdate === "ImageCompound") {
      dispatch(
        updateContentForCard({
          selectedPrelemIndex: selectedPrelemIndex,
          sectionToUpdate: sectionToUpdate,
          data: data.ImageCompound,
          index: index,
        }),
      );
    } else if (sectionToUpdate === "Videos") {
      await autoCrop({ data, sectionToUpdate, index });
    } else {
      dispatch(
        updateContentForCard({
          selectedPrelemIndex: selectedPrelemIndex,
          sectionToUpdate: sectionToUpdate,
          data: data,
          index: index,
        }),
      );
    }

    if (
      ["ImageCompound", "TwitterHandle", "Livestream", "Testimonials"].includes(sectionToUpdate)
    ) {
      let updateContent: any = "";
      if (sectionToUpdate === "ImageCompound" || sectionToUpdate === "Videos") {
        updateContent = {
          ...page?.prelemMetaArray[selectedPrelemIndex]?.content,
          [sectionToUpdate]: {
            ...page?.prelemMetaArray[selectedPrelemIndex]?.content[sectionToUpdate],
            [index]: sectionToUpdate === "ImageCompound" ? data.ImageCompound : data,
          },
        };
      } else {
        updateContent = page.prelemMetaArray[selectedPrelemIndex].content;
      }
      updatePrelemContent(
        updateContent,
        selectedPrelemIndex,
        prelemModelData.DocumentPath,
        prelemModelData.DocumentCreationPath,
        prelemModelData.DocumentType,
        prelemModelData.InstanceId,
      );
    } else {
      return;
    }
  };
  const autoCrop = async ({ data, sectionToUpdate, index }) => {
    const url = data?.Thumbnail;
    const pattern = /\/bitstreams\/([0-9a-fA-F-]+)\/content/;
    const bitStreamId = pattern.exec(url)?.[1];
    const payload = {
      url: data?.Thumbnail,
      bitstreamId: bitStreamId,
      visibility: "public",
    };
    try {
      const response = await postRequest("api/v1/assets/image/auto-crop", payload);
      if (response && response?.bitstream_id) {
        const updatedData = { ...data, Thumbnail: JSON.stringify(response) };
        dispatch(
          updateContentForCard({
            selectedPrelemIndex: selectedPrelemIndex,
            sectionToUpdate: sectionToUpdate,
            data: updatedData,
            index: index,
          }),
        );
      } else {
        ShowToastError(`${t("auto_cropping_failed")}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    setPrelemModelData(page.prelemMetaArray[selectedPrelemIndex]);
  }, [page.prelemMetaArray[selectedPrelemIndex]]);

  return (
    <Box>
      {prelemModelData?.PrelemId === "Prelem_066" && pageId === PrelemSettingList[0].id && (
        <PrelemEcom
          index={selectedPrelemIndex}
          EcomHandle={prelemModelData?.content}
          handleSave={handleSave}
          setPageId={setPageId}
        />
      )}
      {prelemModelData?.content?.TwitterHandle !== undefined &&
        pageId === PrelemSettingList[1].id && (
          <PrelemTwitter
            index={selectedPrelemIndex}
            twitterHandle={prelemModelData.content.TwitterHandle}
            handleSave={handleSave}
            setPageId={setPageId}
          />
        )}
      {prelemModelData?.content?.Testimonials !== undefined &&
        pageId === PrelemSettingList[2].id && (
          <PrelemTestimonials
            data={prelemModelData.content.Testimonials}
            sectionToUpdate='Testimonials'
            handleSave={handleSave}
            setPageId={setPageId}
          />
        )}
      {prelemModelData?.content?.ImageCompound !== undefined &&
        pageId === PrelemSettingList[3].id && (
          <Box className='pageSettingmainWp'>
            <BackButton setPageId={setPageId} Title='Images' backTo='prelemSetting' />
            {Object.entries(prelemModelData.content.ImageCompound).map(([key, value], index) => {
              return (
                <PrelemImages
                  key={`ImageCompound_${index + 1}`}
                  index={`ImageCompound_${index + 1}`}
                  handleSave={handleSave}
                  sectionToUpdate='ImageCompound'
                  published_images={
                    prelemModelData?.content?.ImageCompound?.[`ImageCompound_${index + 1}`]
                      ?.published_images
                  }
                  original_image={
                    prelemModelData?.content?.ImageCompound?.[`ImageCompound_${index + 1}`]
                      ?.original_image
                  }
                />
              );
            })}
          </Box>
        )}

      {prelemModelData?.content?.Videos !== undefined &&
        prelemModelData?.PrelemName !== "Image & Video Gallery" &&
        pageId === PrelemSettingList[4].id &&
        Object.entries(prelemModelData.content.Videos).map(([key, value]) => {
          return (
            <PrelemVideos
              key={key}
              index={key}
              playerFlow={prelemModelData?.content?.PlayerType}
              videoInstance={value}
              handleSave={handleSave}
              sectionToUpdate='Videos'
              setPageId={setPageId}
            />
          );
        })}
      {prelemModelData?.content?.PlayerType === "brightcove" &&
        pageId === PrelemSettingList[5].id && (
          <PrelemBrightcoveVideo
            setPageId={setPageId}
            index={selectedPrelemIndex}
            videoObj={{
              VideoID: prelemModelData?.content?.VideoID,
              PlayerID: prelemModelData?.content?.PlayerID,
              AccountID: prelemModelData?.content?.AccountID,
            }}
            handleSave={handleSave}
          />
        )}
      {prelemModelData?.content?.TwitterHandle === undefined &&
        pageId === PrelemSettingList[6].id && (
          <PrelemSEO
            setPageId={setPageId}
            selectedPrelemIndex={selectedPrelemIndex}
            handleSave={handleSave}
          />
        )}

      {pageId === PrelemSettingList[7].id && <PrelemAdvanced setPageId={setPageId} />}
      {pageId === PrelemSettingList[8].id && (
        <PrelemAnalytics setPageId={setPageId} selectedPrelemIndex={selectedPrelemIndex} />
      )}
    </Box>
  );
};

export default PrelemSettingsCard;
