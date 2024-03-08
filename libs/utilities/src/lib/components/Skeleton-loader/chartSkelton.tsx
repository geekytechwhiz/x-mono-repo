import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

interface SkeltonLoaderList {
  maxWidth?: number;
  maxHeight?: number;
  chartName?: string;
}

ChartSkeltonLoader.propTypes = {
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  chartName: PropTypes.string,
};

ChartSkeltonLoader.defaultProps = {
  maxWidth: 550,
  maxHeight: 446,
  chartName: "",
};
export default function ChartSkeltonLoader({
  maxWidth = 550,
  maxHeight,
  chartName,
}: SkeltonLoaderList) {
  const barLineArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const circularLabelArray = [1, 2, 3, 4, 5];
  return (
    <Card
      sx={{
        maxWidth: maxWidth,
        minHeight: maxHeight ? maxHeight : "440px",
        mt: 5,
        boxShadow: "none",
      }}>
      {chartName === "bar" && (
        <CardContent>
          <Skeleton
            variant='text'
            width={140}
            height={15}
            animation='wave'
            style={{ marginBottom: 16 }}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              maxWidth: "100%",
              margin: "0px auto",
            }}>
            {Array.from(barLineArray).map((item) => (
              <Box key={item} style={{ flex: 1, marginLeft: 16 }}>
                <Skeleton
                  variant='rectangular'
                  width={12}
                  height={Math.floor(Math.random() * (320 - 50)) + 50}
                  animation='wave'
                />
              </Box>
            ))}
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 16,
              width: "100%",
              float: "left",
              paddingLeft: "30px",
            }}>
            {Array.from(barLineArray).map((item) => (
              <Box key={item} style={{ marginRight: 8, marginLeft: 8 }}>
                <Skeleton
                  variant='rectangular'
                  width={20}
                  height={12}
                  animation='wave'
                  style={{ marginBottom: 8 }}
                />
                <Skeleton variant='text' width={40} height={12} animation='wave' />
              </Box>
            ))}
          </Box>
        </CardContent>
      )}
      {chartName === "pie" && (
        <CardContent>
          <Skeleton
            variant='text'
            width={140}
            height={15}
            animation='wave'
            style={{ marginBottom: 80 }}
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              height: 200,
            }}>
            <Skeleton variant='circular' width={200} height={200} animation='wave' />
            <Box
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Skeleton variant='circular' width={150} height={150} animation='wave' />
            </Box>
          </Box>

          <Box style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
            {Array.from(circularLabelArray).map((item) => (
              <Box key={item} style={{ marginRight: 8, marginLeft: 8 }}>
                <Skeleton
                  variant='rectangular'
                  width={20}
                  height={12}
                  animation='wave'
                  style={{ marginBottom: 8 }}
                />
                <Skeleton variant='text' width={40} height={12} animation='wave' />
              </Box>
            ))}
          </Box>
        </CardContent>
      )}
    </Card>
  );
}
