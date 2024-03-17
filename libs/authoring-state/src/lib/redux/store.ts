import { configureStore } from "@reduxjs/toolkit";
import { articleSlice } from "./slices/Article/ArticleSlice";
import { commentSlice } from "./slices/Comment/CommentSlice";
import { contentSlice } from "./slices/Content/ContentSlice";
import { dialogSlice } from "./slices/Dialog/DialogSlice";
import { menuSlice } from "./slices/Menu/MenuSlice";
import { quizSlice } from "./slices/Quiz/QuizSlice";
import { pageSlice } from "./slices/Page/PageSlice";

export const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
    article: articleSlice.reducer,
    dialog: dialogSlice.reducer,
    comment: commentSlice.reducer,
    menu: menuSlice.reducer,
    quiz: quizSlice.reducer,
    page: pageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
