import { configureStore } from "@reduxjs/toolkit";
import { articleSlice } from "./slices/Article/ArticleSlice";
import { commentSlice } from "./slices/Comment/CommentSlice";
import { contentSlice } from "./slices/Content/ContentSlice";
import { dashboardSlice } from "./slices/Dashboard/DashboardSlice";
import { dialogSlice } from "./slices/Dialog/DialogSlice";
import { menuSlice } from "./slices/Menu/MenuSlice";
import { pageSlice } from "./slices/Page/PageSlice";
import { quizSlice } from "./slices/Quiz/QuizSlice";

export const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
    article: articleSlice.reducer,
    dialog: dialogSlice.reducer,
    comment: commentSlice.reducer,
    menu: menuSlice.reducer,
    quiz: quizSlice.reducer,
    page: pageSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
