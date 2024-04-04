import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardState } from "./DashboardSlice.types";

export const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: {
    dashBoard: {},
  } as DashboardState,
  reducers: {
    updateDashboardData: (state, action: PayloadAction<any>) => {
      state.dashBoard = action.payload;
    },
  },
});

export const { updateDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
