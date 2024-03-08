/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
import { isInteger } from "../utils/helper";

const BarGraphGrouped = ({ itemData }: any) => {
  const { chartData: data, column_names: colnames } = itemData;
  const config = graph.bar;
  return (
    <ResponsiveContainer width={config.width} height={config.height} className='noxyAxsis'>
      <BarChart data={data}>
        {config.showGrid && <CartesianGrid strokeDasharray='3 3' />}
        <XAxis
          type='category'
          dataKey={colnames[0]}
          tick={{ fontSize: config.fontSize, fill: config.textColor }}
          tickMargin={20}
        />
        <YAxis type='number' tick={{ fontSize: config.fontSize, fill: config.textColor }} />
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
          fill={config.graphColor[0]}
          barSize={config.barSize}
          radius={config.radius}>
          {config.showValuesOnTop && (
            <LabelList dataKey={colnames[1]} position='top' fill={config.graphColor[0]} />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraphGrouped;
