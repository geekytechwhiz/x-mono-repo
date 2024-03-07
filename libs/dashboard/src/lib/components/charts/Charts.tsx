import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { graph } from "./Constants";
import BarChartVertical from "./bar/BarChartVertical";
import PieGraph from "./pie/PieGraph";
import "./Charts.css";
import AreaGraph from "./area/AreaGraph";
import PieChartWithNeedle from "./pie/PieChartWithneedle";
import BigNumber from "./area/BigNumber";
import BarChartHorizontal from "./bar/BarChartHorizontal";
import { ShowToastError, ChartSkeltonLoader, NoSearchResultSvg } from "@platformx/utilities";
import { useQuery } from "@apollo/client";
import { FETCH_DASHBOARD_CHARTS } from "@platformx/authoring-apis";

const Charts = ({ dashboardName, heading, titleVarient }: any) => {
  const { t } = useTranslation();
  const loaderCards = [1];
  const mapDashboardIdByName = (name: any) => {
    return graph.dashBoardName[name] ? graph.dashBoardName[name] : null;
  };
  const { loading, error, data } = useQuery(FETCH_DASHBOARD_CHARTS, {
    variables: { dashboardId: `${mapDashboardIdByName(dashboardName)}` },
  });
  const mapGraphType = (graphType: string) => {
    switch (graphType) {
      case graph.chartType.line:
        return graph.LINE;
      case graph.chartType.area:
        return graph.AREA;
      case graph.chartType.bar:
        return graph.BAR;
      case graph.chartType.bartimeseries:
        return graph.BARTIMESERIES;
      case graph.chartType.distbar:
        return graph.DISTBAR;
      case graph.chartType.pie:
        return graph.PIE;
      case graph.chartType.piewithneedle:
        return graph.PIEWITHNEEDLE;
      case graph.chartType.bignumber:
        return graph.BIGNUMBER;
      case graph.chartType.barhorinzontal:
        return graph.BARHORIZONTAL;
      default:
        return null;
    }
  };
  const checkDataAvalibility = (item: any) => {
    return item.chartData &&
      item.graph_type &&
      item.chartData.length > 0 &&
      item.column_names &&
      item.column_names.length > 0
      ? true
      : false;
  };
  const renderCharts = (item: any) => {
    const mappedName = mapGraphType(item.graph_type);
    switch (mappedName) {
      case graph.LINE:
        return <AreaGraph itemData={item} />;
      case graph.AREA:
        return <AreaGraph itemData={item} />;
      case graph.BAR:
        return <BarChartHorizontal itemData={item} />;
      case graph.BARTIMESERIES:
        return <BarChartVertical itemData={item} />;
      case graph.BARHORIZONTAL:
        return <BarChartHorizontal itemData={item} />;
      case graph.DISTBAR:
        return <BarChartVertical itemData={item} />;
      case graph.PIE:
        return <PieGraph itemData={item} />;
      case graph.PIEWITHNEEDLE:
        return <PieChartWithNeedle itemData={item} />;
      case graph.BIGNUMBER:
        return <BigNumber itemData={item} />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2} className='graphContainerSpacing'>
      <Typography variant={titleVarient ? titleVarient : "h4bold"} className='chartHeading'>
        {heading}
      </Typography>
      <Grid container className='chartContainer'>
        {loading ? (
          Array.from(loaderCards).map(() => (
            <>
              <Grid item xs={12} md={6} em={6} lg={4} className='chartBox'>
                <Box className='chartSkeltonWrapper'>
                  <ChartSkeltonLoader chartName='pie' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} em={6} lg={8} className='chartBox'>
                <Box className='chartSkeltonWrapper'>
                  <ChartSkeltonLoader chartName='bar' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} em={6} lg={8} className='chartBox'>
                <Box className='chartSkeltonWrapper'>
                  <ChartSkeltonLoader chartName='bar' />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} em={6} lg={4} className='chartBox'>
                <Box className='chartSkeltonWrapper'>
                  <ChartSkeltonLoader chartName='pie' />
                </Box>
              </Grid>
            </>
          ))
        ) : (
          <>
            {data?.authoring_getDashboardDetailById?.map((item: any) => {
              return checkDataAvalibility(item) ? (
                <Grid
                  item
                  xs={12}
                  md={12}
                  em={6}
                  lg={item.gridColumn}
                  xl={item.gridColumn}
                  sx={{ marginBottom: "30px" }}
                  key={item?.id}>
                  {renderCharts(item)}
                </Grid>
              ) : null;
            })}
            {data?.authoring_getDashboardDetailById &&
              data?.authoring_getDashboardDetailById.length === 0 && (
                <Box className='noDataFound'>
                  <img src={NoSearchResultSvg} width={175} height={175} alt='no data found' />
                  <Typography variant='h4regular'>{t("no_result_found")}</Typography>
                </Box>
              )}
            {error && ShowToastError(error instanceof Error ? error.message : "An error occurred")}
          </>
        )}
      </Grid>
    </Grid>
  );
};
export default Charts;
