import React from "react";
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { graph } from "../Constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { getFormatedValue, isTimestampKey } from "../utils/helper";

const BigNumber = ({ itemData }: any) => {
  const { chartData: data, column_names: colnames, title } = itemData;
  const config = graph.area;
  const [firstKey, secondKey] = Object.keys(data[0]);
  const isTimestamp = isTimestampKey(firstKey, graph.timeStampFormates);
  const getPercentageValue = () => {
    if (data && data.length > 0) {
      const res =
        ((data[data.length - 1][secondKey] - data[data.length - 2][secondKey]) /
          data[data.length - 2][secondKey]) *
        100;
      return res.toFixed(1) + "%";
    } else {
      return "0%";
    }
  };
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length && payload[0].payload && colnames && colnames.length) {
      const dataItem = payload[0].payload;
      let formattedDate;
      if (isTimestamp) {
        formattedDate = new Date(dataItem[colnames[0]]).toLocaleDateString();
      }
      return (
        <div className='custom-tooltip'>
          <p className='recharts-default-tooltip'>
            {isTimestamp && formattedDate} <br />
            {getFormatedValue(dataItem[colnames[1]])}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <Box className='bigNumber pageGraph'>
      <Typography variant='p3semibold' className='heading'>
        {title}
      </Typography>
      <ResponsiveContainer width={config.width} height={config.height} className='noxyAxsis'>
        <AreaChart data={data} margin={{ top: 210, right: 0, left: 10, bottom: 40 }}>
          {config.showGrid && <CartesianGrid strokeDasharray='3 3' />}
          <Tooltip content={<CustomTooltip />} />
          <svg>
            <text x='30' y='90' textAnchor='start' fontSize={config.bigNumberSize} fill='black'>
              {data?.[data.length - 1]?.[secondKey] || 0}
            </text>
            <text x='30' y='170' textAnchor='start' fontSize={config.mediumNumberSize} fill='black'>
              {getPercentageValue()}
            </text>
          </svg>
          <defs>
            <linearGradient id='MyGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={config.graphColor[0]} stopOpacity='0.4' />
              <stop offset='95%' stopColor={config.graphColor[0]} stopOpacity='0' />
            </linearGradient>
          </defs>
          {/* <Legend
            verticalAlign={config.legendPosition as any}
            height={46}
            iconType={config?.iconType as any}
          /> */}
          <Area
            type='monotone'
            dataKey={secondKey}
            stackId={0}
            stroke={config.graphColor[0]}
            strokeWidth={config.strokeWidth}
            fill='url(#MyGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BigNumber;
