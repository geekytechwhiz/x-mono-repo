import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { graph } from "../Constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { addEllipsis, isInteger, isTimestampKey } from "../utils/helper";

const BarChartVertical = ({ itemData }: any) => {
  const { chartData: data, column_names: colnames, title } = itemData;
  const config = graph.bar;
  const [firstKey] = Object.keys(data[0]);
  const isTimestamp = isTimestampKey(firstKey, graph.timeStampFormates);
  const truncateLabel = (label, maxLength) => {
    if (label.length > maxLength) {
      return addEllipsis(label, config.textMaxLength);
    }
    return label;
  };
  return (
    <Box className='barChartVertical pageGraph'>
      <Typography variant='p3semibold' className='heading'>
        {title}
      </Typography>
      <ResponsiveContainer width={config.width} height={config.height} className='noxyAxsis'>
        <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 50 }}>
          {config.showGrid && <CartesianGrid strokeDasharray='3 3' />}
          {isTimestamp ? (
            <XAxis
              dataKey={colnames[0]}
              tick={{
                fontSize: config.fontSize - 1,
                fill: config.textColor,
                alignmentBaseline: "middle",
              }}
              tickMargin={20}
              interval={0}
              angle={config.textXAngle}
              dx={-25}
              tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
            />
          ) : (
            <XAxis
              dataKey={colnames[0]}
              tick={{
                fontSize: config.fontSize,
                fill: config.textColor,
                alignmentBaseline: "mathematical",
              }}
              tickMargin={30}
              angle={config.textXAngle}
              dx={-25}
              tickFormatter={(label) => truncateLabel(label, config.textMaxLength)}
            />
          )}
          <YAxis tick={{ fontSize: config.fontSize, fill: config.textColor }} />
          {isTimestamp ? (
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value: any) => (isInteger(value) ? value : value?.toFixed(2))}
              labelFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
            />
          ) : (
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value: any) => (isInteger(value) ? value : value?.toFixed(2))}
            />
          )}
          {config.showLegend && (
            <Legend
              verticalAlign={config.legendPosition as any}
              height={36}
              iconType={config?.iconType as any}
            />
          )}
          {isTimestamp ? (
            <>
              {Object.keys(data[0]).map((key, index) => {
                if (key !== firstKey) {
                  return (
                    <Bar
                      key={key}
                      dataKey={colnames[index]}
                      fill={config.graphColor[index - (1 % config.graphColor.length)]}
                      barSize={config.barSize}
                      radius={config.radius}
                      background={{ fill: config.defaultBackground, radius: config.radius }}>
                      {config.showValuesOnTop && (
                        <LabelList
                          dataKey={colnames[index]}
                          position='top'
                          fill={config.graphColor[index - (1 % config.graphColor.length)]}
                          fontSize={config.fontSize}
                        />
                      )}
                    </Bar>
                  );
                }
                return null;
              })}
            </>
          ) : (
            <>
              {Object.keys(data[0]).map((key, index) => {
                if (key !== firstKey) {
                  return (
                    <Bar
                      key={key}
                      dataKey={colnames[index]}
                      fill={config.graphColor[index - (1 % config.graphColor.length)]}
                      barSize={config.barSize}
                      radius={config.radius}
                      background={{ fill: config.defaultBackground, radius: config.radius }}>
                      {config.showValuesOnTop && (
                        <LabelList
                          dataKey={colnames[index]}
                          position='top'
                          fill={config.graphColor[index - (1 % config.graphColor.length)]}
                          fontSize={config.fontSize}
                        />
                      )}
                    </Bar>
                  );
                }
                return null;
              })}
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartVertical;
