import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { colorSeverity } from 'helpers/colors';

type Props = {
  data: Array<Object>,
};

type AnchorPos = 'start' | 'middle' | 'end';

type TickProps = {
  fill: string,
  height: number,
  index: number,
  payload: {
    coordinate: number,
    value: string,
    index: number,
    offset: number,
    tickCoord: number,
    isShow: boolean,
  },
  stroke: string,
  textAnchor: AnchorPos,
  verticalAnchor: AnchorPos,
  visibleTicksCount: number,
  width: number,
  x: number,
  y: number,
};

// TODO: custom tick to handle overflow values getting cut off
const CustomTick = ({
  x,
  y,
  width,
  height,
  stroke,
  payload,
  textAnchor,
}: TickProps) => {
  return (
    <g class="recharts-layer recharts-cartesian-axis-tick">
      <text
        width={width}
        height={height}
        x={x - 10}
        y={y + 15}
        stroke={stroke}
        transform={`rotate(-45, ${x - 10}, ${y + 15})`}
        fill="#666"
        class="recharts-text recharts-cartesian-axis-tick-value"
        text-anchor={textAnchor}
      >
        <tspan x={x - 50} dy="0.71em">
          {payload.value}
        </tspan>
      </text>
    </g>
  );
};

@observer
class ByFileBarChart extends React.Component<Props> {
  handleClick = (data, index) => {
    const { onExpand } = this.props;
    onExpand(data.name);
  };

  render() {
    const { app, data } = this.props;
    const colors = colorSeverity(data.map(item => item.numIssues));
    return (
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            name="Number of Issues"
            dataKey="numIssues"
            fill={app.primaryColor}
            onClick={this.handleClick}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
export default inject('app')(ByFileBarChart);
