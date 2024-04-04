type recentPages = {
  title: string;
  last_modification_date: string;
  current_page_url: string;
  status: string;
  last_modified_by: string;
  path: string;
};
type DashboardData = {
  taskPages: string[];
  recentPages: recentPages[];
  recentContent: string[];
  createContent: string[];
  colorArray: string[];
  boostContent: string[];
  scheduled: string[];
  coursesList: string[];
  userCourseList: string[];
};

export type DashboardState = {
  dashBoard: DashboardData;
};
