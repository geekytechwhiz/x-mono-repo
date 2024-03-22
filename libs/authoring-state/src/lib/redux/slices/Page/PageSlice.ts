/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageState, PrelemInstance } from "./Page.types";

const initialPageState: PageState = {
  pageInfo: {
    PageName: "",
    PageDescription: "",
    PageTags: [],
    prelemMetaArray: [],
    PageURL: "",
    PageViewer: "",
    PageCaching: false,
    PageMobileFriendly: false,
    SeoTitle: "",
    SeoDescription: "",
    SeoKeywords: [],
    SeoBlockIndexing: false,
    SocialOgTitle: "",
    SocialOgDescription: "",
    SocialOgSiteName: "",
    SocialOgType: "Website",
    SocialOgURL: "",
    SocialOgLocale: "en_US",
    SocialOgImage: "",
    SocialOgTwitterTitle: "",
    SocialOgTwitterDescription: "",
    SocialOgTwitterImage: "",
    SocialOgTwitterURL: "",
    SocialTwitterCardSize: "summary_large_image",
    content: "",
  },
  prelemsValidationObject: {},
  prelemMetaArray: [],
  pageModel: {},
  insertPrelemAt: 0,
  scrollIndex: 0,
  pageSettings: {},
  publishedPages: [],
  showSaveWarning: false,
  callSave: false,
};

export const pageSlice = createSlice({
  name: "Page",
  initialState: initialPageState,
  reducers: {
    resetState: () => {
      return { ...initialPageState };
    },
    updatePageTitle: (state, action: PayloadAction<any>) => {
      const { Title } = action.payload;
      state.pageModel.Title = Title;
    },
    updateSeoEnable: (state, action: PayloadAction<any>) => {
      const { SeoEnable } = action.payload;
      state.pageModel.SeoEnable = SeoEnable;
    },
    updateAnalyticsEnable: (state, action: PayloadAction<any>) => {
      const { AnalyticsEnabled } = action.payload;
      state.pageModel.AnalyticsEnable = AnalyticsEnabled;
      state.showSaveWarning = true;
    },
    updatePageModel: (state, action: PayloadAction<any>) => {
      const { pageModelCreated } = action.payload;
      state.pageModel = pageModelCreated;
      state.showSaveWarning = true;
    },
    updatePageSettings: (state: PageState, action: PayloadAction<any>) => {
      const { pageInfo } = action.payload;
      state.pageSettings = { ...state.pageSettings, ...pageInfo };
      state.showSaveWarning = true;
    },
    updateContentForCard: (state, action: PayloadAction<any>) => {
      const { selectedPrelemIndex, sectionToUpdate, data, index } = action.payload;
      const existingEntries: any = [...state.prelemMetaArray];
      if (index !== undefined) {
        existingEntries[selectedPrelemIndex].content[sectionToUpdate][index] = data;
        state.prelemMetaArray = existingEntries;
        state.showSaveWarning = true;
      } else {
        existingEntries[selectedPrelemIndex][sectionToUpdate] = data;
        state.prelemMetaArray = existingEntries;
      }
    },
    saveSchedulePublishDateTime: (state, action: PayloadAction<any>) => {
      const { status, time } = action.payload;
      state.pageSettings.IsSchedulePublish = status;
      state.pageSettings.SchedulePublishDateTime = time;
      state.showSaveWarning = true;
    },
    saveScheduleUnpublishDateTime: (state, action: PayloadAction<any>) => {
      const { status, time } = action.payload;
      state.pageSettings.IsScheduleUnpublish = status;
      state.pageSettings.ScheduleUnpublishDateTime = time;
      state.showSaveWarning = true;
    },
    savePrelemAnalytics: (state, action: PayloadAction<any>) => {
      const { analyticsAttributeVal, prelemIndex } = action.payload;
      const prelemSchemaCopyArr: PrelemInstance[] = [...state.prelemMetaArray];
      prelemSchemaCopyArr[prelemIndex].AnalyticsEnabled = analyticsAttributeVal;
      prelemSchemaCopyArr[prelemIndex].IsModified = true;
      state.prelemMetaArray = prelemSchemaCopyArr;
    },
    updateDynamicPrelemAssetInfo: (state, action: PayloadAction<any>) => {
      const { selectedPrelemIndex, sectionToUpdate, data } = action.payload;
      const existingEntries = JSON.parse(JSON.stringify(state.prelemMetaArray));
      existingEntries[selectedPrelemIndex].content[sectionToUpdate] = data;
      state.prelemMetaArray = existingEntries;
      state.showSaveWarning = true;
    },
    updateLivestreamPrelemAssetInfo: (state, action: PayloadAction<any>) => {
      const { selectedPrelemIndex, data } = action.payload;
      const existingEntries = JSON.parse(JSON.stringify(state.prelemMetaArray));
      existingEntries[selectedPrelemIndex].content = {
        ...existingEntries[selectedPrelemIndex].content,
        ...data,
      };
      state.prelemMetaArray = existingEntries;
      state.showSaveWarning = true;
    },
    addPrelem: (state, action: PayloadAction<any>) => {
      const { prelemMetaInstance, prelemValidationInstance, prelemPosition } = action.payload;
      let existingEntriesMeta = [...state.prelemMetaArray];
      const validationsObjCopy = { ...state.prelemsValidationObject };
      validationsObjCopy[prelemMetaInstance.DocumentType] = prelemValidationInstance;
      if (prelemPosition) {
        existingEntriesMeta = [
          ...existingEntriesMeta.slice(0, prelemPosition),
          prelemMetaInstance,
          ...existingEntriesMeta.slice(prelemPosition, existingEntriesMeta.length),
        ];
      } else {
        if (existingEntriesMeta == null) {
          existingEntriesMeta = [];
          existingEntriesMeta.push(prelemMetaInstance);
        } else if (prelemPosition === 0) {
          existingEntriesMeta = [prelemMetaInstance, ...existingEntriesMeta];
        }
      }
      state.prelemMetaArray = existingEntriesMeta;
      state.prelemsValidationObject = validationsObjCopy;
      state.showSaveWarning = true;
    },
    callSaveandResetWarning: (state, action: PayloadAction<any>) => {
      const callSaveStatus = action.payload;
      state.showSaveWarning = false;
      state.callSave = callSaveStatus;
    },
    deletePrelem: (state, action: PayloadAction<any>) => {
      const prelemIndex = action.payload;
      const newPrelemMetaArray: PrelemInstance[] = [
        ...state.prelemMetaArray.slice(0, prelemIndex),
        ...state.prelemMetaArray.slice(prelemIndex + 1, state.prelemMetaArray.length),
      ];
      state.prelemMetaArray = newPrelemMetaArray;
      state.showSaveWarning = true;
    },
    copyPrelem: (state, action: PayloadAction<any>) => {
      const prelemIndex = action.payload;
      const duplicatedPrelemMeta = JSON.parse(JSON.stringify(state.prelemMetaArray[prelemIndex]));
      const copyMeta: PrelemInstance[] = [
        ...state.prelemMetaArray.slice(0, prelemIndex + 1),
        duplicatedPrelemMeta,
        ...state.prelemMetaArray.slice(prelemIndex + 1, state.prelemMetaArray.length),
      ];
      state.prelemMetaArray = copyMeta;
      state.showSaveWarning = true;
    },
    hidePrelem: (state, action: PayloadAction<any>) => {
      const prelemIndex = action.payload;
      const newPrelemMetaArray: PrelemInstance[] = [...state.prelemMetaArray];
      newPrelemMetaArray[prelemIndex].IsHidden = newPrelemMetaArray[prelemIndex].IsHidden
        ? !newPrelemMetaArray[prelemIndex].IsHidden
        : true;
      state.prelemMetaArray = newPrelemMetaArray;
      state.showSaveWarning = true;
    },
    movePrelem: (state, action: PayloadAction<any>) => {
      const { prelemIndex, operation } = action.payload;
      const newPrelemMetaArray: PrelemInstance[] = [...state.prelemMetaArray];
      let i = -1; //to handle operation move up and down accordingly
      if (operation === "down") {
        i = 1;
      }
      const tempMeta = newPrelemMetaArray[prelemIndex + i];
      newPrelemMetaArray[prelemIndex + i] = newPrelemMetaArray[prelemIndex];
      newPrelemMetaArray[prelemIndex] = tempMeta;
      state.prelemMetaArray = newPrelemMetaArray;
    },
    resetPrelemContent: (state, action: PayloadAction<any>) => {
      const { contentFetched, prelemAfterReset, prelemAt } = action.payload;
      const newPrelemMetaArray: PrelemInstance[] = [...state.prelemMetaArray];
      newPrelemMetaArray[prelemAt] = prelemAfterReset;
      newPrelemMetaArray[prelemAt].content = contentFetched;
      newPrelemMetaArray[prelemAt].StructuredData =
        state.prelemMetaArray[prelemAt].DefaultStructureDataForReset;
      newPrelemMetaArray[prelemAt].DefaultStructureDataForReset =
        state.prelemMetaArray[prelemAt].DefaultStructureDataForReset;
      newPrelemMetaArray[prelemAt].IsModified = false;
      state.prelemMetaArray = newPrelemMetaArray;
    },
    savePrelemPosition: (state, action: PayloadAction<any>) => {
      const { position, index } = action.payload;
      state.insertPrelemAt = position;
      state.scrollIndex = index;
    },
    setPublishedpages: (state, action: PayloadAction<any>) => {
      const { list } = action.payload;
      state.publishedPages = list;
    },
    setUpdatedContent: (state, action: PayloadAction<any>) => {
      const { path, updatedContent, prelemIndex } = action.payload;
      const prelemMetaArr = [...state.prelemMetaArray];
      prelemMetaArr[prelemIndex].content = updatedContent;
      prelemMetaArr[prelemIndex].DocumentPath = path;
      prelemMetaArr[prelemIndex].IsModified = true;
      state.prelemMetaArray = prelemMetaArr;
    },
    updateDynamicPrelemContent: (state, action: PayloadAction<any>) => {
      const { contentObj, prelemIndex } = action.payload;
      const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
      const newSlotContent = contentObj?.slots?.map(function (content) {
        return {
          Description: content?.Description,
          Title: content?.Title,
          ContentType: content?.ContentType,
          PublishedBy: content?.Author || "",
          PublishedDate: content?.PublishedDate,
          Thumbnail: {
            Url: content?.Thumbnail?.Url || content?.background_content?.Url || "",
            ext: content?.Thumbnail?.ext || "",
          },
          background_content: content?.background_content || "",
          Id: content?.CurrentPageURL || content?.EditorialItemPath || "",
          EditorialItemPath: content?.CurrentPageURL || content?.EditorialItemPath || "",
        };
      });
      newPrelemMetaArray[prelemIndex].content = {
        ...newPrelemMetaArray[prelemIndex].content,
        QueryParam: contentObj?.queryParam,
        Slots: newSlotContent,
      };
      state.prelemMetaArray = newPrelemMetaArray;
    },
    updateEcommercePrelemQueryParam: (state, action: PayloadAction<any>) => {
      const { data, prelemIndex, selectedSlot } = action.payload;
      const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
      if (selectedSlot === -1) {
        newPrelemMetaArray[prelemIndex].content = {
          ...newPrelemMetaArray[prelemIndex].content,
          QueryParam: { ...JSON.parse(data) },
        };
      } else {
        newPrelemMetaArray[prelemIndex].content = {
          ...newPrelemMetaArray[prelemIndex].content,
          [`query_param${selectedSlot}`]: { ...JSON.parse(data) },
        };
      }
      state.prelemMetaArray = newPrelemMetaArray;
    },
    updateFeatureBoxServiceCardContent: (state, action: PayloadAction<any>) => {
      const { slotContent, prelemIndex } = action.payload;
      const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
      const existingSlots = newPrelemMetaArray[prelemIndex]?.content?.Slots;
      const keysArr = existingSlots?.[0] && Object.keys(existingSlots?.[0]);
      const recievedSlots = slotContent?.slots;
      const updatedSlots = recievedSlots?.map((i) => {
        let obj: any = {};
        keysArr.forEach((j) => (obj = { ...obj, [j]: i[j] }));
        return obj;
      });
      newPrelemMetaArray[prelemIndex].content = {
        ...newPrelemMetaArray[prelemIndex].content,
        Slots: updatedSlots,
        EditorialItemPath: slotContent?.EditorialItemPath,
      };
      state.prelemMetaArray = newPrelemMetaArray;
    },
    updateImageVideoGalleryContent: (state, action: PayloadAction<any>) => {
      const { activeTab, content, selectedPrelemIndex, EditorialItemPath } = action.payload;
      const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
      let newContent = [];
      if (activeTab.current === "image") {
        newContent = content.map((x) => x.Image);
        newPrelemMetaArray[selectedPrelemIndex].content.Tab_1.Gallery = newContent;
      } else if (activeTab.current === "awards") {
        newPrelemMetaArray[selectedPrelemIndex].content.Slots = content;
        newPrelemMetaArray[selectedPrelemIndex].content.EditorialItemPath = EditorialItemPath;
      } else if (activeTab.current === "gallery") {
        newContent = content.map((x) => x.Image || x.Video || x);
        newPrelemMetaArray[selectedPrelemIndex].content.EditorialItemPath = EditorialItemPath;
        newPrelemMetaArray[selectedPrelemIndex].content.Slots = newContent;
      } else {
        newContent = content.map((x) => x.Video);
        newPrelemMetaArray[selectedPrelemIndex].content.Tab_2.Gallery = newContent;
      }
      state.prelemMetaArray = newPrelemMetaArray;
    },
    updateMultiSlotContent: (state, action: PayloadAction<any>) => {
      const { slotContent, prelemIndex, currentSlot } = action.payload;
      const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
      let newSlotContent = {};
      if (slotContent.ContentType === "Article") {
        newSlotContent =
          slotContent && Object.keys(slotContent).length === 0
            ? slotContent
            : (({
                Description,
                Title,
                ContentType,
                Author,
                PublishedDate,
                Thumbnail,
                CurrentPageURL,
              }) => ({
                Description,
                Title,
                ContentType,
                PublishedBy: Author,
                PublishedDate,
                Thumbnail,
                Id: CurrentPageURL,
                EditorialItemPath: CurrentPageURL,
              }))(slotContent);
      } else if (slotContent.ContentType === "VOD") {
        newSlotContent =
          slotContent && Object.keys(slotContent).length === 0
            ? slotContent
            : (({
                Description,
                Title,
                ContentType,
                Author,
                PublishedDate,
                Thumbnail,
                CurrentPageURL,
              }) => ({
                Description,
                Title,
                ContentType,
                PublishedBy: Author,
                PublishedDate,
                Thumbnail,
                Id: CurrentPageURL,
                EditorialItemPath: CurrentPageURL,
              }))(slotContent);
      } else if (
        slotContent.ContentType === "Poll" ||
        slotContent.ContentType === "Quiz" ||
        slotContent.ContentType === "Event"
      ) {
        newSlotContent =
          slotContent && Object.keys(slotContent).length === 0
            ? slotContent
            : (({
                Description,
                Title,
                ContentType,
                Author,
                PublishedDate,
                Thumbnail,
                CurrentPageURL,
                background_content,
              }) => ({
                Description,
                Title,
                ContentType,
                PublishedBy: Author,
                PublishedDate,
                Thumbnail: { ...Thumbnail, Color: background_content?.Color },
                Id: CurrentPageURL,
                EditorialItemPath: CurrentPageURL,
              }))(slotContent);
      } else {
        newSlotContent =
          slotContent && Object.keys(slotContent).length === 0
            ? slotContent
            : (({ Description, Title, EditorialItemPath, Thumbnail, ContentType }) => ({
                Description,
                Title,
                EditorialItemPath,
                Thumbnail,
                ContentType,
              }))(slotContent);
      }
      const newContent = newPrelemMetaArray[prelemIndex].content?.Slots.map((item, index) =>
        index === currentSlot ? newSlotContent : item,
      );
      newPrelemMetaArray[prelemIndex].content = {
        ...newPrelemMetaArray[prelemIndex].content,
        Slots: newContent,
      };
      state.prelemMetaArray = newPrelemMetaArray;
    },
    updatePageModelModificationDate: (state, action: PayloadAction<any>) => {
      const date = action.payload;
      const newModel = { ...state?.pageModel, Page_LastModificationDate: date };
      state.pageModel = newModel;
    },
    updateSaveWarning: (state, action: PayloadAction<any>) => {
      const status = action.payload;
      state.showSaveWarning = status;
    },
    setValidationForFetchPage: (state, action: PayloadAction<any>) => {
      const { validations } = action.payload;
      state.prelemsValidationObject = validations;
    },
    updateDataAfterFetch: (state, action: PayloadAction<any>) => {
      const { pageModel, pageSettings, prelemMetaArray } = action.payload;
      state.prelemMetaArray = prelemMetaArray;
      state.pageSettings = pageSettings;
      state.pageModel = pageModel;
    },
  },
});

export const {
  updatePageSettings,
  updateContentForCard,
  updatePageModel,
  saveSchedulePublishDateTime,
  saveScheduleUnpublishDateTime,
  savePrelemAnalytics,
  updateDynamicPrelemAssetInfo,
  updateLivestreamPrelemAssetInfo,
  addPrelem,
  callSaveandResetWarning,
  deletePrelem,
  copyPrelem,
  hidePrelem,
  movePrelem,
  resetPrelemContent,
  savePrelemPosition,
  setPublishedpages,
  setUpdatedContent,
  updateDynamicPrelemContent,
  updateEcommercePrelemQueryParam,
  updateFeatureBoxServiceCardContent,
  updateImageVideoGalleryContent,
  updateMultiSlotContent,
  updatePageModelModificationDate,
  updateSaveWarning,
  setValidationForFetchPage,
  updateDataAfterFetch,
  updatePageTitle,
  updateSeoEnable,
  updateAnalyticsEnable,
  resetState,
} = pageSlice.actions;

export default pageSlice.reducer;
