import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { graph } from "../Constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { addEllipsis, isInteger } from "../utils/helper";

const BarChartHorizontal = ({ itemData }: any) => {
  const { chartData: data, column_names: colnames, title } = itemData;
  const config = graph.bar;
  let leftAreaWidth = 20;
  const maxTextLength = (dataArr: any[], key: string) => {
    let maxLength = 0;
    dataArr.forEach((item) => {
      if (item[key] && typeof item[key] === "string") {
        maxLength = Math.max(maxLength, item[key].length);
      }
    });
    maxLength = maxLength > config.textMaxLength ? config.textMaxLength : maxLength;
    leftAreaWidth += maxLength * 6;
  };
  maxTextLength(data, colnames[0]);
  const CustomXAxisTick = ({ x, y, payload }) => {
    let tickValue = payload.value;
    if (tickValue.length > config.textMaxLength) {
      tickValue = addEllipsis(payload.value, config.textMaxLength);
    }
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={-config.fontSize}
          dy={16}
          fontSize={config.fontSize}
          fill={config.textColor}
          textAnchor='end'>
          {tickValue}
        </text>
      </g>
    );
  };
  return (
    <Box className='barChartHorizontal pageGraph'>
      <Typography variant='p3semibold' className='heading'>
        {title}
      </Typography>
      <ResponsiveContainer width={config.width} height={config.height} className='noxyAxsis'>
        <BarChart
          data={data}
          layout='vertical'
          margin={{ top: 10, right: 15, left: 15, bottom: 10 }}>
          {config.showGrid && <CartesianGrid strokeDasharray='3 3' />}
          <XAxis
            type='number'
            interval={0}
            dataKey={colnames[1]}
            tick={{ fontSize: config.fontSize, fill: config.textColor }}
          />
          <YAxis
            type='category'
            dataKey={colnames[0]}
            width={leftAreaWidth}
            tick={<CustomXAxisTick payload={data} x={0} y={0} />}
            tickMargin={10}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            formatter={(value: any) => (isInteger(value) ? value : value?.toFixed(2))}
          />
          {config.showLegend && (
            <Legend
              verticalAlign={config.legendPosition as any}
              height={36}
              iconType={config?.iconType as any}
            />
          )}
          <Bar
            dataKey={colnames[1]}
            background={{ fill: config.defaultBackground, radius: config.radius }}
            fill={config.graphColor[0]}
            barSize={config.barSize}
            radius={config.radius}>
            {config.showValuesOnTop && (
              <LabelList
                dataKey={colnames[1]}
                position='right'
                fill={config.graphColor[0]}
                fontSize={config.fontSize}
              />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartHorizontal;
