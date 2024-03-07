import { useEffect, useState } from "react";
import { ShowToastError, AUTH_INFO } from "@platformx/utilities";
import AssetApi from "../../services/assetsApi/assets.api";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const COMMUNITY = {
  collections: [],
  subcommunities: [],
};
const COLLECTION_ITEM = {
  collectionItem: [],
  page: {},
};

const useAsset = () => {
  const [assetData, setAssetData] = useState<any>(COMMUNITY);
  const [collectionItem, setCollectionItem] = useState<any>(COLLECTION_ITEM);
  const [folderLoading, setFolderLoading] = useState(false);
  const [assetLoading, setAssetLoading] = useState(false);
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);

  const ROWS = 16;
  const [searchParams] = useSearchParams();
  const pathName = window.location.pathname.split("/");
  const assetType = pathName.pop() || "images";
  const assetUUID = {
    images: AUTH_INFO.dspaceImagesUuid,
    videos: AUTH_INFO.dspaceVideosUuid,
    // docs: authInfo.misc
  };

  const uuid1 = searchParams.get("uuid1") || assetUUID[assetType];

  const fetchCommunityCollect = async (reload = false) => {
    try {
      setFolderLoading(true);
      const { authoring_getAssets = {} } = await AssetApi.fetchCommunityCollection(
        {
          uuid: uuid1,
          start: 0,
          rows: 20,
          search: "",
        },
        reload,
      );
      if (authoring_getAssets) {
        const { collections = [], subcommunities = [] } = authoring_getAssets;
        if (!collections?.[0]?.uuid) {
          setIsLazyLoad(false);
        } else {
          setIsLazyLoad(true);
        }
        setAssetData({
          collections,
          subcommunities,
        });
      }
    } catch (err) {
      ShowToastError(t("api_error_toast"));
    } finally {
      setFolderLoading(false);
    }
  };

  const fetchCollectionAsset = async (reload = false) => {
    try {
      setAssetLoading(true);
      const { authoring_getAssets = {} } = await AssetApi.fetchCollectionItem(
        {
          uuid: assetData.collections?.[0]?.uuid,
          start: 0,
          rows: ROWS,
          search: "",
          entityType: assetType?.toLowerCase() === "images" ? "Image" : "Video",
        },
        reload,
      );
      if (authoring_getAssets) {
        const { collectionItem: item = [], page = {} } = authoring_getAssets;
        if (item.length < ROWS) {
          setIsLazyLoad(false);
        } else {
          setIsLazyLoad(true);
        }
        setCollectionItem({
          collectionItem: item,
          page: page,
        });
      }
    } catch (err) {
      ShowToastError(t("api_error_toast"));
      setIsLazyLoad(false);
    } finally {
      setAssetLoading(false);
    }
  };

  const fetchMoreData = async (index = 0, reload = false) => {
    try {
      const { authoring_getAssets = {} } = await AssetApi.fetchCollectionItem(
        {
          uuid: assetData.collections?.[0] ? assetData.collections?.[0]?.uuid : "",
          start: index,
          rows: ROWS,
          search: "",
          entityType: assetType?.toLowerCase() === "images" ? "Image" : "Video",
        },
        reload,
      );
      if (authoring_getAssets) {
        const { collectionItem: item = [], page = {} } = authoring_getAssets;
        if (item.length < ROWS) {
          setIsLazyLoad(false);
        } else {
          setIsLazyLoad(true);
        }

        setCollectionItem((prev) => ({
          collectionItem: [...prev.collectionItem, ...item],
          page: page,
        }));
      }
    } catch (err) {
      setIsLazyLoad(false);
      ShowToastError(t("api_error_toast"));
    }
  };

  useEffect(() => {
    if (assetData.collections?.[0]?.uuid) {
      fetchCollectionAsset();
    } else {
      setCollectionItem(COLLECTION_ITEM);
    }
  }, [assetData.collections]);

  useEffect(() => {
    // if (uuid1 && uuid2) {
    //   fetchAsset();
    // } else {
    fetchCommunityCollect();
    setStartIndex(0);
    setAssetData(COMMUNITY);
    setCollectionItem(COLLECTION_ITEM);
    //  }
  }, [uuid1]);

  return {
    assetData,
    collectionItem,
    folderLoading,
    isLazyLoad,
    fetchMoreData,
    startIndex,
    setStartIndex,
    assetLoading,
    fetchCommunityCollect,
    fetchCollectionAsset,
  };
};

export default useAsset;
