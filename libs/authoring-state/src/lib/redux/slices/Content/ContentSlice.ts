/* eslint-disable no-debugger */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentState } from "./ContentSlice.types";

export const contentSlice = createSlice({
  name: "Content",
  initialState: {
    contentArray: [],
    contentList: [],
    startIndex: 0,
    loading: true,
    contentType: "",
    clearStatus: false,
    currentContent: {},
    isUnsavedVod: false,
    contentProp: "",
    apiState: false,
  } as ContentState,
  reducers: {
    updateContentList: (state, action: PayloadAction<any>) => {
      state.contentArray = [...action.payload];
    },
    updateContent: (state, action: PayloadAction<any>) => {
      const { content, newDataSize, contentType } = action.payload;
      state.contentArray = content;
      state.startIndex = content.length + 1;
      content.loading = newDataSize < 20 ? false : true;
      content.contentType = contentType;
      content.apiState = true;
    },
    previewContent: (state, action: PayloadAction<any>) => {
      state.currentContent = action.payload;
    },
    previewArticle: (state, action: PayloadAction<any>) => {
      state.contentArray = [...state.contentArray];
      state.currentContent = action.payload;
    },
    contentProp: (state, action: PayloadAction<string>) => {
      state.contentProp = action.payload;
    },
    contentList: (state, action: PayloadAction<any>) => {
      state.contentList = action.payload;
    },
  },
});

export const { updateContentList, previewContent, contentProp, contentList, updateContent } =
  contentSlice.actions;

export default contentSlice.reducer;
