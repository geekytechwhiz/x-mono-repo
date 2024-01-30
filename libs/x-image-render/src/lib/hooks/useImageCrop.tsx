// useImageCrop.js
import { useState } from "react";
import { ShowToastError, ShowToastSuccess, nullToObject } from "@platformx/utilities";
import { BREAKPOINTS } from "../utils/constants";
import { usePostImageCrop } from "./usePostImageCrop";

const useImageCrop = (originalImage: any, doneCropCompleted: any) => {
  const { Thumbnail, bitStreamId } = originalImage || {};
  const [doneLoader, setDoneLoader] = useState(false);
  const { postRequest, isLoading } = usePostImageCrop();
  const initialCrops = BREAKPOINTS.map(() => [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const [crops, setCrops] = useState(initialCrops);

  const apiCallBack = (data, img) => {
    if (data) {
      const {
        images = [],
        ext = "",
        original_image_relative_path = "",
        visibility = "",
        bitstream_id = "",
      } = nullToObject(data);
      if (images?.length > 0) {
        ShowToastSuccess("Image Cropped Successfully");
        setDoneLoader(false);
        doneCropCompleted(images, ext, original_image_relative_path, visibility, bitstream_id, img);
      } else {
        ShowToastError("Manual Cropping Failed");
        setDoneLoader(false);
        doneCropCompleted();
      }
    } else {
      ShowToastError("Manual Cropping Failed");
      setDoneLoader(false);
      doneCropCompleted();
    }
  };

  const handleDone = async () => {
    setDoneLoader(true);

    const cropHints = BREAKPOINTS.map(({ ratio }, index) => ({
      aspect_ratio: ratio,
      crop_vertex: crops[index],
    }));

    const payload = {
      url: Thumbnail,
      bitstreamId: bitStreamId,
      visibility: "public",
      crop_hints: cropHints,
    };

    try {
      console.warn("original imaga", originalImage);
      await postRequest("api/v1/assets/image/manual-crop", payload, apiCallBack, originalImage);
    } catch (error) {
      console.error("Error cropping image:", error);
      ShowToastError("Cropping Failed");
      setDoneLoader(false);
      return { success: false, data: null };
    }
  };

  const onCropChange = (data: any, index: any) => {
    setCrops((prevState) => {
      const newCrops = [...prevState];
      newCrops[index] = data;
      return newCrops;
    });
  };

  return {
    doneLoader,
    isLoading,
    crops,
    handleDone,
    onCropChange,
  };
};

export default useImageCrop;
