import { useEffect, useState } from "react";
import { ShowToastError } from "@platformx/utilities";
import AssetApi from "../../services/assetsApi/assets.api";
import { useParams, useSearchParams } from "react-router-dom";
// import { authInfo } from "../../utils/authConstants";

const COMMUNITY = {
  collections: [],
  subcommunities: [],
};
const COLLECTION_ITEM = {
  collectionItem: [],
  page: {},
};

const useAsset = ({ search = "" }) => {
  const [assetData, setAssetData] = useState<any>(COMMUNITY);
  const [collectionItem, setCollectionItem] = useState<any>(COLLECTION_ITEM);
  const [folderLoading, setFolderLoading] = useState(false);
  const [assetLoading, setAssetLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);

  const ROWS = 16;
  const [searchParams] = useSearchParams();
  const { assetType = "images" } = useParams();
  const assetUUID = {
    images: '93ea0aed-631b-45a7-b3ae-564ac071dea6',
    videos: '11f0b07a-b736-40da-8a60-de9c8f6b4aae',
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
      } else {
        console.log("error in api");
      }
    } catch (err) {
      // setError(err);
      ShowToastError('err');
    } finally {
      setFolderLoading(false);
      reload && setRefresh(false);
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
        const { collectionItem = [], page = {} } = authoring_getAssets;
        if (collectionItem.length < ROWS) {
          setIsLazyLoad(false);
        } else {
          setIsLazyLoad(true);
        }
        setCollectionItem({
          collectionItem: collectionItem,
          page: page,
        });
      } else {
        console.log("error in api");
      }
    } catch (err) {
      //setError(err);
      ShowToastError('err');
      setIsLazyLoad(false);
    } finally {
      setAssetLoading(false);
      reload && setRefresh(false);
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
        const { collectionItem = [], page = {} } = authoring_getAssets;
        if (collectionItem.length < ROWS) {
          setIsLazyLoad(false);
        } else {
          setIsLazyLoad(true);
        }

        setCollectionItem((prev) => ({
          collectionItem: [...prev.collectionItem, ...collectionItem],
          page: page,
        }));
      } else {
        console.log("error in api");
      }
    } catch (err) {
      // setError(err);
      setIsLazyLoad(false);
      ShowToastError('err');
    } finally {
      reload && setRefresh(false);
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

  useEffect(() => {
    if (refresh) {
      // if (uuid1 && uuid2) {
      //   fetchAsset(true);
      // } else {
      fetchCommunityCollect(true);
      setStartIndex(0);
      //  }
    }
  }, [refresh]);

  return {
    assetData,
    collectionItem,
    folderLoading,
    //  fetchCommunityCollect,
    //  refresh,
    setRefresh,
    //  fetchCollectionAsset,
    isLazyLoad,
    fetchMoreData,
    startIndex,
    setStartIndex,
    assetLoading,
  };
};

export default useAsset;
