import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { colorRange } from 'helpers/colors';

type Props = {
  data: Array<Object>,
};

@observer
class ByFilePieChart extends React.Component<Props> {
  handleClick = (data, index) => {
    const { canExpand, onExpand } = this.props;
    if (canExpand(data.name)) {
      onExpand(data.name);
    }
  };

  render() {
    const { app, data } = this.props;
    const colors = colorRange(
      app.primaryColor,
      data.map(item => item.numIssues),
    );
    return (
      <ResponsiveContainer>
        <PieChart width={800} height={400}>
          <Pie
            isAnimationActive={false}
            data={data}
            dataKey="numIssues"
            onClick={this.handleClick}
            fill={app.primaryColor}
            label
          >
            {data.map((entry, index) => <Cell fill={colors[index]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
export default inject('app')(ByFilePieChart);
